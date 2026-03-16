import React, { createContext, useContext, useState, useCallback } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = useCallback((product) => {
    const id = product.id ?? product._id;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === id);
      if (idx >= 0) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return [
        ...prev,
        {
          productId: id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: product.quantity ?? 0,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId) => items.some((i) => i.productId === productId),
    [items]
  );

  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);

  const value = {
    items,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    isWishlistOpen,
    openWishlist,
    closeWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
