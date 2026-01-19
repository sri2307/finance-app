from fastapi import Request, HTTPException, status
from jose import jwt, JWTError
from app.core.config import settings

async def get_current_user(request: Request):
    """
    Dependency for protected routes.
    1. Reads 'access_token' from HttpOnly Cookie.
    2. Validates signature and expiration.
    3. Ensures it is actually an 'access' token (not a refresh token).
    """
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Not authenticated"
        )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id is None:
             raise HTTPException(status_code=401, detail="Invalid token: No user ID")
             
        if token_type != "access":
             raise HTTPException(status_code=401, detail="Invalid token type: Expected access token")
             
        return user_id
        
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired or invalid")