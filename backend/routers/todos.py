from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.todo import Todo
from schemas.todo import TodoCreate, TodoUpdate, TodoResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[TodoResponse])
async def get_todos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Todo).order_by(Todo.created_at.desc()))
    return result.scalars().all()

@router.post("/", response_model=TodoResponse)
async def create_todo(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    db_todo = Todo(title=todo.title)
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

@router.patch("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: int, todo: TodoUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    db_todo = result.scalar_one_or_none()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if todo.title is not None:
        db_todo.title = todo.title
    if todo.done is not None:
        db_todo.done = todo.done
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

@router.delete("/{todo_id}")
async def delete_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    db_todo = result.scalar_one_or_none()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    await db.delete(db_todo)
    await db.commit()
    return {"ok": True}