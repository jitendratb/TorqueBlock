import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './authStore';
import cartService from '@/services/cartService';

const normalizeId = (id) => String(id || '').replace(/_offer_[^ -]+/g, '').replace(/-+/g, '-').replace(/-$/, '');

const reconstructCart = (backendItems) => {
  const cartGrouped = [];
  const itemsMap = {};

  backendItems.forEach((item) => {
    const sizeObj = item.productId;

    const parentProduct = sizeObj?.availableTyres || {
      _id: item.productId ? (typeof item.productId === 'string' ? item.productId : item.productId._id) : item._id,
      productName: item.productName || item.name,
      sku: item.sku,
      productImages: item.image ? [item.image] : [],
      brand: { name: 'Performance' },
      type: item.type || sizeObj?.type || 'Tyre'
    };

    const sizeItem = {
      _id: sizeObj?._id || item.productId || item._id,
      size: sizeObj?.size || item.size || 'Standard',
      price: sizeObj?.price || item.unitPrice || 0,
      discount: item.discountPrice !== undefined && item.discountPrice !== null ? item.discountPrice : (sizeObj?.discount || item.discount || 0),
      position: sizeObj?.position || (item.size?.toLowerCase().includes('front') ? 'Front' : item.size?.toLowerCase().includes('rear') ? 'Rear' : 'Generic'),
      sku: item.sku,
      type: item.type || sizeObj?.type || 'Tyre',
      offerId: item.offerId || sizeObj?.offerId,
      isOfferItem: item.isOfferItem || sizeObj?.isOfferItem
    };

    const position = (sizeItem.position || '').toLowerCase();
    let selectedFront = null;
    let selectedRear = null;
    let selectedGeneric = null;

    if (position.includes('front')) {
      selectedFront = sizeItem;
    } else if (position.includes('rear')) {
      selectedRear = sizeItem;
    } else {
      selectedGeneric = sizeItem;
    }

    const itemId = normalizeId(`${parentProduct._id}-${sizeItem._id}`);

    if (itemsMap[itemId]) {
      itemsMap[itemId].quantity += item.quantity;
      if (selectedFront) itemsMap[itemId].selectedFront = sizeItem;
      if (selectedRear) itemsMap[itemId].selectedRear = sizeItem;
      if (selectedGeneric) itemsMap[itemId].selectedGeneric = sizeItem;
      itemsMap[itemId].price = sizeItem.price;
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
            const itemType = item.selectedGeneric?.type || item.selectedFront?.type || item.selectedRear?.type || item.product?.type || 'Tyre';
            const getImage = () => item.product.productImages?.[0] || (typeof item.product.images?.[0] === 'string' ? item.product.images[0] : item.product.images?.[0]?.url) || '';

            if (item.selectedFront) {
              const frontDisc = item.selectedFront.discount || item.selectedFront.discountAmount || 0;
              promises.push(cartService.addToCart({
                productId: item.selectedFront._id,
                productName: item.product.productName || item.product.name,
                sku: item.selectedFront.sku || item.product.sku || '',
                image: getImage(),
                size: item.selectedFront.size,
                quantity: item.quantity,
                unitPrice: item.selectedFront.price,
                discountPrice: frontDisc,
                totalPrice: Math.max(0, item.selectedFront.price - frontDisc) * item.quantity,
                type: itemType
              }));
            }
            if (item.selectedRear) {
              const rearDisc = item.selectedRear.discount || item.selectedRear.discountAmount || 0;
              promises.push(cartService.addToCart({
                productId: item.selectedRear._id,
                productName: item.product.productName || item.product.name,
                sku: item.selectedRear.sku || item.product.sku || '',
                image: getImage(),
                size: item.selectedRear.size,
                quantity: item.quantity,
                unitPrice: item.selectedRear.price,
                discountPrice: rearDisc,
                totalPrice: Math.max(0, item.selectedRear.price - rearDisc) * item.quantity,
                type: itemType
              }));
            }
            if (item.selectedGeneric) {
              const genDisc = item.selectedGeneric.discount || item.selectedGeneric.discountAmount || 0;
              promises.push(cartService.addToCart({
                productId: item.selectedGeneric._id,
                productName: item.product.productName || item.product.name,
                sku: item.selectedGeneric.sku || item.product.sku || '',
                image: getImage(),
                size: item.selectedGeneric.size,
                quantity: item.quantity,
                unitPrice: item.selectedGeneric.price,
                discountPrice: genDisc,
                totalPrice: Math.max(0, item.selectedGeneric.price - genDisc) * item.quantity,
                type: itemType
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
            id: normalizeId(`${product._id}-${selectedFront._id || selectedFront.size}`),
            selectedFront,
            selectedRear: null,
            selectedGeneric: null,
            price: selectedFront.price || 0
          });
        }
        if (selectedRear) {
          itemsToAdd.push({
            id: normalizeId(`${product._id}-${selectedRear._id || selectedRear.size}`),
            selectedFront: null,
            selectedRear,
            selectedGeneric: null,
            price: selectedRear.price || 0
          });
        }
        if (selectedGeneric) {
          itemsToAdd.push({
            id: normalizeId(`${product._id}-${selectedGeneric._id || selectedGeneric.size}`),
            selectedFront: null,
            selectedRear: null,
            selectedGeneric,
            price: selectedGeneric.price || 0
          });
        }

        set((state) => {
          let currentCart = [...state.cart];
          const mergedMap = {};

          currentCart.forEach((item) => {
            const cleanId = normalizeId(item.id);
            if (mergedMap[cleanId]) {
              mergedMap[cleanId].quantity += item.quantity;
            } else {
              mergedMap[cleanId] = { ...item, id: cleanId };
            }
          });

          itemsToAdd.forEach((itemToAdd) => {
            const cleanId = normalizeId(itemToAdd.id);
            if (mergedMap[cleanId]) {
              const existingItem = mergedMap[cleanId];
              mergedMap[cleanId] = {
                ...existingItem,
                product: product || existingItem.product,
                selectedFront: itemToAdd.selectedFront || existingItem.selectedFront,
                selectedRear: itemToAdd.selectedRear || existingItem.selectedRear,
                selectedGeneric: itemToAdd.selectedGeneric || existingItem.selectedGeneric,
                price: itemToAdd.price,
                quantity: existingItem.quantity + 1,
              };
            } else {
              mergedMap[cleanId] = {
                id: cleanId,
                product,
                selectedFront: itemToAdd.selectedFront,
                selectedRear: itemToAdd.selectedRear,
                selectedGeneric: itemToAdd.selectedGeneric,
                price: itemToAdd.price,
                quantity: 1,
              };
            }
          });

          const newCart = Object.values(mergedMap);

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
            const getProductImg = () => product.productImages?.[0] || (typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url) || '';

            if (selectedFront) {
              const frontDisc = selectedFront.discount || selectedFront.discountAmount || 0;
              const frontNetPrice = selectedFront.price ? Math.max(0, selectedFront.price - frontDisc) : 0;
              promises.push(cartService.addToCart({
                productId: selectedFront._id,
                productName: product.productName || product.name,
                sku: selectedFront.sku || product.sku || '',
                image: getProductImg(),
                size: selectedFront.size,
                quantity: 1,
                unitPrice: selectedFront.price,
                discountPrice: frontDisc,
                totalPrice: frontNetPrice,
                type: selectedFront.type || product.type || 'Tyre'
              }));
            }

            if (selectedRear) {
              const rearDisc = selectedRear.discount || selectedRear.discountAmount || 0;
              const rearNetPrice = selectedRear.price ? Math.max(0, selectedRear.price - rearDisc) : 0;
              promises.push(cartService.addToCart({
                productId: selectedRear._id,
                productName: product.productName || product.name,
                sku: selectedRear.sku || product.sku || '',
                image: getProductImg(),
                size: selectedRear.size,
                quantity: 1,
                unitPrice: selectedRear.price,
                discountPrice: rearDisc,
                totalPrice: rearNetPrice,
                type: selectedRear.type || product.type || 'Tyre'
              }));
            }

            if (selectedGeneric) {
              const genDisc = selectedGeneric.discount || selectedGeneric.discountAmount || 0;
              const genNetPrice = selectedGeneric.price ? Math.max(0, selectedGeneric.price - genDisc) : 0;
              promises.push(cartService.addToCart({
                productId: selectedGeneric._id,
                productName: product.productName || product.name,
                sku: selectedGeneric.sku || product.sku || '',
                image: getProductImg(),
                size: selectedGeneric.size,
                quantity: 1,
                unitPrice: selectedGeneric.price,
                discountPrice: genDisc,
                totalPrice: genNetPrice,
                type: selectedGeneric.type || product.type || 'Tyre'
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

      clearCart: async () => {
        const currentCart = get().cart;
        set({ cart: [] });

        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('cart-storage');
          } catch (e) {
            console.error('Error removing cart-storage from localStorage:', e);
          }
        }

        const { isAuthenticated } = useAuthStore.getState();
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

        if (isAuthenticated && token) {
          try {
            await cartService.clearCart();
          } catch (error) {
            console.error('Failed to sync clearCart with backend:', error);
          }
        }
      },

      getCartTotal: () => {
        return get().cart.reduce((total, item) => {
          const selected = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
          const disc = selected.discount || selected.discountAmount || item.discount || item.product?.discount || 0;
          const unitOriginal = item.price || selected.price || 0;
          const unitSale = disc > 0 ? Math.max(0, unitOriginal - disc) : unitOriginal;
          return total + (unitSale * (item.quantity || 1));
        }, 0);
      },

      getCartOriginalTotal: () => {
        return get().cart.reduce((total, item) => {
          const selected = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
          const unitOriginal = item.price || selected.price || 0;
          return total + (unitOriginal * (item.quantity || 1));
        }, 0);
      },

      getCartTotalDiscount: () => {
        return get().cart.reduce((total, item) => {
          const selected = item.selectedFront || item.selectedRear || item.selectedGeneric || {};
          const disc = selected.discount || selected.discountAmount || item.discount || item.product?.discount || 0;
          return total + (disc * (item.quantity || 1));
        }, 0);
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
