from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.token import Token
from app.core.config import settings
from app.core import security



router = APIRouter()


@router.post("/login", response_model=Token)
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate_user(
        username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            data={"user": settings.USER},
            expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


def authenticate_user(username: str, password: str):
    if username == settings.USER and security.verify_password(password, settings.HASHED_PASSWORD):
        return True
    return False