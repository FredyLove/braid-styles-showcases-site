from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas, database
from app.dependencies import get_db, get_current_user, get_current_admin_user
from app.mail_config import send_status_email



router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

@router.post("/", response_model=schemas.BookingOut)
async def create_booking(
    booking: schemas.BookingCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_booking = models.Booking(
        user_id=current_user.id,
        service_type=booking.service_type,
        date=booking.date,
        time=booking.time,
        status="Pending"
    )
    db.add(new_booking)
    await db.commit()
    await db.refresh(new_booking)
    return new_booking


@router.get("/", response_model=list[schemas.BookingOut])
async def get_all_bookings(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.Booking))
    return result.scalars().all()


@router.put("/{booking_id}/status", response_model=schemas.BookingOut)
async def update_booking_status(
    booking_id: int,
    status_update: schemas.BookingUpdateStatus,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.Booking).where(models.Booking.id == booking_id))
    booking = result.scalars().first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = status_update.status
    await db.commit()
    await db.refresh(booking)
    
      # fetch user email
    user_result = await db.execute(select(models.User).where(models.User.id == booking.user_id))
    user = user_result.scalars().first()
    if user and user.email:
        await send_status_email(user.email, booking.status)

    return booking

@router.get("/my", response_model=list[schemas.BookingOut])
async def get_my_bookings(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    result = await db.execute(
        select(models.Booking).where(models.Booking.user_id == current_user.id)
    )
    return result.scalars().all()


# Update booking (reschedule)
@router.put("/reschedule/{booking_id}", response_model=schemas.BookingOut)
async def reschedule_booking(
    booking_id: int,
    update_data: schemas.BookingUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    result = await db.execute(select(models.Booking).where(models.Booking.id == booking_id))
    booking = result.scalar_one_or_none()

    if not booking or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.date = update_data.date
    booking.time = update_data.time
    booking.status = "Pending"  # Reset status after reschedule
    await db.commit()
    await db.refresh(booking)
    return booking

# Cancel booking
@router.put("/cancel/{booking_id}", response_model=schemas.BookingOut)
async def cancel_booking(
    booking_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    result = await db.execute(select(models.Booking).where(models.Booking.id == booking_id))
    booking = result.scalar_one_or_none()

    if not booking or booking.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "Cancelled"
    await db.commit()
    await db.refresh(booking)
    return booking


