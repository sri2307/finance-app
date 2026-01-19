from pydantic import BaseModel, EmailStr
from typing import Optional, List

# 1. Base Schema (Shared properties)
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True

# 2. Schema for Creating a User (What we send to the API)
class UserCreate(UserBase):
    entra_oid: str  # We MUST have this from Microsoft

# 3. Schema for Reading a User (What the API returns to us)
class UserResponse(UserBase):
    id: int
    roles: List[str] = []

    class Config:
        from_attributes = True 
        # ^ This tells Pydantic to read data even if it's an SQLAlchemy object