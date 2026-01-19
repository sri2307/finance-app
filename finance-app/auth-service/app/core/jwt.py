from datetime import datetime, timedelta, timezone
from jose import jwt
from app.core.config import settings

def create_token(data: dict, expires_delta: timedelta, token_type: str):
    """
    Generic helper to create a signed JWT.
    """
    to_encode = data.copy()
    
    # Add the "type" claim (access vs refresh)
    # This prevents using an access token to refresh the session
    to_encode.update({"type": token_type}) 
    
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_access_token(user_id: int):
    """
    Creates a short-lived access token (e.g., 15 mins).
    """
    return create_token(
        data={"sub": str(user_id)}, 
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        token_type="access"
    )

def create_refresh_token(user_id: int):
    """
    Creates a long-lived refresh token (e.g., 7 days).
    """
    return create_token(
        data={"sub": str(user_id)}, 
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        token_type="refresh"
    )