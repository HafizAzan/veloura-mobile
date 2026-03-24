import api from './client';

export async function fetchOrdersForUser(userId) {
  if (!userId) return [];
  const data = await api(`orders?userId=${encodeURIComponent(userId)}`, { method: 'GET' });
  return Array.isArray(data) ? data : [];
}

export async function fetchOrderById(orderId) {
  if (!orderId) return null;
  return api(`orders/${encodeURIComponent(orderId)}`, { method: 'GET' });
}

export async function createOrder(payload) {
  const body = {
    orderId: payload.orderId || `VL-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    userId: payload.userId ?? null,
    total: payload.total,
    status: payload.status || 'Pending',
    shipping_address_id: payload.shipping_address_id ?? null,
    items: (payload.items || []).map((i) => ({
      productId: i.productId ?? i.product_id,
      product_id: i.productId ?? i.product_id,
      title: i.title,
      image: i.image,
      price: i.price,
      quantity: i.quantity,
    })),
  };
  return api('orders', { method: 'POST', body });
}
