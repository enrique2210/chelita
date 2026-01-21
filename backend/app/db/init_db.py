from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine
from app.models.item import Item


def init_db() -> None:
    """Initialize database tables."""
    Base.metadata.create_all(bind=engine)
