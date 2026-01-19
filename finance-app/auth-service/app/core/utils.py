from fastapi import Response
from app.core.config import settings

def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    """
    Sets the Access and Refresh tokens as secure HttpOnly cookies.
    """
    # 1. Set Access Token (Short Lived)
    response.set_cookie(
        key="access_token", 
        value=access_token, 
        httponly=True, 
        samesite="lax", 
        secure=False, # Set to True in Production (requires HTTPS)
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
    
    # 2. Set Refresh Token (Long Lived)
    response.set_cookie(
        key="refresh_token", 
        value=refresh_token, 
        httponly=True, 
        samesite="lax", 
        secure=False, # Set to True in Production
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )