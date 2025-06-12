from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas
from .auth import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

# Create a new user in the database
async def create_user(db: AsyncSession, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)  # This should be hashed in production
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

# Get all users
async def get_users(db: AsyncSession):
    result = await db.execute(select(models.User))
    return result.scalars().all()

# Authenticate user by email & password
async def authenticate_user(db: AsyncSession, email: str, password: str):
    result = await db.execute(select(models.User).where(models.User.email == email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


async def get_user_by_email(db, email: str):
    result = await db.execute(select(models.User).where(models.User.email == email))
    return result.scalars().first()
