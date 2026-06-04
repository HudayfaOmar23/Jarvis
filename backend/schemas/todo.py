from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoCreate(BaseModel):
    title: str

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    done: Optional[bool] = None

class TodoResponse(BaseModel):
    id: int
    title: str
    done: bool
    created_at: datetime

    class Config:
        from_attributes = True