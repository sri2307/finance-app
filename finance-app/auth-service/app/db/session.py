from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 1. Create the Database Engine
# connect_args={"check_same_thread": False} is ONLY for SQLite. We remove it for Postgres.
engine = create_engine(settings.DATABASE_URL)

# 2. Create a Session Factory
# This is what we will use to create a new database session for each request.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)