from pydantic import BaseModel

class AuthRequest(BaseModel):
    access_token: str