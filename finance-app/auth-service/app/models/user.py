from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    entra_oid = Column(String, unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationship to Sessions
    sessions = relationship("UserSession", back_populates="user")

class UserSession(Base):
    __tablename__ = "user_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # The Refresh Token (We store this to verify it, or a hash of it)
    refresh_token = Column(String, unique=True, index=True)
    
    # Security tracking
    user_agent = Column(String, nullable=True)  # e.g., "Chrome on Windows"
    ip_address = Column(String, nullable=True)
    
    # Time tracking
    expires_at = Column(DateTime(timezone=True))  # Absolute max life (e.g. 7 days)
    last_activity = Column(DateTime(timezone=True), server_default=func.now()) # For Idle Timeout
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="sessions")