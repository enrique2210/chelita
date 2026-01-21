from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create engine with appropriate settings
connect_args = {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,  # Verify connections before using them
    pool_size=10,  # Connection pool size
    max_overflow=20  # Max overflow connections
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
