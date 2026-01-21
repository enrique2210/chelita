import secrets
import string

from typing import List, Optional
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from app.models.item import Item
from app.schemas.item import ItemCreate


GENERATION_RETRIES = 50


class CRUDItem:
    def create(self, db: Session, *, obj_in: ItemCreate) -> ItemCreate:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Item(**obj_in_data)

        # Generate random 10 character code with limit of GENERATION_RETRIES for uniqueness
        for _ in range(GENERATION_RETRIES):
            try:
                db_obj.document_code = self.generate_code()
                db.add(db_obj)
                db.commit()
                db.refresh(db_obj)
                return ItemCreate(success=True, document_code=db_obj.document_code)
            except IntegrityError:
                db.rollback()
        raise RuntimeError("Could not generate unique code")

    def get_multi(self, db: Session) -> List[Item]:
        return db.query(Item).all()

    def get_by_document_code(self, db: Session, *, document_code: str) -> Optional[Item]:
        return db.query(Item).filter(Item.document_code == document_code).first()

    def generate_code(self, length=10):
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(length))


item = CRUDItem()
