from fastapi import APIRouter, Depends
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app import models

router = APIRouter()

@router.delete("/bookings/cleanup")
async def remove_invalid_bookings(db: AsyncSession = Depends(get_db)):
    await db.execute(delete(models.Booking).where(models.Booking.user_id == None))
    await db.commit()
    return {"message": "✅ Invalid bookings removed"}
