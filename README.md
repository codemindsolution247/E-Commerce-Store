

<div align="center">

<img src="https://img.shields.io/badge/ShopZone-E--Commerce%20Platform-2563eb?style=for-the-badge&logo=shopify&logoColor=white"/>

# 🛍️ ShopZone — Full-Stack E-Commerce Platform

**A fully functional, production-ready e-commerce web application**
built with React + FastAPI + SQLite

[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)

</div>

---

## 📸 Preview

> Live Demo: _coming soon_ · Built by [CodeMind Solution](https://github.com/codemind-solution)

---

## ✨ Features

### 🛒 Customer Side
- 🔐 Register & Login with JWT authentication
- 🏠 Home page with hero banner, featured products & CTA
- 🔍 Product listing with **live search**, category filter & price range filter
- 📦 Product detail page with quantity selector
- 🛒 Shopping cart — add, update quantity, remove items
- 📋 Checkout with delivery address
- 📜 Order history with real-time status tracking

### 🔧 Admin Side
- ➕ Add / Delete products with image URL, price, stock, category
- 📊 Dashboard with product & order count stats
- 🏷️ Category management (add / delete)
- 🔄 Update order status (Pending → Processing → Shipped → Delivered)
- 👁️ View all orders from all users

### ⚙️ Technical
- JWT-based authentication with protected routes
- RESTful API with full CRUD operations
- CORS configured for local development
- SQLite database with SQLAlchemy ORM
- Pydantic schema validation
- Zustand for global state management
- React Router v6 for client-side routing
- Toast notifications for user feedback
- Fully responsive — mobile, tablet, desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite), Tailwind CSS v4, Zustand, React Router v6 |
| Backend | FastAPI, Python 3.11+ |
| Database | SQLite via SQLAlchemy ORM |
| Auth | JWT (python-jose), bcrypt password hashing |
| Icons | Lucide React |
| HTTP Client | Axios |
| Notifications | React Hot Toast |

---

## 📁 Project Structure

```
ShopZone/
├── frontend/                     # React + Vite
│   ├── src/
│   │   ├── api/axios.js          # Axios instance with JWT interceptor
│   │   ├── store/
│   │   │   ├── useAuthStore.js   # Auth state (Zustand)
│   │   │   └── useCartStore.js   # Cart state (Zustand)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/                      # FastAPI
    ├── routes/
    │   ├── auth_routes.py
    │   ├── product_routes.py
    │   ├── cart_routes.py
    │   ├── order_routes.py
    │   └── category_routes.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── auth.py
    ├── main.py
    └── ecommerce.db              # Auto-created on first run
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/codemind-solution/shopzone.git
cd shopzone
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Linux/Mac

# Install dependencies
pip install fastapi uvicorn sqlalchemy python-jose[cryptography] bcrypt python-multipart

# Start the server
uvicorn main:app --reload
```

Backend runs at: **`http://localhost:8000`**
API Docs (Swagger): **`http://localhost:8000/docs`**

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend runs at: **`http://localhost:5173`**

---

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login & get JWT token | Public |
| GET | `/auth/me` | Get current user | User |
| GET | `/products` | List products (search, filter) | Public |
| GET | `/products/{id}` | Get single product | Public |
| POST | `/products` | Add product | Admin |
| PUT | `/products/{id}` | Update product | Admin |
| DELETE | `/products/{id}` | Delete product | Admin |
| GET | `/categories` | List categories | Public |
| POST | `/categories` | Add category | Admin |
| DELETE | `/categories/{id}` | Delete category | Admin |
| GET | `/cart` | Get user cart | User |
| POST | `/cart` | Add item to cart | User |
| PUT | `/cart/{id}` | Update cart item qty | User |
| DELETE | `/cart/{id}` | Remove cart item | User |
| POST | `/orders` | Place order | User |
| GET | `/orders` | Get my orders | User |
| GET | `/orders/all` | Get all orders | Admin |
| PUT | `/orders/{id}/status` | Update order status | Admin |

---

## 👑 Admin Access

After registering, run this in the `backend` folder to make your account admin:

```bash
python -c "
from sqlalchemy import create_engine, text
engine = create_engine('sqlite:///./ecommerce.db')
with engine.connect() as conn:
    conn.execute(text(\"UPDATE users SET is_admin=1 WHERE email='your@email.com'\"))
    conn.commit()
print('Done! You are now admin.')
"
```

