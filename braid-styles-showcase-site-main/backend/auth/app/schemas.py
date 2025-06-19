from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import date
from typing import List, Optional

# --- User-related Schemas ---

class Role(str, Enum):
    user = "user"
    admin = "admin"

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Role

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str

class UserUpdate(BaseModel):
    email: EmailStr
    role: str


# --- Booking-related Schemas ---

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

    class Config:
        orm_mode = True

class BookingUpdateStatus(BaseModel):
    status: str

class BookingUpdate(BaseModel):
    date: date
    time: str

class BookingCancel(BaseModel):
    status: str = "Cancelled"


# --- Services-related Schemas ---

class ServiceBase(BaseModel):
    title: str
    description: str
    duration: str
    price: str
    features: List[str]
    icon: str  # A string used to identify icon on frontend (e.g., "Shield", "Clock")

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    price: Optional[str] = None
    features: Optional[List[str]] = None
    icon: Optional[str] = None

class ServiceOut(ServiceBase):
    id: int

class TutorialBase(BaseModel):
    title: str
    description: str
    video_id: str
    duration: str
    difficulty: str
    show_on_homepage: bool = False

class TutorialCreate(TutorialBase):
    pass

class TutorialUpdate(BaseModel):
    title: Optional[str]
    video_id: Optional[str]
    description: Optional[str]
    duration: Optional[str]
    difficulty: Optional[str]
    show_on_homepage: Optional[bool]

class TutorialOut(TutorialBase):
    id: int

    class Config:
        from_attributes = True
