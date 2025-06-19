from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas
from app.dependencies import get_db, get_current_admin_user

router = APIRouter(prefix="/tutorials", tags=["Tutorials"])

@router.post("/", response_model=schemas.TutorialOut)
async def add_tutorial(
    tutorial: schemas.TutorialCreate,
    db: AsyncSession = Depends(get_db),
    _=Depends(get_current_admin_user),
):
    db_tutorial = models.Tutorial(**tutorial.dict())
    db.add(db_tutorial)
    await db.commit()
    await db.refresh(db_tutorial)
    return db_tutorial

@router.get("/", response_model=list[schemas.TutorialOut])
async def get_all_tutorials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Tutorial))
    return result.scalars().all()

@router.get("/homepage", response_model=list[schemas.TutorialOut])
async def get_homepage_tutorials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Tutorial).where(models.Tutorial.show_on_homepage == True))
    return result.scalars().all()


@router.put("/{tutorial_id}", response_model=schemas.TutorialOut)
async def update_tutorial(
    tutorial_id: int,
    update_data: schemas.TutorialUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.Tutorial).where(models.Tutorial.id == tutorial_id))
    tutorial = result.scalar_one_or_none()

    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")

    for field, value in update_data.dict(exclude_unset=True).items():
        setattr(tutorial, field, value)

    await db.commit()
    await db.refresh(tutorial)
    return tutorial
