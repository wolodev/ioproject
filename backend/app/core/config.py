import secrets

from typing import List
from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn


class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    ALGORITHM = "HS256"
    USER = "admin"
    HASHED_PASSWORD = "$2b$12$2jKZIT97V5wCJDDbRD4IpOatUeFYvOBQ2olGSY0TJvWZq1/AsnQnW" #adminnimda


    # BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:8080"]
    # DATABASE_URL: PostgresDsn
    
    
    
    
settings = Settings()
