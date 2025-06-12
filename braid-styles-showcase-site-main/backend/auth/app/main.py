from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas, crud
from app.dependencies import get_current_user
from app import models
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from .schemas import Token
from .auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta


app = FastAPI()

# Create DB tables on app startup
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

# CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
async def get_db():
    async with SessionLocal() as session:
        yield session

# POST /users/ — create a new user
@app.post("/users/", response_model=schemas.UserOut)
async def create_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_user(db, user)

# GET /users/ — get all users
@app.get("/users/", response_model=list[schemas.UserOut])
async def get_users(db: AsyncSession = Depends(get_db)):
    return await crud.get_users(db)

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/protected")
async def read_protected_data(current_user: models.User = Depends(get_current_user)):
    return {"message": f"Hello, {current_user.username}!"}
