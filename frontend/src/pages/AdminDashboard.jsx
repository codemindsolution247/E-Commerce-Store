import { useEffect, useState } from 'react'
import { Plus, Trash2, Package, ShoppingBag, Tag } from 'lucide-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders]         = useState([])
  const [tab, setTab]               = useState('products')
  const [showForm, setShowForm]     = useState(false)
  const [form, setForm] = useState({ name:'', description:'', price:'', stock:'', image_url:'', category_id:'' })

  const fetchAll = async () => {
    try {
      const [p, c, o] = await Promise.all([
        api.get('/products?limit=100'),
        api.get('/categories'),
        api.get('/orders/all')
      ])
      setProducts(p.data); setCategories(c.data); setOrders(o.data)
    } catch {}
  }

  useEffect(() => { fetchAll() }, [])

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await api.post('/products', {
        ...form,
        price: +form.price,
        stock: +form.stock,
        category_id: form.category_id || null
      })
      toast.success('Product added!')
      setShowForm(false)
      setForm({ name:'', description:'', price:'', stock:'', image_url:'', category_id:'' })
      fetchAll()
    } catch { toast.error('Failed to add product') }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    await api.delete(`/products/${id}`)
    toast.success('Product deleted')
    fetchAll()
  }

  const handleStatusUpdate = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status?status=${status}`)
    toast.success('Status updated')
    fetchAll()
  }

  const handleAddCategory = async () => {
    const name = prompt('Category name:')
    if (!name) return
    try {
      await api.post('/categories', { name })
      toast.success('Category added')
      fetchAll()
    } catch { toast.error('Category already exists') }
  }

  const statusColors = {
    pending:    { background: '#fefce8', color: '#ca8a04' },
    processing: { background: '#eff6ff', color: '#2563eb' },
    shipped:    { background: '#f5f3ff', color: '#7c3aed' },
    delivered:  { background: '#f0fdf4', color: '#16a34a' },
    cancelled:  { background: '#fef2f2', color: '#dc2626' },
  }

  const inputStyle = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
    padding: '10px 14px', fontSize: '0.875rem', color: '#0f172a',
    background: '#f8fafc', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    fontSize: '0.75rem', fontWeight: 600, color: '#64748b',
    display: 'block', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.05em'
  }

  const tabs = [
    { id: 'products',   label: 'Products',   icon: <Package size={15} /> },
    { id: 'orders',     label: 'Orders',     icon: <ShoppingBag size={15} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={15} /> },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Manage your store</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: '#eff6ff', borderRadius: '14px', padding: '14px 24px', textAlign: 'center', minWidth: '90px' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2563eb', lineHeight: 1 }}>{products.length}</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', marginTop: '4px' }}>Products</p>
          </div>
          <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '14px 24px', textAlign: 'center', minWidth: '90px' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#16a34a', lineHeight: 1 }}>{orders.length}</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e', marginTop: '4px' }}>Orders</p>
          </div>
          <div style={{ background: '#f5f3ff', borderRadius: '14px', padding: '14px 24px', textAlign: 'center', minWidth: '90px' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#7c3aed', lineHeight: 1 }}>{categories.length}</p>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8b5cf6', marginTop: '4px' }}>Categories</p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '24px',
        borderBottom: '2px solid #f1f5f9', paddingBottom: '0'
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '10px 10px 0 0',
            fontSize: '0.875rem', fontWeight: 600,
            border: 'none', cursor: 'pointer',
            background: tab === t.id ? '#2563eb' : 'transparent',
            color: tab === t.id ? 'white' : '#64748b',
            marginBottom: '-2px',
            borderBottom: tab === t.id ? '2px solid #2563eb' : '2px solid transparent',
            transition: 'all 0.15s'
          }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ══════════ PRODUCTS TAB ══════════ */}
      {tab === 'products' && (
        <div>
          <button onClick={() => setShowForm(!showForm)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#2563eb', color: 'white',
            fontSize: '0.875rem', fontWeight: 600,
            padding: '10px 20px', borderRadius: '10px',
            border: 'none', cursor: 'pointer', marginBottom: '20px'
          }}>
            <Plus size={16} /> Add Product
          </button>

          {/* Add Product Form */}
          {showForm && (
            <form onSubmit={handleAddProduct} style={{
              background: 'white', borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '24px', marginBottom: '24px',
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }}>
              {[
                { label: 'Product Name', key: 'name',      type: 'text',   placeholder: 'e.g. iPhone 15 Pro', required: true },
                { label: 'Price (Rs.)',  key: 'price',     type: 'number', placeholder: '5000',               required: true },
                { label: 'Stock',        key: 'stock',     type: 'number', placeholder: '10',                 required: true },
                { label: 'Image URL',    key: 'image_url', type: 'text',   placeholder: 'https://...',        required: false },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type} placeholder={f.placeholder} required={f.required}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              ))}

              <div>
                <label style={labelStyle}>Category</label>
                <select
                  value={form.category_id}
                  onChange={e => setForm({ ...form, category_id: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">No Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={2} placeholder="Optional product description..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
                <button type="submit" style={{
                  background: '#2563eb', color: 'white',
                  padding: '10px 24px', borderRadius: '10px',
                  border: 'none', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: 600
                }}>
                  Save Product
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  background: 'none', color: '#64748b',
                  padding: '10px 24px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: 500
                }}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Products Table */}
          <div style={{
            background: 'white', borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '12px 16px',
                      fontSize: '0.72rem', fontWeight: 700,
                      color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                      <p style={{ fontSize: '2rem', marginBottom: '8px' }}>📦</p>
                      <p style={{ fontWeight: 600, color: '#64748b' }}>No products yet</p>
                      <p style={{ fontSize: '0.8rem' }}>Click "Add Product" to get started</p>
                    </td>
                  </tr>
                ) : products.map((p, idx) => (
                  <tr key={p.id} style={{
                    borderBottom: '1px solid #f1f5f9',
                    background: idx % 2 === 0 ? 'white' : '#fafafa'
                  }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '8px',
                          background: '#f1f5f9', flexShrink: 0, overflow: 'hidden'
                        }}>
                          {p.image_url
                            ? <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🛍️</div>
                          }
                        </div>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{p.category?.name || '—'}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2563eb' }}>
                      Rs. {p.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                        background: p.stock > 0 ? '#f0fdf4' : '#fef2f2',
                        color: p.stock > 0 ? '#16a34a' : '#dc2626'
                      }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                        background: p.is_active ? '#eff6ff' : '#f1f5f9',
                        color: p.is_active ? '#2563eb' : '#94a3b8'
                      }}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '6px', color: '#cbd5e1', borderRadius: '6px'
                      }}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════ ORDERS TAB ══════════ */}
      {tab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
              <p style={{ fontSize: '3rem', marginBottom: '8px' }}>📋</p>
              <p style={{ fontWeight: 600, color: '#64748b' }}>No orders yet</p>
            </div>
          ) : orders.map(order => (
            <div key={order.id} style={{
              background: 'white', borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              padding: '20px 24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Order #{order.id}</p>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                    {new Date(order.created_at).toLocaleDateString()} · {order.address}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={e => handleStatusUpdate(order.id, e.target.value)}
                  style={{
                    border: '1px solid #e2e8f0', borderRadius: '9px',
                    padding: '7px 12px', fontSize: '0.8rem', fontWeight: 600,
                    cursor: 'pointer', background: 'white', outline: 'none',
                    color: statusColors[order.status]?.color || '#374151'
                  }}
                >
                  {['pending','processing','shipped','delivered','cancelled'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', marginBottom: '12px' }}>
                {order.items.map(i => (
                  <span key={i.id} style={{ fontSize: '0.82rem', color: '#475569' }}>
                    {i.product.name} <span style={{ color: '#94a3b8' }}>×{i.quantity}</span>
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Amount</span>
                <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1rem' }}>
                  Rs. {order.total_amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════ CATEGORIES TAB ══════════ */}
      {tab === 'categories' && (
        <div>
          <button onClick={handleAddCategory} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#2563eb', color: 'white',
            fontSize: '0.875rem', fontWeight: 600,
            padding: '10px 20px', borderRadius: '10px',
            border: 'none', cursor: 'pointer', marginBottom: '20px'
          }}>
            <Plus size={16} /> Add Category
          </button>

          {categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
              <p style={{ fontSize: '3rem', marginBottom: '8px' }}>🏷️</p>
              <p style={{ fontWeight: 600, color: '#64748b' }}>No categories yet</p>
              <p style={{ fontSize: '0.8rem' }}>Add categories to organize your products</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '12px'
            }}>
              {categories.map(c => (
                <div key={c.id} style={{
                  background: 'white', borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', background: '#eff6ff',
                      borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Tag size={14} color="#2563eb" />
                    </div>
                    <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{c.name}</span>
                  </div>
                  <button
                    onClick={async () => {
                      await api.delete(`/categories/${c.id}`)
                      fetchAll()
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#cbd5e1' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        input:focus, select:focus, textarea:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
          background: white !important;
        }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  )
}