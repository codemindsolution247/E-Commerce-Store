import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import api from '../api/axios'
import { useCartStore } from '../store/useCartStore'
import toast from 'react-hot-toast'

export default function Checkout() {
  const [address, setAddress] = useState('')
  const [placed, setPlaced]   = useState(false)
  const [loading, setLoading] = useState(false)
  const { items, clearCart }  = useCartStore()
  const navigate = useNavigate()

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!address.trim()) { toast.error('Please enter delivery address'); return }
    setLoading(true)
    try {
      await api.post('/orders', { address })
      clearCart()
      setPlaced(true)
    } catch {
      toast.error('Failed to place order')
    }
    setLoading(false)
  }

  if (placed) return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Order Placed!</h2>
      <p className="text-slate-400 mb-8">Thank you! Your order has been placed successfully.</p>
      <div className="flex gap-3">
        <button onClick={() => navigate('/orders')}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
          View Orders
        </button>
        <button onClick={() => navigate('/products')}
          className="border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-6">Delivery Details</h2>
          <label className="block text-sm font-medium text-slate-600 mb-2">Full Delivery Address</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)}
            rows={5} placeholder="House #, Street, Area, City..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none mb-6" />
          <button type="submit" disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60">
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Order Items</h2>
          {items.map(i => (
            <div key={i.id} className="flex justify-between text-sm text-slate-600 mb-2">
              <span>{i.product.name} × {i.quantity}</span>
              <span>Rs. {(i.product.price * i.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between font-bold text-slate-800">
            <span>Total</span>
            <span className="text-primary-600">Rs. {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}