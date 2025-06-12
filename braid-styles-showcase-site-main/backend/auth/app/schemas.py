from pydantic import BaseModel, EmailStr

# For creating a user
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# For returning user data
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

# ✅ New: For login input
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ✅ New: For JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
