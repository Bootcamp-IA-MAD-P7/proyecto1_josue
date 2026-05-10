import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import config

security = HTTPBearer()

def verificar_token_padre(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials
    
    if not token:
         raise HTTPException(
             status_code=status.HTTP_401_UNAUTHORIZED,
             detail="Token no proporcionado"
         )
    
    return {"status": "validado", "token": token}