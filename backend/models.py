from pydantic import BaseModel

class TaxiEstadoResponse(BaseModel):
    estado: str
    en_trayecto: bool
    total_actual: float
    mensaje: str
    tiempo_segundos: float

class CambiarEstadoRequest(BaseModel):
    nuevo_estado: str