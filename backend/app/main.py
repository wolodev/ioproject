from fastapi import FastAPI, Depends
from app.api.api import api_router
from app.core import security


app = FastAPI()



app.include_router(api_router)

@app.get("/")
async def read_root(token = Depends(security.validate_token)):
    return {"Hello": "World"}
