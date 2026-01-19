from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

class UserRepository:
    def get_by_email(self, db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    def get_by_entra_oid(self, db: Session, oid: str):
        return db.query(User).filter(User.entra_oid == oid).first()

    def create(self, db: Session, user_in: UserCreate):
        # Create a new User object from the Pydantic schema
        db_user = User(
            email=user_in.email,
            full_name=user_in.full_name,
            entra_oid=user_in.entra_oid,
            is_active=user_in.is_active
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

# Create a singleton instance to use elsewhere
user_repo = UserRepository()