import { create } from 'zustand';
import orderService from '@/services/orderService';
import { loadGokwik } from '@/utils/loadGokwik';
import useAuthStore from './authStore';
import useCartStore from './cartStore';
import useUiStore from './uiStore';

const getSize = (item) => item.selectedFront || item.selectedRear || item.selectedGeneric || {};

const isTubeItem = (item, size) => Boolean(
    item.selectedGeneric?.tubeId ||
    item.product?.tubeId ||
    size.tubeId ||
    item.selectedGeneric?.type?.toLowerCase() === 'tube' ||
    item.type?.toLowerCase() === 'tube' ||
    item.product?.type?.toLowerCase() === 'tube' ||
    size.type?.toLowerCase() === 'tube' ||
    item.product?.valveType ||
    size.valveType ||
    typeof (item.product?.tubeType || size.tubeType) === 'string' ||
    item.product?.productName?.toLowerCase().includes('tube') ||
    item.product?.name?.toLowerCase().includes('tube') ||
    size.productName?.toLowerCase().includes('tube') ||
    size.name?.toLowerCase().includes('tube') ||
    item.sku?.toLowerCase().includes('tube') ||
    size.sku?.toLowerCase().includes('tube')
);

const getLineTarget = (item) => {
    const size = getSize(item);
    const isTube = isTubeItem(item, size);
    return {
        isTube,
        id: isTube
            ? (size.tubeId || size._id || item.product?.tubeId || item.product?._id)
            : (size._id || item.product?._id)
    };
};

export const hasOfferItem = (cart) => cart.some((item) =>
    [item.selectedFront, item.selectedRear, item.selectedGeneric].some((size) => size?.isOfferItem)
);

export const getCheckoutItems = (cart) => cart.map((item) => {
    const { isTube, id } = getLineTarget(item);
    return { ...(isTube ? { tubeId: id } : { productId: id }), quantity: item.quantity };
});

export const getAddressKey = (address) => address
    ? [address._id, address.fullName, address.phone, address.email, address.addressLine1, address.city, address.state, address.pincode || address.pinCode, address.gst].join('|')
    : null;

const ADDRESS_FIELD_LABELS = {
    first_name: 'name',
    phone: 'phone number',
    address: 'address line',
    city: 'city',
    state: 'state',
    postal_code: 'pincode'
};

const getErrorMessage = (err, fallback) => {
    const data = err?.response?.data;
    if (data?.invalid_address_field) {
        return `Please check the ${ADDRESS_FIELD_LABELS[data.invalid_address_field] || data.invalid_address_field} in this address.`;
    }
    if (data?.error === 'invalid or expired cart') {
        return 'This checkout has expired. Please reload the page.';
    }
    return data?.message || fallback;
};

const emptyCheckout = {
    cartId: null,
    cartKey: null,
    session: null,
    summary: null,
    coupons: [],
    addressKey: null,
    addressState: 'idle',
    shippingId: null,
    updating: null
};

const PAYMENT_BUSY = ['starting', 'open', 'confirming'];

let gokwikEventsBound = false;
let resumeRouter = null;
let preparingKey = null;
let prepareRequest = 0;
let addressRequest = 0;

