import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch]         = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [minPrice, setMinPrice]     = useState('')
  const [maxPrice, setMaxPrice]     = useState('')
  const [loading, setLoading]       = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search)     params.search      = search
      if (categoryId) params.category_id = categoryId
      if (minPrice)   params.min_price   = minPrice
      if (maxPrice)   params.max_price   = maxPrice
      const { data } = await api.get('/products', { params })
      setProducts(data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 400)
    return () => clearTimeout(timeout)
  }, [search, categoryId, minPrice, maxPrice])

  const clearFilters = () => { setSearch(''); setCategoryId(''); setMinPrice(''); setMaxPrice('') }

  const inputStyle = {
    width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px',
    padding: '10px 14px', fontSize: '0.875rem', color: '#0f172a',
    background: '#f8fafc', outline: 'none', fontFamily: 'inherit'
  }

  const labelStyle = {
    fontSize: '0.75rem', fontWeight: 600, color: '#64748b',
    display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em'
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
          All Products
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        padding: '20px 24px', marginBottom: '32px',
        display: 'grid',
        gridTemplateColumns: '2fr 1.2fr 1fr 1fr auto',
        gap: '16px', alignItems: 'end'
      }}>
        {/* Search */}
        <div>
          <label style={labelStyle}>Search</label>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{
              position: 'absolute', left: '12px', top: '50%',
              transform: 'translateY(-50%)', color: '#94a3b8'
            }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{ ...inputStyle, paddingLeft: '36px' }}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={categoryId} onChange={e => setCategoryId(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label style={labelStyle}>Min Price</label>
          <input
            type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
            placeholder="Rs. 0" style={inputStyle}
          />
        </div>

        {/* Max Price */}
        <div>
          <label style={labelStyle}>Max Price</label>
          <input
            type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
            placeholder="Rs. 99999" style={inputStyle}
          />
        </div>

        {/* Clear */}
        <div>
          <button onClick={clearFilters} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: '1px solid #e2e8f0',
            borderRadius: '10px', padding: '10px 16px',
            fontSize: '0.8rem', fontWeight: 500, color: '#64748b',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all 0.15s'
          }}>
            <X size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              background: '#f1f5f9', borderRadius: '16px', height: '300px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem 0', color: '#94a3b8' }}>
          <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</p>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
            No products found
          </p>
          <p style={{ fontSize: '0.875rem' }}>Try adjusting your filters</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .filter-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .filter-grid { grid-template-columns: 1fr !important; }
        }
        input:focus, select:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1) !important;
          background: white !important;
        }
      `}</style>
    </div>
  )
}