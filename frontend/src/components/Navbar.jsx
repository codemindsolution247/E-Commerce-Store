import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, LayoutDashboard, Package, Menu, X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { useCartStore } from '../store/useCartStore'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const { items, fetchCart } = useCartStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { if (user) fetchCart() }, [user])
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  const cartCount = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'white',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : '0 1px 0 #e2e8f0',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px'
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '34px', height: '34px', background: '#2563eb',
            borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Package size={18} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1d4ed8', whiteSpace: 'nowrap' }}>ShopZone</span>
        </Link>

        {/* Desktop Center Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569', textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569', textDecoration: 'none' }}>Products</Link>
          {user?.is_admin && (
            <Link to="/admin" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#475569', textDecoration: 'none' }}>Admin</Link>
          )}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <>
              <Link to="/orders" style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.875rem', fontWeight: 500, color: '#475569',
                textDecoration: 'none', padding: '8px 12px', borderRadius: '8px'
              }}>
                <LayoutDashboard size={15} /> Orders
              </Link>

              {/* Cart Button */}
              <Link to="/cart" style={{
                position: 'relative', padding: '8px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#374151', textDecoration: 'none', background: '#f8fafc'
              }}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-2px', right: '-2px',
                    background: '#2563eb', color: 'white',
                    fontSize: '0.65rem', fontWeight: 700,
                    width: '18px', height: '18px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Info */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                paddingLeft: '12px', borderLeft: '1px solid #e2e8f0', marginLeft: '4px'
              }}>
                <div style={{
                  width: '32px', height: '32px', background: '#eff6ff', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <User size={15} color="#2563eb" />
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
                  {user.name.split(' ')[0]}
                </span>
                <button onClick={handleLogout} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px', color: '#94a3b8', display: 'flex', alignItems: 'center'
                }}>
                  <LogOut size={15} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" style={{
                fontSize: '0.875rem', fontWeight: 500, color: '#475569', textDecoration: 'none'
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                background: '#2563eb', color: 'white',
                fontSize: '0.875rem', fontWeight: 600,
                padding: '9px 20px', borderRadius: '9px',
                textDecoration: 'none', whiteSpace: 'nowrap'
              }}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px', color: '#374151',
              className: 'mobile-menu-btn'
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'white', borderTop: '1px solid #f1f5f9',
          padding: '16px 24px 20px',
          display: 'flex', flexDirection: 'column', gap: '12px'
        }}>
          <Link to="/"         onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Products</Link>
          {user ? (
            <>
              <Link to="/cart"   onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Cart ({cartCount})</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Orders</Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#ef4444', textAlign: 'left', padding: 0, fontWeight: 500 }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} style={{ fontSize: '0.9rem', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Create Account</Link>
            </>
          )}
        </div>
      )}

      {/* Mobile CSS */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}