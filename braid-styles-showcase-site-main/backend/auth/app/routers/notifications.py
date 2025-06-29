from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from .. import schemas, models
from ..database import get_db
from ..dependencies import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("", response_model=List[schemas.Notification])
async def get_user_notifications(
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    unread_only: bool = False,
    limit: int = 20,
    skip: int = 0
):
    """Get all notifications for current user"""
    stmt = select(models.Notification).where(
        models.Notification.user_id == current_user.id
    )
    
    if unread_only:
        stmt = stmt.where(models.Notification.is_read == False)
        
    stmt = stmt.order_by(models.Notification.timestamp.desc()).offset(skip).limit(limit)
    
    result = await db.execute(stmt)
    return result.scalars().all()

@router.get("/unread-count", response_model=int)
async def get_unread_count(
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get count of unread notifications"""
    stmt = select(models.Notification).where(
        models.Notification.user_id == current_user.id,
        models.Notification.is_read == False
    )
    result = await db.execute(stmt)
    return len(result.scalars().all())

@router.put("/read/{id}", response_model=schemas.Notification)
async def mark_as_read(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Mark single notification as read"""
    stmt = select(models.Notification).where(
        models.Notification.id == id,
        models.Notification.user_id == current_user.id
    )
    result = await db.execute(stmt)
    notif = result.scalar_one_or_none()
    
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    notif.is_read = True
    notif.read_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(notif)
    return notif

@router.put("/read-all", response_model=dict)
async def mark_all_as_read(
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark all notifications as read"""
    stmt = select(models.Notification).where(
        models.Notification.user_id == current_user.id,
        models.Notification.is_read == False
    )
    result = await db.execute(stmt)
    notifications = result.scalars().all()
    
    for notif in notifications:
        notif.is_read = True
        notif.read_at = datetime.now(timezone.utc)
    
    await db.commit()
    return {"message": "All notifications marked as read"}

@router.delete("/{id}", status_code=204)
async def delete_notification(
    id: int,
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a notification"""
    stmt = select(models.Notification).where(
        models.Notification.id == id,
        models.Notification.user_id == current_user.id
    )
    result = await db.execute(stmt)
    notif = result.scalar_one_or_none()
    
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")
        
    await db.delete(notif)
    await db.commit()
    return None

@router.post("", response_model=schemas.Notification)
async def create_notification(
    notification: schemas.NotificationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Create a new notification"""
    db_notification = models.Notification(
        user_id=current_user.id,
        message=notification.message,
        type=notification.type,
        related_id=notification.related_id
    )
    
    db.add(db_notification)
    await db.commit()
    await db.refresh(db_notification)
    return db_notification