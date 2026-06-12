import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Package } from 'lucide-react'

const statusColors = {
  pending:    'bg-yellow-50 text-yellow-600',
  processing: 'bg-blue-50 text-blue-600',
  shipped:    'bg-purple-50 text-purple-600',
  delivered:  'bg-green-50 text-green-600',
  cancelled:  'bg-red-50 text-red-500',
}

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => { api.get('/orders').then(r => setOrders(r.data)) }, [])

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
      <Package className="w-20 h-20 mb-6 text-slate-200" />
      <p className="text-xl font-semibold">No orders yet</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">My Orders</h1>
      <div className="flex flex-col gap-5">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-slate-800">Order #{order.id}</p>
                <p className="text-xs text-slate-400">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                {order.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-600 border-t border-slate-50 pt-4">
              {order.items.map(i => (
                <div key={i.id} className="flex justify-between">
                  <span>{i.product.name} × {i.quantity}</span>
                  <span>Rs. {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-slate-800 mt-4 pt-4 border-t border-slate-100">
              <span>Total</span>
              <span className="text-primary-600">Rs. {order.total_amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}