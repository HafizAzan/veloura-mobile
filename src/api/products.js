import api from './client';

export async function getProducts(params = {}) {
  const sp = new URLSearchParams();
  if (params.category) sp.set('category', params.category);
  if (params.family) sp.set('family', params.family);
  if (params.sale === true) sp.set('sale', 'true');
  if (params.page != null) sp.set('page', String(params.page));
  if (params.limit != null) sp.set('limit', String(params.limit));
  const q = sp.toString();
  const data = await api(q ? `products?${q}` : 'products');
  const list = Array.isArray(data) ? data : data?.data ?? data?.products ?? [];
  return list.map((p) => ({ ...p, id: p._id ?? p.id }));
}

export async function getProductById(id) {
  if (!id) return null;
  const data = await api(`products/${id}`);
  return data ? { ...data, id: data._id ?? data.id } : null;
}
