# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from taximetro_core import Taximetro
from models import TaxiEstadoResponse, CambiarEstadoRequest

app = FastAPI(title="API Taxímetro - Factoría 5")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

taxi = Taximetro()

@app.get("/")
def health_check():
    return {"status": "ok", "microservicio": "taximetro"}

@app.post("/trayecto/iniciar", response_model=TaxiEstadoResponse)
def iniciar_trayecto():
    mensaje = taxi.iniciar_trayecto()
    return TaxiEstadoResponse(
        estado=taxi.estado,
        en_trayecto=taxi.en_trayecto,
        total_actual=taxi.total_euros,
        mensaje=mensaje
    )

@app.put("/trayecto/estado", response_model=TaxiEstadoResponse)
def cambiar_estado(request: CambiarEstadoRequest):
    if request.nuevo_estado not in ["PARADO", "MOVIMIENTO"]:
        raise HTTPException(status_code=400, detail="Estado no válido")
    
    mensaje = taxi.cambiar_estado(request.nuevo_estado)
    taxi._acumular_tarifa()
    
    return TaxiEstadoResponse(
        estado=taxi.estado,
        en_trayecto=taxi.en_trayecto,
        total_actual=round(taxi.total_euros, 2),
        mensaje=mensaje
    )

@app.post("/trayecto/finalizar")
def finalizar_trayecto():
    if not taxi.en_trayecto:
        raise HTTPException(status_code=400, detail="No hay trayecto activo")
    
    mensaje = taxi.finalizar_trayecto()
    return {"mensaje": mensaje, "total_cobrado": round(taxi.total_euros, 2)}

@app.get("/trayecto/actual", response_model=TaxiEstadoResponse)
def obtener_estado_actual():
    if taxi.en_trayecto:
        taxi._acumular_tarifa()
        
    return TaxiEstadoResponse(
        estado=taxi.estado,
        en_trayecto=taxi.en_trayecto,
        total_actual=round(taxi.total_euros, 2),
        mensaje="Estado actualizado"
    )