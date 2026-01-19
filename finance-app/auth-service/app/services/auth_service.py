from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from app.repositories.user_repo import user_repo
from app.models.user import UserSession
from app.schemas.user import UserCreate
from app.core.config import settings

class AuthService:
    def login_with_entra(self, db: Session, entra_data: dict):
        oid = entra_data.get("oid")
        email = entra_data.get("email")
        name = entra_data.get("name")

        user = user_repo.get_by_entra_oid(db, oid)
        if not user:
            user_in = UserCreate(email=email, full_name=name, entra_oid=oid)
            user = user_repo.create(db, user_in)
        return user

    # --- SESSION MANAGEMENT ---
    def create_session(self, db: Session, user_id: int, refresh_token: str, user_agent: str = None):
        expires = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        session = UserSession(
            user_id=user_id,
            refresh_token=refresh_token,
            user_agent=user_agent,
            expires_at=expires,
            last_activity=datetime.now(timezone.utc)
        )
        db.add(session)
        db.commit()
        return session

    def get_session_by_token(self, db: Session, refresh_token: str):
        return db.query(UserSession).filter(UserSession.refresh_token == refresh_token).first()

    def revoke_session(self, db: Session, session: UserSession):
        db.delete(session)
        db.commit()

auth_service = AuthService()