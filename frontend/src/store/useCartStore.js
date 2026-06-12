import { create } from 'zustand'
import api from '../api/axios'

export const useCartStore = create((set, get) => ({
  items: [],

  fetchCart: async () => {
    const { data } = await api.get('/cart')
    set({ items: data })
  },

  addToCart: async (product_id, quantity = 1) => {
    await api.post('/cart', { product_id, quantity })
    get().fetchCart()
  },

  updateItem: async (item_id, quantity) => {
    await api.put(`/cart/${item_id}?quantity=${quantity}`)
    get().fetchCart()
  },

  removeItem: async (item_id) => {
    await api.delete(`/cart/${item_id}`)
    get().fetchCart()
  },

  clearCart: () => set({ items: [] }),

  get total() {
    return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  },
}))