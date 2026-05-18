# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime

from database import engine, get_db, Base
from models_db import Viaje, Tarifa
from taximetro_core import Taximetro
from models import TaxiEstadoResponse, CambiarEstadoRequest

from pydantic import BaseModel
from typing import List

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Taxímetro - Factoría 5")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

taxi = Taximetro()

class TarifaUpdate(BaseModel):
    tarifa_id: int
    costo_por_segundo: float

@app.get("/")
def health_check():
    return {"status": "ok", "microservicio": "taximetro"}

@app.post("/trayecto/iniciar", response_model=TaxiEstadoResponse)
def iniciar_trayecto():
    mensaje = taxi.iniciar_trayecto()
    return obtener_estado_actual(mensaje_override=mensaje)

@app.put("/trayecto/estado", response_model=TaxiEstadoResponse)
def cambiar_estado(request: CambiarEstadoRequest):
    if request.nuevo_estado not in ["PARADO", "MOVIMIENTO"]:
        raise HTTPException(status_code=400, detail="Estado no válido")
    
    mensaje = taxi.cambiar_estado(request.nuevo_estado)
    return obtener_estado_actual(mensaje_override=mensaje)

@app.post("/trayecto/finalizar")
def finalizar_trayecto(db: Session = Depends(get_db)):
    if not taxi.en_trayecto:
        raise HTTPException(status_code=400, detail="No hay trayecto activo")
    
    taxi._acumular_tarifa()
    tiempo_final = taxi.tiempo_total_segundos
    total_cobrado = taxi.total_euros
    
    nuevo_viaje = Viaje(
        usuario_id=1, 
        fecha_fin=datetime.utcnow(),
        tiempo_total_segundos=tiempo_final,
        tiempo_parado_segundos=taxi.tiempo_parado_segundos,
        tiempo_movimiento_segundos=taxi.tiempo_movimiento_segundos,
        costo_total=total_cobrado,
        estado_viaje="FINALIZADO"
    )
    db.add(nuevo_viaje)
    db.commit()
    db.refresh(nuevo_viaje)

    mensaje = taxi.finalizar_trayecto()
    
    return {
        "mensaje": mensaje, 
        "total_cobrado": round(total_cobrado, 2),
        "tiempo_total_segundos": round(tiempo_final, 2),
        "viaje_id": nuevo_viaje.viaje_id 
    }

@app.get("/trayecto/actual", response_model=TaxiEstadoResponse)
def obtener_estado_actual(mensaje_override=None):
    if taxi.en_trayecto:
        taxi._acumular_tarifa()
        
    return TaxiEstadoResponse(
        estado=taxi.estado,
        en_trayecto=taxi.en_trayecto,
        total_actual=round(taxi.total_euros, 2),
        mensaje=mensaje_override if mensaje_override else f"Estado: {taxi.estado}",
        tiempo_segundos=taxi.tiempo_total_segundos,
        tiempo_parado=taxi.tiempo_parado_segundos,
        tiempo_movimiento=taxi.tiempo_movimiento_segundos,
        costo_parado=round(taxi.costo_parado_euros, 2),
        costo_movimiento=round(taxi.costo_movimiento_euros, 2)
    )


@app.get("/historial")
def obtener_historial(db: Session = Depends(get_db)):
    viajes = db.query(Viaje).order_by(Viaje.fecha_registro.desc()).limit(10).all()
    return viajes

@app.get("/tarifas")
def obtener_tarifas(db: Session = Depends(get_db)):
    tarifas = db.query(Tarifa).all()
    return tarifas

@app.put("/tarifas")
def actualizar_tarifas(tarifas: List[TarifaUpdate], db: Session = Depends(get_db)):
    for t in tarifas:
        tarifa_db = db.query(Tarifa).filter(Tarifa.tarifa_id == t.tarifa_id).first()
        if tarifa_db:
            tarifa_db.costo_por_segundo = t.costo_por_segundo
            
            if tarifa_db.estado_vehiculo == "PARADO":
                taxi.tarifa_parado = float(t.costo_por_segundo)
            elif tarifa_db.estado_vehiculo == "MOVIMIENTO":
                taxi.tarifa_movimiento = float(t.costo_por_segundo)
    
    db.commit()
    return {"mensaje": "Tarifas actualizadas correctamente"}