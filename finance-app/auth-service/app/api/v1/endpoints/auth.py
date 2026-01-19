from fastapi import APIRouter, Depends, Response, Request, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

from app.db.session import SessionLocal
from app.services.auth_service import auth_service
from app.schemas.token import AuthRequest
from app.schemas.user import UserResponse
from app.core.config import settings
from app.core.security import validate_entra_token
from app.core.jwt import create_access_token, create_refresh_token
from app.core.utils import set_auth_cookies
from app.api.dependencies import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 1. LOGIN ---
@router.post("/exchange", response_model=UserResponse)
async def exchange_token(
    request: AuthRequest, 
    response: Response,
    request_obj: Request, 
    db: Session = Depends(get_db)
):
    # A. Validate Microsoft Token
    entra_data = await validate_entra_token(
        token=request.access_token,
        tenant_id=settings.AZURE_TENANT_ID,
        client_id=settings.AZURE_CLIENT_ID
    )
    
    # B. Login/Register User
    normalized_data = {
        "oid": entra_data.get("oid"),
        "email": entra_data.get("email") or entra_data.get("preferred_username"),
        "name": entra_data.get("name")
    }
    user = auth_service.login_with_entra(db, normalized_data)

    # C. Create Tokens
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    # D. Create Session in DB
    user_agent = request_obj.headers.get("user-agent")
    auth_service.create_session(db, user.id, refresh_token, user_agent)

    # E. Set Cookies
    set_auth_cookies(response, access_token, refresh_token)
    
    return user

# --- 2. VALIDATE (Check if logged in) ---
@router.get("/validate", response_model=UserResponse)
async def validate_session(
    user_id: str = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    from app.models.user import User
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# --- 3. REFRESH (Rotate Token) ---
@router.post("/refresh")
async def refresh_access_token(
    request: Request, 
    response: Response, 
    db: Session = Depends(get_db)
):
    # A. Get Refresh Token from Cookie
    old_refresh_token = request.cookies.get("refresh_token")
    if not old_refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token")

    # B. Validate Session in DB
    session = auth_service.get_session_by_token(db, old_refresh_token)
    if not session:
        # Security: Token valid locally but not in DB -> Stolen?
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        raise HTTPException(status_code=401, detail="Invalid session")

    # C. Check Expiry & Idle
    now = datetime.now(timezone.utc)
    
    if session.expires_at < now:
        auth_service.revoke_session(db, session)
        raise HTTPException(status_code=401, detail="Session expired")

    # Ensure last_activity is timezone-aware before subtraction
    last_active = session.last_activity
    if last_active.tzinfo is None:
        last_active = last_active.replace(tzinfo=timezone.utc)

    if (now - last_active) > timedelta(minutes=settings.IDLE_TIMEOUT_MINUTES):
        auth_service.revoke_session(db, session)
        raise HTTPException(status_code=401, detail="Logged out due to inactivity")

    # D. Rotate Tokens
    new_access_token = create_access_token(session.user_id)
    new_refresh_token = create_refresh_token(session.user_id)
    
    # Update DB Session
    session.refresh_token = new_refresh_token
    session.last_activity = now 
    session.expires_at = now + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db.commit()

    # E. Send New Cookies
    set_auth_cookies(response, new_access_token, new_refresh_token)
    
    return {"message": "Session refreshed"}

# --- 4. LOGOUT ---
@router.post("/logout")
async def logout(
    request: Request, 
    response: Response, 
    db: Session = Depends(get_db)
):
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token:
        session = auth_service.get_session_by_token(db, refresh_token)
        if session:
            auth_service.revoke_session(db, session)

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out"}