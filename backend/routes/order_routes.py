from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas
from auth import get_current_user, get_admin_user

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=schemas.OrderOut)
def place_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    cart_items = db.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = sum(item.product.price * item.quantity for item in cart_items)

    order = models.Order(user_id=current_user.id, total_amount=total, address=order_data.address)
    db.add(order)
    db.commit()
    db.refresh(order)

    for item in cart_items:
        order_item = models.OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price
        )
        db.add(order_item)
        # Reduce stock
        item.product.stock -= item.quantity
        db.delete(item)

    db.commit()
    db.refresh(order)
    return order

@router.get("/", response_model=List[schemas.OrderOut])
def get_my_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return db.query(models.Order).filter(models.Order.user_id == current_user.id).all()

@router.get("/all", response_model=List[schemas.OrderOut])
def get_all_orders(db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    return db.query(models.Order).all()

@router.put("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db), admin=Depends(get_admin_user)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    return {"message": f"Order status updated to {status}"}