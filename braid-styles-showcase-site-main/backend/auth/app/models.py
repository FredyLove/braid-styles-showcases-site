from sqlalchemy import Boolean, Column, Integer, String, Date, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from .database import Base

# --- User Model ---
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")

    bookings = relationship("Booking", back_populates="user")


# --- Booking Model ---
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    service_type = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(String, nullable=False)  # e.g., "2:00 PM"
    status = Column(String, default="Pending")  # e.g., Pending, Accepted, Rejected, Completed

    user = relationship("User", back_populates="bookings")


# --- Service Model ---
class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    duration = Column(String, nullable=False)
    price = Column(String, nullable=False)
    features = Column(JSON, nullable=False)  # JSON column to store a list of strings
    icon = Column(String, nullable=False)     # Name of the icon (e.g., "Shield", "Clock")


# --- Video Tutorial Model ---

class Tutorial(Base):
    __tablename__ = "tutorials"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    video_id = Column(String, nullable=False)
    duration = Column(String)
    difficulty = Column(String)
    show_on_homepage = Column(Boolean, default=False)
