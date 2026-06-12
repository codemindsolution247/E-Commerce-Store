import { create } from 'zustand'
import api from '../api/axios'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  login: async (email, password) => {
    const form = new FormData()
    form.append('username', email)
    form.append('password', password)
    const { data } = await api.post('/auth/login', form)
    localStorage.setItem('token', data.access_token)
    const me = await api.get('/auth/me')
    localStorage.setItem('user', JSON.stringify(me.data))
    set({ token: data.access_token, user: me.data })
    return me.data
  },

  register: async (name, email, password) => {
    await api.post('/auth/register', { name, email, password })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null })
  },
}))