Then go to `/admin` in the browser.

---


## 🔮 Possible Feature Additions

> These features are **not included in this demo** but can be added based on client requirements.
> Contact us at [CodeMind Solution](#) for a custom quote.

### 🛒 Shopping Experience
| Feature | Description |
|---|---|
| 📸 **Product Image Upload** | Upload product photos directly instead of URL — with cloud storage (Cloudinary / S3) |
| ❤️ **Wishlist / Save for Later** | Users can save products to a personal wishlist and buy later |
| ⭐ **Ratings & Reviews** | Customers can leave star ratings and written reviews on products |
| 🔎 **Global Search Bar** | Instant search from the navbar with live suggestions dropdown |
| 🏷️ **Discount Coupons & Promo Codes** | Admin creates coupon codes, customers apply at checkout for discounts |
| 📦 **Product Variants** | Size, color, and other variant selection per product (e.g. S/M/L, Red/Blue) |
| 🔄 **Related Products** | Show similar products on the product detail page |
| 📊 **Stock Alerts** | Notify users when an out-of-stock product becomes available |

### 💳 Payments & Orders
| Feature | Description |
|---|---|
| 💳 **Online Payment Integration** | Stripe, PayPal, or JazzCash / EasyPaisa for Pakistani market |
| 🧾 **Invoice / Receipt Generation** | Auto-generate PDF invoice after order placement |
| 🚚 **Order Tracking Page** | Visual step-by-step delivery tracking (Ordered → Packed → Shipped → Delivered) |
| 💸 **Refund & Return System** | Customers request refunds, admin approves/rejects |
| 📬 **Email Notifications** | Auto emails on registration, order confirmation, and status updates |

### 👤 User Features
| Feature | Description |
|---|---|
| 🖼️ **User Profile Page** | Edit name, avatar, phone number, and saved addresses |
| 📍 **Multiple Saved Addresses** | Save and select delivery addresses at checkout |
| 🔑 **Forgot Password / Reset** | Email-based password reset flow |
| 🔐 **Google / Social Login** | Sign in with Google or Facebook OAuth |
| 🔔 **In-App Notifications** | Real-time alerts for order updates and promotions |

### 🔧 Admin Features
| Feature | Description |
|---|---|
| 📈 **Sales Analytics Dashboard** | Charts for revenue, top products, orders per day, and customer growth |
| 📤 **Bulk Product Import** | Upload products in bulk via CSV or Excel file |
| 🖼️ **Banner / Hero Management** | Admin can update homepage banner images and promotional text |
| 👥 **Customer Management** | View all registered users, ban/unban accounts |
| 📣 **Promotional Notifications** | Send announcements or offers to all users |

### ⚙️ Technical Upgrades
| Feature | Description |
|---|---|
| 🐘 **PostgreSQL Database** | Upgrade from SQLite to PostgreSQL for production-scale data |
| 🐳 **Docker Deployment** | Full containerized deployment with Docker Compose |
| ☁️ **Cloud Hosting** | Deploy on AWS / DigitalOcean with custom domain and SSL |
| 📱 **PWA Support** | Make the web app installable on mobile as a Progressive Web App |
| 🌍 **Multi-language Support** | Urdu + English language toggle |
| 🌙 **Dark Mode** | Full dark/light theme toggle |
| 🔒 **Two-Factor Authentication** | Extra security layer for admin and user accounts |
| ⚡ **Redis Caching** | Cache frequently accessed data for faster performance |

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) (free) |
| Backend | [Render](https://render.com) (free) |
| Database | Upgrade to PostgreSQL for production |

---



## 📞 Built By

<div align="center">

**🧠 CodeMind Solution**
*Turning Ideas into Intelligent Digital Solutions*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](#)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=flat-square&logo=facebook&logoColor=white)](#)
[![Fiverr](https://img.shields.io/badge/Fiverr-1DBF73?style=flat-square&logo=fiverr&logoColor=white)](#)
[![Upwork](https://img.shields.io/badge/Upwork-6FDA44?style=flat-square&logo=upwork&logoColor=white)](#)

📍 Badin, Sindh, Pakistan · 🌐 Available Worldwide

</div>

---

<div align="center">
© 2026 CodeMind Solution · MIT License
</div>
````
