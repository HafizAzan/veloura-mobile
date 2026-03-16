import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(({ product, quantity = 1 }) => {
    const id = product.id ?? product._id;
    const available = Math.max(0, Number(product.quantity) ?? 0);
    if (available === 0) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === id);
      const currentQty = existing ? existing.quantity : 0;
      const addQty = Math.min(Math.max(0, quantity), Math.max(0, available - currentQty));
      if (addQty <= 0) return prev;

      if (existing) {
        return prev.map((i) =>
          i.productId === id
            ? { ...i, quantity: i.quantity + addQty, availableQuantity: available }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: addQty,
          availableQuantity: available,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) => {
      const item = prev.find((i) => i.productId === productId);
      if (!item) return prev;
      const maxQty = item.availableQuantity ?? item.quantity ?? 999;
      const qty = Math.max(0, Math.min(maxQty, Math.floor(Number(quantity)) || 0));
      if (qty === 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
