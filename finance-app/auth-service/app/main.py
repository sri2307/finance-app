# from fastapi import FastAPI
# from app.api.v1.endpoints import auth # Import the new module

# app = FastAPI(title="Auth Service")

# # 1. Include the router
# # prefix="/auth": This means all routes in auth.py will start with /auth
# # tags=["auth"]: This groups them nicely in the Swagger UI
# app.include_router(auth.router, prefix="/auth", tags=["auth"])

# @app.get("/")
# def health_check():
#     return {"status": "Auth Service is running"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth # Import your auth router
from mangum import Mangum
from app.core.config import settings

# app = FastAPI(title="Finance App API")

# app/main.py

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    root_path="/api"  
)

# 1. Configure CORS (Critical for CloudFront later, good for Dev now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"], # Allow both apps
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Include the Router with the correct prefixes
# This combines to make: /api/v1/auth/exchange
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])

@app.get("/")
def read_root():
    return {"message": "Finance App API is running"}

handler = Mangum(app)