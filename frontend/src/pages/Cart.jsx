import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

export default function Cart() {
  const { items, fetchCart, updateItem, removeItem } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => { fetchCart() }, [])

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  if (items.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
      <ShoppingBag className="w-20 h-20 mb-6 text-slate-200" />
      <p className="text-xl font-semibold mb-2">Your cart is empty</p>
      <p className="text-sm mb-8">Add some products to get started</p>
      <Link to="/products" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors">
        Browse Products
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-4 items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                {item.product.image_url
                  ? <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  : <span className="text-3xl">🛍️</span>}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{item.product.name}</p>
                <p className="text-primary-600 font-bold">Rs. {item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => updateItem(item.id, item.quantity - 1)}
                  className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 font-bold">−</button>
                <span className="px-3 py-1.5 text-sm font-semibold border-x border-slate-200">{item.quantity}</span>
                <button onClick={() => updateItem(item.id, item.quantity + 1)}
                  className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 font-bold">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Subtotal ({items.length} items)</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 mb-4">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-slate-800 mb-6">
            <span>Total</span>
            <span className="text-primary-600 text-lg">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <button onClick={() => navigate('/checkout')}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors">
            Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}