from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ── Auth ──────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None


# ── Category ──────────────────────────────────────
class CategoryCreate(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True


# ── Product ───────────────────────────────────────
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int
    image_url: Optional[str] = None
    category_id: Optional[int] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None
    is_active: Optional[bool] = None

class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    stock: int
    image_url: Optional[str]
    is_active: bool
    category: Optional[CategoryOut]
    created_at: datetime
    class Config:
        from_attributes = True


# ── Cart ──────────────────────────────────────────
class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemOut(BaseModel):
    id: int
    quantity: int
    product: ProductOut
    class Config:
        from_attributes = True


# ── Order ─────────────────────────────────────────
class OrderItemOut(BaseModel):
    id: int
    quantity: int
    price: float
    product: ProductOut
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    address: str

class OrderOut(BaseModel):
    id: int
    total_amount: float
    status: str
    address: Optional[str]
    created_at: datetime
    items: List[OrderItemOut]
    class Config:
        from_attributes = True