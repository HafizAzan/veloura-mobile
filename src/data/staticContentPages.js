/**
 * Mirrors veloura web marketing pages (non-admin). Keep in sync with veloura src/app route pages.
 */

export const STATIC_PAGES = {
  Stores: {
    heroLabel: 'Find us',
    heroIcon: 'location-outline',
    title: 'Store',
    titleAccent: 'Locator',
    subtitle: 'Visit our boutiques to discover and try our fragrances in person.',
    sections: [
      {
        title: 'Visit us in store',
        content:
          'Experience our fragrances in person at one of our boutiques. Our trained advisors can help you find your signature scent and offer complimentary samples.',
      },
      {
        title: 'Consultations',
        content:
          'Book a free fragrance consultation at our flagship store. We will guide you through our collection and help you choose the perfect scent for you or as a gift.',
      },
    ],
    storeLocations: [
      {
        name: 'Veloura Flagship',
        address: '123 Luxury Avenue, Paris',
        hours: 'Mon–Sat 10:00–20:00, Sun 11:00–18:00',
        note: 'Full range, consultations available.',
      },
      {
        name: 'Veloura Boutique — Lyon',
        address: '45 Rue de la République, Lyon',
        hours: 'Mon–Sat 10:00–19:00',
        note: 'Perfume bar and gift wrapping.',
      },
      {
        name: 'Veloura — Marseille',
        address: '78 Canebière, Marseille',
        hours: 'Tue–Sat 10:00–19:00',
        note: 'Selected collections and refills.',
      },
    ],
    footerLinks: [
      { label: 'Contact Us', route: 'ContactUs' },
      { label: 'Shipping', route: 'Shipping' },
    ],
  },

  Loyalty: {
    heroLabel: 'Rewards',
    heroIcon: 'trophy-outline',
    title: 'Loyalty',
    titleAccent: 'Program',
    subtitle: 'Earn points, unlock tiers, and enjoy exclusive rewards with every purchase.',
    sections: [
      {
        title: 'How it works',
        content:
          'Join the Veloura Loyalty Program for free. Earn points on every purchase: 1 point per dollar spent. Points can be redeemed for discounts on future orders or exclusive rewards. The more you shop, the more you earn.',
      },
      {
        title: 'Tiers & benefits',
        content:
          'Silver, Gold, and Platinum tiers unlock increasing benefits: early access to new fragrances, birthday rewards, free gift wrapping, and exclusive events. Tier status is based on your spending in the last 12 months.',
      },
      {
        title: 'Earning points',
        content:
          'Points are earned on the order total after any product discounts; shipping and taxes do not earn points. Bonus point promotions run throughout the year—check your email and our site for double-point days.',
      },
      {
        title: 'Redeeming points',
        content:
          'Use your points at checkout. Each point is worth a set value toward your order. You can combine points with most offers unless otherwise stated. Points do not expire as long as your account is active and you make at least one purchase every 24 months.',
      },
    ],
    primaryCta: { label: 'Sign in to join', route: 'Login' },
    footerLinks: [
      { label: 'Shop', route: 'Shop' },
      { label: 'Contact Us', route: 'ContactUs' },
    ],
  },

  OrderTracking: {
    heroLabel: 'Track',
    heroIcon: 'search-outline',
    title: 'Order',
    titleAccent: 'Tracking',
    subtitle: 'Keep an eye on your order from dispatch to delivery.',
    sections: [
      {
        title: 'Where to find your tracking info',
        content:
          'After your order is dispatched, we send an email with a tracking link and number. You can also sign in to your account and open the order in Order History to view status and tracking.',
      },
      {
        title: 'Tracking statuses',
        content:
          'Typical statuses include: Order placed, Processing, Dispatched, In transit, and Delivered. Click the tracking link for real-time updates from the carrier.',
      },
      {
        title: 'Delivery window',
        content:
          'The carrier’s tracking page usually shows an estimated delivery date. If you are not home, they may leave a notice or attempt redelivery—check the carrier’s policy for your region.',
      },
      {
        title: 'Need help?',
        content:
          'If your tracking has not updated for several days or the parcel is marked delivered but you have not received it, contact our customer care team with your order number and we will assist you.',
      },
    ],
    primaryCta: { label: 'View my orders', route: 'AccountOrders' },
    footerLinks: [
      { label: 'Shipping', route: 'Shipping' },
      { label: 'Contact Us', route: 'ContactUs' },
    ],
  },

  GiftWrapping: {
    heroLabel: 'Gifting',
    heroIcon: 'gift-outline',
    title: 'Gift',
    titleAccent: 'Wrapping',
    subtitle: 'Make every purchase feel like a present with our complimentary gift wrapping and messaging.',
    sections: [
      {
        title: 'Complimentary gift wrapping',
        content:
          'Every Veloura order can be beautifully wrapped at no extra cost. Select the gift wrapping option at checkout and we will pack your purchase in our signature packaging—perfect for giving.',
      },
      {
        title: 'Premium gift boxes',
        content:
          'Our gift boxes feature elegant design and sturdy construction. Choose from classic or seasonal styles. Add a personalised message and we will include a card with your order.',
      },
      {
        title: 'Gift messages',
        content:
          'Add a handwritten note or a printed message when you check out. We will place it inside the package so the recipient sees it as soon as they open their gift.',
      },
      {
        title: 'Sending directly to a recipient',
        content:
          'Enter the recipient’s address at checkout and we will ship the gift directly to them. We will not include any pricing information in the parcel.',
      },
    ],
    footerLinks: [
      { label: 'Shop', route: 'Shop' },
      { label: 'Contact Us', route: 'ContactUs' },
    ],
  },

  FragranceGuide: {
    heroLabel: 'Guide',
    heroIcon: 'leaf-outline',
    title: 'Fragrance',
    titleAccent: 'Guide',
    subtitle: 'Learn how to choose, wear, and care for your fragrances like a connoisseur.',
    sections: [
      {
        title: 'Understanding fragrance families',
        content:
          'Fragrances are grouped into families such as Floral, Woody, Oriental, Fresh, and Citrus. Each family has a distinct character. Knowing your preferred family helps you discover new scents you will love.',
      },
      {
        title: 'Top, heart & base notes',
        content:
          'Perfumes unfold in three stages: top notes (first impression, often citrus or herbs), heart notes (the main character, often floral or spicy), and base notes (the lasting trail, often woody or musky). Quality fragrances balance all three.',
      },
      {
        title: 'Choosing by occasion',
        content:
          'Light, fresh scents work well for day and office. Richer, warmer fragrances shine in the evening. Consider season too—citrus and aquatics suit summer; oud and amber suit cooler months.',
      },
      {
        title: 'Application tips',
        content:
          'Apply to pulse points—wrists, neck, behind ears—where skin is warmer. Don’t rub; let the fragrance dry naturally. Start with one or two sprays; you can always add more. Store bottles away from heat and light.',
      },
    ],
    footerLinks: [
      { label: 'Shop', route: 'Shop' },
      { label: 'Contact Us', route: 'ContactUs' },
    ],
  },

  Returns: {
    heroLabel: 'Customer Care',
    heroIcon: 'refresh-outline',
    title: 'Returns &',
    titleAccent: 'Exchanges',
    subtitle: 'Our hassle-free return and exchange process so you can shop with confidence.',
    sections: [
      {
        title: 'Return policy',
        content:
          'We want you to love your purchase. Unopened, unused items in original packaging may be returned within 30 days of delivery for a full refund or exchange. Items must be in resaleable condition.',
      },
      {
        title: 'How to return',
        content:
          'Contact our customer care team or use the returns portal in your account. We will send you a prepaid label. Pack the item securely, attach the label, and drop it at any participating carrier location.',
      },
      {
        title: 'Exchanges',
        content:
          'Prefer a different scent or size? Request an exchange within 30 days. We will ship the new item once we receive your return. If the replacement costs more, the difference will be charged; if less, we will refund the balance.',
      },
      {
        title: 'Refunds',
        content:
          'Refunds are processed within 5–7 business days after we receive and inspect your return. The amount will be credited to your original payment method. Sale items may have different terms; check product pages for details.',
      },
    ],
    footerLinks: [
      { label: 'Contact Us', route: 'ContactUs' },
      { label: 'Shipping', route: 'Shipping' },
    ],
  },

  Shipping: {
    heroLabel: 'Delivery',
    heroIcon: 'car-outline',
    title: 'Shipping &',
    titleAccent: 'Delivery',
    subtitle: 'Everything you need to know about how we ship your Veloura orders and when to expect them.',
    sections: [
      {
        title: 'Delivery times',
        content:
          'We aim to dispatch orders within 1–2 business days. Standard delivery takes 3–5 business days within the country. Express options may be available at checkout for faster delivery.',
      },
      {
        title: 'Shipping zones & costs',
        content:
          'We ship to most regions. Shipping costs are calculated at checkout based on your address and order size. Free standard shipping is available on orders over a minimum spend (see below).',
      },
      {
        title: 'Free shipping',
        content:
          'Enjoy free standard shipping on orders above a qualifying amount. The threshold and eligible regions are shown at checkout. This offer applies to standard delivery only.',
      },
      {
        title: 'Tracking your order',
        content:
          'Once your order is dispatched, you will receive an email with a tracking link. You can use it to see the status and estimated delivery date of your parcel.',
      },
      {
        title: 'International shipping',
        content:
          'We ship to selected international destinations. Delivery times and costs vary by country. Customs or import charges may apply and are the responsibility of the recipient.',
      },
    ],
    footerLinks: [
      { label: 'Contact Us', route: 'ContactUs' },
      { label: 'FAQ', route: 'FAQ' },
    ],
  },
};
