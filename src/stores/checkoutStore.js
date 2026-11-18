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

const getItemBrandId = (item, size) =>
    item.product?.brand?._id ||
    item.product?.brandId ||
    (typeof item.product?.brand === 'string' ? item.product.brand : null) ||
    size.brand?._id ||
    size.brandId ||
    (typeof size.brand === 'string' ? size.brand : null) ||
    item.brand?._id ||
    item.brandId ||
    (typeof item.brand === 'string' ? item.brand : null);

export const hasOfferItem = (cart) => cart.some((item) =>
    [item.selectedFront, item.selectedRear, item.selectedGeneric].some((size) => size?.isOfferItem)
);

export const getCouponDiscount = (cart, coupon) => {
    if (!coupon || hasOfferItem(cart)) return 0;

    const lines = cart.map((item) => {
        const size = getSize(item);
        const quantity = item.quantity || 1;
        const discount = size.discount || size.discountAmount || item.discount || item.product?.discount || 0;
        const unitPrice = item.price || size.price || 0;
        const unitSale = discount > 0 ? Math.max(0, unitPrice - discount) : unitPrice;
        return { item, size, quantity, total: unitSale * quantity };
    });
    const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
    const brandRules = coupon.brand || [];
    const productIds = coupon.productIds || [];
    const ruleDiscount = (rule, line) => rule.discountCategory === 'percentage'
        ? line.total * (rule.discountValue || 0) / 100
        : (rule.discountValue || 0) * line.quantity;

    const discount = !brandRules.length && !productIds.length
        ? (coupon.discountCategory === 'percentage' ? subtotal * (coupon.discountValue || 0) / 100 : coupon.discountValue || 0)
        : lines.reduce((sum, line) => {
            const brandId = getItemBrandId(line.item, line.size);
            const brandRule = brandId && brandRules.find((rule) => String(rule.brandId) === String(brandId));
            if (brandRule) return sum + ruleDiscount(brandRule, line);
            return productIds.includes(getLineTarget(line.item).id) ? sum + ruleDiscount(coupon, line) : sum;
        }, 0);

    return Math.min(subtotal, discount);
};

let gokwikEventsBound = false;

const useCheckoutStore = create((set, get) => ({
    coupon: null,
    status: 'idle',
    cartId: null,
    order: null,
    notice: null,
    resumeAfterLogin: false,
    popupOpen: false,

    setCoupon: (coupon) => set({ coupon }),
    clearNotice: () => set({ notice: null }),
    closeStatus: () => set({ status: 'idle', order: null }),
    closeCheckout: () => {
        window.gokwikSdk?.close?.();
        set((state) => ({ popupOpen: false, ...(state.status === 'open' && { status: 'idle' }) }));
    },

    startCheckout: async () => {
        const { status, coupon } = get();
        if (status === 'starting' || status === 'confirming') return;

        const { cart, setSliderOpen } = useCartStore.getState();
        if (cart.length === 0) return;

        if (!useAuthStore.getState().isAuthenticated) {
            set({ resumeAfterLogin: true });
            setSliderOpen(false);
            useUiStore.getState().setLoginOpen(true);
            return;
        }

        const couponBlocked = Boolean(coupon) && hasOfferItem(cart);
        set({
            status: 'starting',
            order: null,
            ...(couponBlocked && { notice: { type: 'warning', message: 'Offer code not applied: your cart already has an exclusive offer discount.' } })
        });
        try {
            const items = cart.map((item) => {
                const { isTube, id } = getLineTarget(item);
                return { ...(isTube ? { tubeId: id } : { productId: id }), quantity: item.quantity };
            });

            const response = await orderService.startGokwikCheckout({
                items,
                ...(coupon && !couponBlocked && { couponId: coupon._id })
            });

            if (!response?.success) {
                set({ status: 'idle', notice: { type: 'error', message: response?.message || 'Failed to start checkout.' } });
                return;
            }

            const { mid, environment, merchantCheckoutId, phoneNumber } = response.data;
            if (!(await loadGokwik(environment))) {
                set({ status: 'idle', notice: { type: 'error', message: 'Payment gateway failed to load. Please refresh the page and try again.' } });
                return;
            }

            bindGokwikEvents();
            set({ status: 'open', cartId: merchantCheckoutId, popupOpen: true });
            setSliderOpen(false);
            window.gokwikSdk.initCheckout({
                environment,
                type: 'merchantInfo',
                mid,
                ...(phoneNumber && { phoneNumber }),
                merchantParams: { merchantCheckoutId }
            });
        } catch (err) {
            set({ status: 'idle', notice: { type: 'error', message: err?.response?.data?.message || 'Failed to start checkout. Please try again.' } });
        }
    }
}));

const confirmOrder = async () => {
    const { cartId } = useCheckoutStore.getState();
    if (!cartId) return;

    useCheckoutStore.setState({ status: 'confirming', cartId: null, popupOpen: false });
    window.gokwikSdk?.close?.();

    try {
        for (let attempt = 0; attempt < 10; attempt++) {
            const res = await orderService.getGokwikCheckout(cartId);
            if (res?.data?.order) {
                await useCartStore.getState().clearCart();
                useCheckoutStore.setState({
                    status: 'placed',
                    order: res.data.order,
                    coupon: null,
                    notice: { type: 'success', message: 'Payment successful! Order placed.' }
                });
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
        useCheckoutStore.setState({ status: 'idle', notice: { type: 'warning', message: 'Payment received. Your order is still being confirmed, please check My Orders in a minute.' } });
    } catch (err) {
        useCheckoutStore.setState({ status: 'idle', notice: { type: 'error', message: err?.response?.data?.message || 'Could not confirm your order. Please check My Orders.' } });
    }
};

const bindGokwikEvents = () => {
    if (gokwikEventsBound) return;
    gokwikEventsBound = true;

    window.gokwikSdk.on('order-complete', confirmOrder);
    window.gokwikSdk.on('checkout-initiation-failure', () => {
        useCheckoutStore.setState({ notice: { type: 'error', message: 'Could not open checkout. Please try again.' } });
    });
    window.gokwikSdk.on('checkout-close', () => {
        useCheckoutStore.setState((state) => ({ popupOpen: false, ...(state.status === 'open' && { status: 'idle' }) }));
    });
};

useUiStore.subscribe((state, prev) => {
    if (state.isLoginOpen || !prev.isLoginOpen || !useCheckoutStore.getState().resumeAfterLogin) return;
    useCheckoutStore.setState({ resumeAfterLogin: false });
    if (useAuthStore.getState().isAuthenticated) useCheckoutStore.getState().startCheckout();
});

export default useCheckoutStore;
