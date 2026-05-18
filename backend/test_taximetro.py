# backend/test_taximetro.py
import time
from taximetro_core import Taximetro

def test_iniciar_trayecto():
    taxi = Taximetro()
    mensaje = taxi.iniciar_trayecto()
    
    assert taxi.en_trayecto == True
    assert taxi.estado == "PARADO"
    assert "iniciado" in mensaje.lower()

def test_calculo_tarifa_parado():
    taxi = Taximetro()
    taxi.tarifa_parado = 0.02 
    taxi.iniciar_trayecto()
    
    taxi.tiempo_inicio_estado = time.time() - 10.0 
    taxi._acumular_tarifa()
    
    assert round(taxi.tiempo_parado_segundos) == 10
    assert round(taxi.costo_parado_euros, 2) == 0.20
    assert round(taxi.total_euros, 2) == 0.20

def test_calculo_tarifa_movimiento():
    taxi = Taximetro()
    taxi.tarifa_movimiento = 0.05 
    taxi.iniciar_trayecto()
    taxi.cambiar_estado("MOVIMIENTO")
    
    taxi.tiempo_inicio_estado = time.time() - 10.0
    taxi._acumular_tarifa()
    
    assert round(taxi.tiempo_movimiento_segundos) == 10
    assert round(taxi.costo_movimiento_euros, 2) == 0.50
    assert round(taxi.total_euros, 2) == 0.50

def test_finalizar_trayecto_resetea_estado():
    taxi = Taximetro()
    taxi.iniciar_trayecto()
    taxi.finalizar_trayecto()
    
    assert taxi.en_trayecto == False