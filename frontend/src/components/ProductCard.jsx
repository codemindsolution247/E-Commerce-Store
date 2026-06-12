import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    try {
      await addToCart(product.id)
      toast.success(`${product.name} added to cart!`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        cursor: 'pointer', height: '100%'
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', background: '#f8fafc', height: '200px', overflow: 'hidden' }}>
          {product.image_url ? (
            <img
              src={product.image_url} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem'
            }}>🛍️</div>
          )}

          {product.stock === 0 && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{
                background: 'white', color: '#374151',
                fontSize: '0.75rem', fontWeight: 700,
                padding: '4px 12px', borderRadius: '9999px'
              }}>Out of Stock</span>
            </div>
          )}

          {product.category && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              background: '#2563eb', color: 'white',
              fontSize: '0.7rem', fontWeight: 600,
              padding: '3px 10px', borderRadius: '9999px'
            }}>
              {product.category.name}
            </span>
          )}
        </div>

        {/* Details */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{
            fontWeight: 600, color: '#0f172a', fontSize: '0.95rem',
            marginBottom: '6px', lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {product.name}
          </h3>

          <p style={{
            fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5,
            flex: 1, marginBottom: '10px',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>
            {product.description || 'No description available.'}
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '12px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
            ))}
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: '4px' }}>(24)</span>
          </div>

          {/* Price + Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2563eb' }}>
              Rs. {product.price.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: product.stock === 0 ? '#e2e8f0' : '#2563eb',
                color: product.stock === 0 ? '#94a3b8' : 'white',
                fontSize: '0.78rem', fontWeight: 600,
                padding: '8px 14px', borderRadius: '9px',
                border: 'none', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s'
              }}
            >
              <ShoppingCart size={13} /> Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}