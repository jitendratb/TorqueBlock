import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './authStore';
import cartService from '@/services/cartService';

const reconstructCart = (backendItems) => {
  const cartGrouped = [];
  const itemsMap = {};

  backendItems.forEach((item) => {
    const sizeObj = item.productId;

    const parentProduct = sizeObj?.availableTyres || {
      _id: item.productId ? (typeof item.productId === 'string' ? item.productId : item.productId._id) : item._id,
      productName: item.productName,
      sku: item.sku,
      productImages: item.image ? [item.image] : [],
      brand: { name: 'Performance' }
    };

    const sizeItem = {
      _id: sizeObj?._id || item.productId || item._id,
      size: sizeObj?.size || item.size || 'Standard',
      price: sizeObj?.price || item.unitPrice || 0,
      position: sizeObj?.position || (item.size?.toLowerCase().includes('front') ? 'Front' : item.size?.toLowerCase().includes('rear') ? 'Rear' : 'Generic'),
      sku: item.sku
    };

    const position = (sizeItem.position || '').toLowerCase();
    let itemId = '';
    let selectedFront = null;
    let selectedRear = null;
    let selectedGeneric = null;

    if (position.includes('front')) {
      itemId = `${parentProduct._id}-${sizeItem._id}--`;
      selectedFront = sizeItem;
    } else if (position.includes('rear')) {
      itemId = `${parentProduct._id}--${sizeItem._id}-`;
      selectedRear = sizeItem;
    } else {
      itemId = `${parentProduct._id}---${sizeItem._id}`;
      selectedGeneric = sizeItem;
    }

    if (itemsMap[itemId]) {
      itemsMap[itemId].quantity += item.quantity;
    } else {
      itemsMap[itemId] = {
        id: itemId,
        product: parentProduct,
        selectedFront,
        selectedRear,
        selectedGeneric,
        price: sizeItem.price,
        quantity: item.quantity
      };
      cartGrouped.push(itemsMap[itemId]);
    }
  });

  return cartGrouped;
};

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isSliderOpen: false,
      activeAccordion: 'cart',

      setSliderOpen: (isOpen) => set({ isSliderOpen: isOpen }),

      setActiveAccordion: (accordion) => set({ activeAccordion: accordion }),

      syncLocalCartToBackend: async () => {
        const { cart } = get();
        if (!cart || cart.length === 0) return;

        try {
          const promises = [];
          for (const item of cart) {
            if (item.selectedFront) {
              promises.push(cartService.addToCart({
                productId: item.selectedFront._id,
                productName: item.product.productName,
                sku: item.selectedFront.sku || item.product.sku || '',
                image: item.product.productImages?.[0] || '',
                size: item.selectedFront.size,
                quantity: item.quantity,
                unitPrice: item.selectedFront.price,
                discountPrice: 0,
                totalPrice: item.selectedFront.price * item.quantity
              }));
            }
            if (item.selectedRear) {
              promises.push(cartService.addToCart({
                productId: item.selectedRear._id,
                productName: item.product.productName,
                sku: item.selectedRear.sku || item.product.sku || '',
                image: item.product.productImages?.[0] || '',
                size: item.selectedRear.size,
                quantity: item.quantity,
                unitPrice: item.selectedRear.price,
                discountPrice: 0,
                totalPrice: item.selectedRear.price * item.quantity
              }));
            }
            if (item.selectedGeneric) {
              promises.push(cartService.addToCart({
                productId: item.selectedGeneric._id,
                productName: item.product.productName,
                sku: item.selectedGeneric.sku || item.product.sku || '',
                image: item.product.productImages?.[0] || '',
                size: item.selectedGeneric.size,
                quantity: item.quantity,
                unitPrice: item.selectedGeneric.price,
                discountPrice: 0,
                totalPrice: item.selectedGeneric.price * item.quantity
              }));
            }
          }
          await Promise.all(promises);
        } catch (error) {
          console.error('Failed to sync local cart to backend:', error);
        }
      },

      fetchCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (!isAuthenticated || !token) return;

        try {
          const response = await cartService.getCart();
          if (response?.success && response?.data) {
            const reconstructed = reconstructCart(response.data);
            set({ cart: reconstructed });
          }
        } catch (error) {
          console.error('Failed to fetch cart from backend:', error);
        }
      },

      addToCart: async (product, selectedFront, selectedRear, selectedGeneric, isSliderOpen = true) => {
        const itemsToAdd = [];
        if (selectedFront) {
          itemsToAdd.push({
            id: `${product._id}-${selectedFront._id || selectedFront.size}--`,
            selectedFront,
            selectedRear: null,
            selectedGeneric: null,
            price: selectedFront.price || 0
          });
        }
        if (selectedRear) {
          itemsToAdd.push({
            id: `${product._id}--${selectedRear._id || selectedRear.size}-`,
            selectedFront: null,
            selectedRear,
            selectedGeneric: null,
            price: selectedRear.price || 0
          });
        }
        if (selectedGeneric) {
          itemsToAdd.push({
            id: `${product._id}---${selectedGeneric._id || selectedGeneric.size}`,
            selectedFront: null,
            selectedRear: null,
            selectedGeneric,
            price: selectedGeneric.price || 0
          });
        }

        set((state) => {
          let newCart = [...state.cart];

          itemsToAdd.forEach((itemToAdd) => {
            const existingItemIndex = newCart.findIndex((item) => item.id === itemToAdd.id);
            if (existingItemIndex > -1) {
              newCart[existingItemIndex].quantity += 1;
            } else {
              newCart.push({
                id: itemToAdd.id,
                product,
                selectedFront: itemToAdd.selectedFront,
                selectedRear: itemToAdd.selectedRear,
                selectedGeneric: itemToAdd.selectedGeneric,
                price: itemToAdd.price,
                quantity: 1,
              });
            }
          });

          return {
            cart: newCart,
            isSliderOpen: isSliderOpen,
            activeAccordion: 'cart',
          };
        });

        const { isAuthenticated } = useAuthStore.getState();
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (isAuthenticated && token) {
          try {
            const promises = [];

            if (selectedFront) {
              promises.push(cartService.addToCart({
                productId: selectedFront._id,
                productName: product.productName,
                sku: selectedFront.sku || product.sku || '',
                image: product.productImages?.[0] || '',
                size: selectedFront.size,
                quantity: 1,
                unitPrice: selectedFront.price,
                discountPrice: 0,
                totalPrice: selectedFront.price
              }));
            }

            if (selectedRear) {
              promises.push(cartService.addToCart({
                productId: selectedRear._id,
                productName: product.productName,
                sku: selectedRear.sku || product.sku || '',
                image: product.productImages?.[0] || '',
                size: selectedRear.size,
                quantity: 1,
                unitPrice: selectedRear.price,
                discountPrice: 0,
                totalPrice: selectedRear.price
              }));
            }

            if (selectedGeneric) {
              promises.push(cartService.addToCart({
                productId: selectedGeneric._id,
                productName: product.productName,
                sku: selectedGeneric.sku || product.sku || '',
                image: product.productImages?.[0] || '',
                size: selectedGeneric.size,
                quantity: 1,
                unitPrice: selectedGeneric.price,
                discountPrice: 0,
                totalPrice: selectedGeneric.price
              }));
            }

            await Promise.all(promises);
          } catch (error) {
            console.error('Failed to sync addToCart with backend:', error);
          }
        }
      },

      removeFromCart: async (itemId) => {
        const itemToDelete = get().cart.find((item) => item.id === itemId);

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));

        if (!itemToDelete) return;

        const { isAuthenticated } = useAuthStore.getState();
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (isAuthenticated && token) {
          try {
            const promises = [];
            if (itemToDelete.selectedFront) {
              promises.push(cartService.deleteCart(itemToDelete.selectedFront._id));
            }
            if (itemToDelete.selectedRear) {
              promises.push(cartService.deleteCart(itemToDelete.selectedRear._id));
            }
            if (itemToDelete.selectedGeneric) {
              promises.push(cartService.deleteCart(itemToDelete.selectedGeneric._id));
            }
            await Promise.all(promises);
          } catch (error) {
            console.error('Failed to sync removeFromCart with backend:', error);
          }
        }
      },

      updateQuantity: async (itemId, delta) => {
        let targetItem = null;
        let newQty = 0;

        // Optimistic local update
        set((state) => {
          const newCart = state.cart.map((item) => {
            if (item.id === itemId) {
              newQty = item.quantity + delta;
              if (newQty > 0) {
                targetItem = { ...item, quantity: newQty };
                return targetItem;
              } else {
                targetItem = { ...item, quantity: 0 };
                return null;
              }
            }
            return item;
          }).filter(Boolean);

          return { cart: newCart };
        });

        if (!targetItem) return;

        // Backend synchronization
        const { isAuthenticated } = useAuthStore.getState();
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (isAuthenticated && token) {
          try {
            const promises = [];

            if (newQty <= 0) {
              if (targetItem.selectedFront) promises.push(cartService.deleteCart(targetItem.selectedFront._id));
              if (targetItem.selectedRear) promises.push(cartService.deleteCart(targetItem.selectedRear._id));
              if (targetItem.selectedGeneric) promises.push(cartService.deleteCart(targetItem.selectedGeneric._id));
            } else {
              if (targetItem.selectedFront) promises.push(cartService.updateCart(targetItem.selectedFront._id, newQty));
              if (targetItem.selectedRear) promises.push(cartService.updateCart(targetItem.selectedRear._id, newQty));
              if (targetItem.selectedGeneric) promises.push(cartService.updateCart(targetItem.selectedGeneric._id, newQty));
            }

            await Promise.all(promises);
          } catch (error) {
            console.error('Failed to sync updateQuantity with backend:', error);
          }
        }
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;
