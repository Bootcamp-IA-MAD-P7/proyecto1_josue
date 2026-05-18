# backend/models_db.py
from sqlalchemy import Column, Integer, String, Numeric, DateTime
from datetime import datetime
from database import Base

class Tarifa(Base):
    __tablename__ = "tarifas"
    __table_args__ = {'schema': 'taximetro'}

    tarifa_id = Column(Integer, primary_key=True, index=True)
    estado_vehiculo = Column(String(50), nullable=False)
    costo_por_segundo = Column(Numeric(10, 2), nullable=False)
    fecha_actualizacion = Column(DateTime, default=datetime.utcnow)

class Viaje(Base):
    __tablename__ = "viajes"
    __table_args__ = {'schema': 'taximetro'}

    viaje_id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, nullable=True) 
    fecha_inicio = Column(DateTime, default=datetime.utcnow)
    fecha_fin = Column(DateTime, nullable=True)
    tiempo_total_segundos = Column(Numeric(10, 2), default=0)
    tiempo_parado_segundos = Column(Numeric(10, 2), default=0)
    tiempo_movimiento_segundos = Column(Numeric(10, 2), default=0)
    costo_total = Column(Numeric(10, 2), default=0)
    estado_viaje = Column(String(20), default="FINALIZADO")
    fecha_registro = Column(DateTime, default=datetime.utcnow)