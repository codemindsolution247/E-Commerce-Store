import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.875rem',
    display: 'block',
    marginBottom: '8px',
    transition: 'color 0.15s'
  }

  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: '4rem' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '3rem 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              width: '32px', height: '32px', background: '#2563eb',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Package size={18} color="white" />
            </div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem' }}>ShopZone</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, maxWidth: '260px' }}>
            Your one-stop shop for quality products. Fast delivery, easy returns, and amazing deals every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '12px', fontSize: '0.9rem' }}>Quick Links</h4>
          <Link to="/"         style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/cart"     style={linkStyle}>Cart</Link>
          <Link to="/orders"   style={linkStyle}>My Orders</Link>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '12px', fontSize: '0.9rem' }}>Contact</h4>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>📧 support@shopzone.com</p>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '8px' }}>📞 +92 300 1234567</p>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>📍 Badin, Sindh, Pakistan</p>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #1e293b',
        textAlign: 'center',
        padding: '1rem',
        fontSize: '0.75rem',
        color: '#475569'
      }}>
        © {new Date().getFullYear()} ShopZone. Built with ❤️ by CodeTriad
      </div>
    </footer>
  )
}