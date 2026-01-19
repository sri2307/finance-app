from pydantic_settings import BaseSettings, SettingsConfigDict
from urllib.parse import quote_plus

class Settings(BaseSettings):
    PROJECT_NAME: str = "Auth Service"
    API_V1_STR: str = "/v1"
    
    # 1. Database Credentials
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: str = "6543"
    DB_NAME: str = "postgres"
    
    # 2. Azure & Auth Config
    AZURE_CLIENT_ID: str
    AZURE_TENANT_ID: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    API_V1_STR: str = "/v1"

    # 3. Security
    SECRET_KEY: str 
    ALGORITHM: str 

    # 4. Dynamic Database URL
    @property
    def DATABASE_URL(self) -> str:
        encoded_password = quote_plus(self.DB_PASSWORD)
        return f"postgresql://{self.DB_USER}:{encoded_password}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    # ✅ THE FIX: Use ONLY model_config. (Deleted 'class Config' from here)
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()