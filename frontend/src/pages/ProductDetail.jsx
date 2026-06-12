import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Package, Star } from 'lucide-react'
import api from '../api/axios'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const { addToCart } = useCartStore()
  const { user } = useAuthStore()

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data))
  }, [id])

  const handleAdd = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await addToCart(product.id, qty)
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  if (!product) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-slate-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-24 h-24 text-slate-300" />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.category && (
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full w-fit mb-3">
              {product.category.name}
            </span>
          )}
          <h1 className="text-3xl font-bold text-slate-800 mb-3">{product.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            <span className="text-sm text-slate-400 ml-2">4.8 (24 reviews)</span>
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-6">{product.description || 'No description available.'}</p>

          <div className="text-4xl font-extrabold text-primary-600 mb-6">
            Rs. {product.price.toLocaleString()}
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className={`px-2 py-1 rounded-full font-medium ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg font-bold text-slate-500 hover:bg-slate-50 transition-colors">−</button>
                <span className="px-4 py-2 text-sm font-semibold border-x border-slate-200">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 text-lg font-bold text-slate-500 hover:bg-slate-50 transition-colors">+</button>
              </div>
            </div>
          )}

          <button onClick={handleAdd} disabled={product.stock === 0}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white font-bold px-8 py-4 rounded-xl transition-colors w-full md:w-auto">
            <ShoppingCart className="w-5 h-5" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}