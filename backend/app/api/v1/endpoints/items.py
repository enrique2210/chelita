from typing import List, Dict
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.api import deps
from app.crud.item import item as crud_item
from app.schemas.item import Item, ItemCreate, ItemBase
from app.services.item_pdf import generate_pdf

router = APIRouter()


@router.get("/", response_model=List[Item])
def read_items(
    db: Session = Depends(deps.get_db)
):
    """
    Retrieve all items.
    """
    items = crud_item.get_multi(db)
    return items


@router.get("/{document_code}", response_model=Dict[str, str])
def read_item(
    document_code: str,
    db: Session = Depends(deps.get_db)
):
    """
    Get item by document code.
    """
    item = crud_item.get_by_document_code(db, document_code=document_code)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found"
        )

    pdf_buffer = generate_pdf(item)
    return {"document_b64": pdf_buffer}


@router.post("/", response_model=ItemCreate, status_code=status.HTTP_201_CREATED)
def create_item(
    item_in: ItemBase,
    db: Session = Depends(deps.get_db)
):
    """
    Create new item.
    """
    item = crud_item.create(db, obj_in=item_in)
    return item
