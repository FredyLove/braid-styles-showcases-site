from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import schemas, models, database
from app.dependencies import get_current_admin_user
from passlib.context import CryptContext

router = APIRouter(
    prefix="/admin/users",
    tags=["Admin User Management"]
)

get_db = database.get_db
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Get all users
@router.get("/", response_model=list[schemas.UserOut])
async def get_all_users(
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.User))
    users = result.scalars().all()
    return users

# Get a specific user
@router.get("/{user_id}", response_model=schemas.UserOut)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Delete a user
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.delete(user)
    await db.commit()
    return

# Update a user
@router.put("/{user_id}", response_model=schemas.UserOut)
async def update_user(
    user_id: int,
    updated_user: schemas.UserUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.email = updated_user.email
    user.role = updated_user.role
    await db.commit()
    await db.refresh(user)
    return user

# ✅ Add a new user (POST route)
@router.post("/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
async def create_user(
    new_user: schemas.UserCreate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user)
):
    # Check if user already exists
    result = await db.execute(select(models.User).where(models.User.email == new_user.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(new_user.password)
    user = models.User(
        username=new_user.username,
        email=new_user.email,
        hashed_password=hashed_password,
        role=new_user.role
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