const useCheckoutStore = create((set, get) => ({
    ...emptyCheckout,
    preparing: false,
    prepareError: null,
    status: 'idle',
    order: null,
    notice: null,
    resumeAfterLogin: false,
    popupOpen: false,

    clearNotice: () => set({ notice: null }),
    closeStatus: () => set({ status: 'idle', order: null }),
    closeCheckout: () => {
        window.gokwikSdk?.close?.();
        set((state) => ({ popupOpen: false, ...(state.status === 'open' && { status: 'idle' }) }));
    },

    requestLogin: (router) => {
        resumeRouter = router;
        set({ resumeAfterLogin: true });
        useUiStore.getState().setLoginOpen(true);
    },

    openCheckout: (router) => {
        const { cart, setSliderOpen } = useCartStore.getState();
        if (cart.length === 0) return;

        setSliderOpen(false);
        if (!useAuthStore.getState().isAuthenticated) {
            get().requestLogin(router);
            return;
        }
        router.push('/checkout');
    },

    prepareCheckout: async () => {
        const { cart } = useCartStore.getState();
        const current = get();
        if (cart.length === 0 || PAYMENT_BUSY.includes(current.status)) return;

        const items = getCheckoutItems(cart);
        const cartKey = JSON.stringify(items);
        if ((current.cartId && current.cartKey === cartKey) || preparingKey === cartKey) return;

        const request = ++prepareRequest;
        const previousCode = current.summary?.discounts?.[0]?.code;
        preparingKey = cartKey;
        set({ ...emptyCheckout, preparing: true, prepareError: null });

        try {
            const response = await orderService.startGokwikCheckout({ items });
            if (request !== prepareRequest) return;
            if (!response?.success) {
                set({ preparing: false, prepareError: response?.message || 'Could not start checkout. Please try again.' });
                return;
            }

            const { mid, environment, merchantCheckoutId, phoneNumber } = response.data;
            const [cartResponse, discountResponse] = await Promise.all([
                orderService.getGokwikCart(merchantCheckoutId),
                orderService.getGokwikDiscounts(merchantCheckoutId).catch(() => null)
            ]);
            if (request !== prepareRequest) return;

            set({
                cartId: merchantCheckoutId,
                cartKey,
                session: { mid, environment, phoneNumber },
                summary: cartResponse.data.cart,
                coupons: discountResponse?.data?.available_coupons || [],
                preparing: false
            });

            if (previousCode && !hasOfferItem(cart)) await get().applyDiscount(previousCode);
        } catch (err) {
            if (request !== prepareRequest) return;
            set({ ...emptyCheckout, preparing: false, prepareError: getErrorMessage(err, 'Could not start checkout. Please try again.') });
        } finally {
            if (request === prepareRequest) preparingKey = null;
        }
    },

    setShippingAddress: async (address) => {
        const { cartId } = get();
        const addressKey = getAddressKey(address);
        if (!cartId || !addressKey) return;

        const request = ++addressRequest;
        set({ addressKey, addressState: 'saving', shippingId: null, updating: 'address' });

        try {
            const response = await orderService.setGokwikShippingAddress(cartId, {
                first_name: address.fullName,
                last_name: '',
                phone: address.phone,
                email: address.email || '',
                address: address.addressLine1,
                city: address.city,
                state: address.state,
                postal_code: String(address.pincode || address.pinCode || ''),
                country: address.country || 'India'
            }, address.gst);
            if (request !== addressRequest || get().cartId !== cartId) return;

            const summary = response.data.cart;
            set({ summary, addressState: 'saved', updating: null });

            const [method] = summary.available_shipping_methods || [];
            if (method) await get().setShippingOption(method.id);
        } catch (err) {
            if (request !== addressRequest || get().cartId !== cartId) return;
            set({
                addressState: 'error',
                updating: null,
                notice: { type: 'error', message: getErrorMessage(err, 'Could not use this address. Please try another one.') }
            });
        }
    },

    setShippingOption: async (methodId) => {
        const { cartId } = get();
        if (!cartId || !methodId) return;

        set({ updating: 'shipping' });
        try {
            const response = await orderService.setGokwikShippingOption(cartId, methodId);
            if (get().cartId !== cartId) return;

            const summary = response.data.cart;
            set({ summary, shippingId: summary.selected_shipping_method?.id || methodId, updating: null });
        } catch (err) {
            if (get().cartId !== cartId) return;
            set({ updating: null, notice: { type: 'error', message: getErrorMessage(err, 'Could not select this shipping method.') } });
        }
    },

    applyDiscount: async (code) => {
        const { cartId } = get();
        const discountCode = String(code || '').trim();
        if (!cartId) return { success: false };
        if (!discountCode) return { success: false, message: 'Please enter a coupon code' };
        if (hasOfferItem(useCartStore.getState().cart)) {
            return { success: false, message: 'Not eligible: your cart already has an exclusive offer discount.' };
        }

        set({ updating: 'coupon' });
        try {
            const response = await orderService.applyGokwikDiscount(cartId, discountCode);
            if (get().cartId !== cartId) return { success: false };

            set({ summary: response.data.cart, updating: null });
            return response.invalid_coupon ? { success: false, message: response.invalid_coupon } : { success: true };
        } catch (err) {
            if (get().cartId === cartId) set({ updating: null });
            return { success: false, message: getErrorMessage(err, 'Could not apply this offer code.') };
        }
    },

    removeDiscount: async () => {
        const { cartId, summary } = get();
        const code = summary?.discounts?.[0]?.code;
        if (!cartId || !code) return { success: false };

        set({ updating: 'coupon' });
        try {
            const response = await orderService.removeGokwikDiscount(cartId, code);
            if (get().cartId !== cartId) return { success: false };

            set({ summary: response.data.cart, updating: null });
            return response.invalid_coupon ? { success: false, message: response.invalid_coupon } : { success: true };
        } catch (err) {
            if (get().cartId === cartId) set({ updating: null });
            return { success: false, message: getErrorMessage(err, 'Could not remove this offer code.') };
        }
    },

    pay: async (phone) => {
        const { cartId, session, status, addressState, shippingId, updating } = get();
        if (!cartId || !session || addressState !== 'saved' || !shippingId || updating || PAYMENT_BUSY.includes(status)) return;

        set({ status: 'starting' });
        if (!(await loadGokwik(session.environment))) {
            set({ status: 'idle', notice: { type: 'error', message: 'Payment gateway failed to load. Please refresh the page and try again.' } });
            return;
        }

        const phoneNumber = String(phone || session.phoneNumber || '').replace(/\D/g, '').slice(-10);
        try {
            bindGokwikEvents();
            set({ status: 'open', popupOpen: true });
            window.gokwikSdk.initCheckout({
                environment: session.environment,
                type: 'merchantInfo',
                mid: session.mid,
                ...(phoneNumber && { phoneNumber }),
                merchantParams: { merchantCheckoutId: cartId }
            });
        } catch (err) {
            console.error('GoKwik initCheckout failed:', err);
            set({ status: 'idle', popupOpen: false, notice: { type: 'error', message: 'Could not open the payment window. Please try again.' } });
        }
    }
}));

