from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import date

# For creating a user

class Role(str, Enum):
    user = "user"
    admin = "admin"
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Role

# For returning user data
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

    class Config:
        model_config = {
            "from_attributes": True
        }

# ✅ New: For login input
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ✅ New: For JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    
class UserUpdate(BaseModel):
    email: EmailStr
    role: str

class BookingCreate(BaseModel):
    service_type: str
    date: date
    time: str
    
class BookingOut(BaseModel):
    id: int
    service_type: str
    date: date
    time: str
    status: str
    user_id: int

class BookingUpdateStatus(BaseModel):
    status: str