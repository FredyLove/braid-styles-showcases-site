from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas
from app.dependencies import get_db, get_current_admin_user

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/", response_model=schemas.ServiceOut)
async def create_service(
    service: schemas.ServiceCreate,
    db: AsyncSession = Depends(get_db),
):
    db_service = models.Service(**service.dict())
    db.add(db_service)
    await db.commit()
    await db.refresh(db_service)
    return db_service


@router.get("/", response_model=list[schemas.ServiceOut])
async def get_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Service))
    services = result.scalars().all()
    return services


@router.put("/{service_id}", response_model=schemas.ServiceOut)
async def update_service(
    service_id: int,
    update: schemas.ServiceUpdate,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(models.Service).where(models.Service.id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    for field, value in update.dict(exclude_unset=True).items():
        setattr(service, field, value)

    await db.commit()
    await db.refresh(service)
    return service


@router.delete("/{service_id}")
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Service).where(models.Service.id == service_id))
    service = result.scalar_one_or_none()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    await db.delete(service)
    await db.commit()
    return {"message": "Service deleted"}