const confirmOrder = async () => {
    const { cartId } = useCheckoutStore.getState();
    if (!cartId) return;

    useCheckoutStore.setState({ ...emptyCheckout, status: 'confirming', popupOpen: false });
    window.gokwikSdk?.close?.();

    let order = null;
    try {
        for (let attempt = 0; attempt < 10 && !order; attempt++) {
            if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await orderService.getGokwikCheckout(cartId);
            order = response?.data?.order || null;
        }
    } catch (err) {
        console.error('Could not confirm GoKwik order:', err);
    }

    await useCartStore.getState().clearCart();
    useCheckoutStore.setState(order
        ? { status: 'placed', order, notice: { type: 'success', message: 'Payment successful! Order placed.' } }
        : { status: 'idle', notice: { type: 'warning', message: 'Payment received. Your order is still being confirmed, please check My Orders in a minute.' } });
};

const bindGokwikEvents = () => {
    if (gokwikEventsBound) return;
    gokwikEventsBound = true;

    window.gokwikSdk.on('order-complete', confirmOrder);
    window.gokwikSdk.on('checkout-initiation-failure', () => {
        useCheckoutStore.setState((state) => ({
            popupOpen: false,
            ...(state.status === 'open' && { status: 'idle' }),
            notice: { type: 'error', message: 'Could not open the payment window. Please try again.' }
        }));
    });
    window.gokwikSdk.on('checkout-close', () => {
        useCheckoutStore.setState((state) => ({ popupOpen: false, ...(state.status === 'open' && { status: 'idle' }) }));
    });
};

useUiStore.subscribe((state, prev) => {
    if (state.isLoginOpen || !prev.isLoginOpen || !useCheckoutStore.getState().resumeAfterLogin) return;

    const router = resumeRouter;
    resumeRouter = null;
    useCheckoutStore.setState({ resumeAfterLogin: false });
    if (router && useAuthStore.getState().isAuthenticated) router.push('/checkout');
});

useAuthStore.subscribe((state, prev) => {
    if (prev.isAuthenticated && !state.isAuthenticated) {
        prepareRequest++;
        addressRequest++;
        preparingKey = null;
        useCheckoutStore.setState({ ...emptyCheckout, preparing: false, prepareError: null });
    }
});

export default useCheckoutStore;
