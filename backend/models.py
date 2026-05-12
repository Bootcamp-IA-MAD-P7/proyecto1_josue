# backend/models.py
from pydantic import BaseModel

class TaxiEstadoResponse(BaseModel):
    estado: str
    en_trayecto: bool
    total_actual: float
    mensaje: str
    tiempo_segundos: float
    tiempo_parado: float
    tiempo_movimiento: float
    costo_parado: float          
    costo_movimiento: float      

class CambiarEstadoRequest(BaseModel):
    nuevo_estado: str