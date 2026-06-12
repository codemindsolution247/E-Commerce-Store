import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Headphones } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const features = [
  { icon: <Truck className="w-6 h-6 text-blue-600" />,      title: 'Free Delivery',  desc: 'On all orders above Rs. 2000' },
  { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: 'Secure Payment', desc: '100% secure transactions' },
  { icon: <RefreshCcw className="w-6 h-6 text-blue-600" />,  title: 'Easy Returns',   desc: '30-day return policy' },
  { icon: <Headphones className="w-6 h-6 text-blue-600" />,  title: '24/7 Support',   desc: 'Always here to help' },
]

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.get('/products?limit=8').then(r => setFeatured(r.data)).catch(() => {})
  }, [])

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)' }}
        className="text-white py-24 px-6">
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '9999px',
            padding: '6px 16px',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '1.5rem'
          }}>
            🎉 New Arrivals Every Week
          </span>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.5rem'
          }}>
            Shop Smarter,<br />
            <span style={{ color: '#fbbf24' }}>Live Better</span>
          </h1>

          <p style={{
            fontSize: '1.125rem',
            color: '#bfdbfe',
            marginBottom: '2.5rem',
            maxWidth: '36rem',
            margin: '0 auto 2.5rem'
          }}>
            Discover thousands of products at unbeatable prices. Quality guaranteed, delivered to your door.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'white', color: '#1d4ed8',
              fontWeight: 700, padding: '14px 32px',
              borderRadius: '12px', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'transform 0.15s ease'
            }}>
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: '2px solid rgba(255,255,255,0.5)', color: 'white',
              fontWeight: 500, padding: '14px 32px',
              borderRadius: '12px', textDecoration: 'none',
              transition: 'background 0.15s ease'
            }}>
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Strip ─────────────────────────────── */}
      <section style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px' }}>
              <div style={{
                width: '48px', height: '48px', flexShrink: 0,
                background: '#eff6ff', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {f.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{f.title}</p>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a' }}>Featured Products</h2>
            <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '0.9rem' }}>Handpicked just for you</p>
          </div>
          <Link to="/products" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            color: '#2563eb', fontWeight: 500, fontSize: '0.875rem', textDecoration: 'none'
          }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🛍️</p>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#64748b' }}>No products yet</p>
            <p style={{ fontSize: '0.875rem' }}>Products added by admin will appear here</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* ── CTA Banner ─────────────────────────────────── */}
      <div style={{ padding: '0 1.5rem 4rem' }}>
        <section style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
          borderRadius: '24px',
          padding: '3.5rem 2rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>
            Ready to start shopping?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
            Join thousands of happy customers today
          </p>
          <Link to="/register" style={{
            display: 'inline-block',
            background: 'white', color: '#ea580c',
            fontWeight: 700, padding: '12px 32px',
            borderRadius: '12px', textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            Create Free Account
          </Link>
        </section>
      </div>
    </div>
  )
}