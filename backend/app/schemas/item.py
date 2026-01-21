from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class ItemBase(BaseModel):
    """Base schema for Item."""
    name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    age: int = Field(..., ge=1, le=150)
    email: EmailStr
    phone: str = Field(..., min_length=1, max_length=20)


class ItemCreate(BaseModel):
    document_code: str = Field(..., min_length=10, max_length=10)


class ItemInDB(ItemBase):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class Item(ItemInDB):
    pass
