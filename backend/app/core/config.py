import secrets

from pydantic import BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    ALGORITHM = "HS256"
    USER_NAME = "admin"
    HASHED_PASSWORD = "$2b$12$aeT7eHQ4DssYDyRtFiXgounhOYm9GvamKJgVOo3r8FuxXNFA17INy"  # adminnimda

    # BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:8080"]
    # DATABASE_URL: PostgresDsn


settings = Settings()
