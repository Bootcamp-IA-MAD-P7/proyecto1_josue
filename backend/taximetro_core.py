import time
import config

class Taximetro:
    def __init__(self):
        self.tarifa_parado = config.TARIFA_PARADO
        self.tarifa_movimiento = config.TARIFA_MOVIMIENTO
        self.estado = "PARADO"
        self.en_trayecto = False
        
        self.tiempo_total_segundos = 0.0
        self.tiempo_parado_segundos = 0.0
        self.tiempo_movimiento_segundos = 0.0
        
        self.total_euros = 0.0
        self.costo_parado_euros = 0.0
        self.costo_movimiento_euros = 0.0
        
        self.tiempo_inicio_estado = 0

    def iniciar_trayecto(self):
        if self.en_trayecto:
            return "El trayecto ya está en curso."
        self.en_trayecto = True
        self.estado = "PARADO"
        
        self.tiempo_total_segundos = 0.0
        self.tiempo_parado_segundos = 0.0
        self.tiempo_movimiento_segundos = 0.0
        
        self.total_euros = 0.0
        self.costo_parado_euros = 0.0
        self.costo_movimiento_euros = 0.0
        
        self.tiempo_inicio_estado = time.time()
        return "Trayecto iniciado. El taxi está PARADO."

    def cambiar_estado(self, nuevo_estado):
        if not self.en_trayecto:
            return "Inicia un trayecto primero."
        if nuevo_estado not in ["PARADO", "MOVIMIENTO"] or nuevo_estado == self.estado:
            return f"El taxi ya está {self.estado}."

        self._acumular_tarifa()
        self.estado = nuevo_estado
        self.tiempo_inicio_estado = time.time()
        return f"Estado cambiado a: {self.estado}"

    def _acumular_tarifa(self):
        tiempo_transcurrido = time.time() - self.tiempo_inicio_estado
        self.tiempo_total_segundos += tiempo_transcurrido

        if self.estado == "PARADO":
            self.tiempo_parado_segundos += tiempo_transcurrido
            self.costo_parado_euros += tiempo_transcurrido * self.tarifa_parado
        elif self.estado == "MOVIMIENTO":
            self.tiempo_movimiento_segundos += tiempo_transcurrido
            self.costo_movimiento_euros += tiempo_transcurrido * self.tarifa_movimiento
            
        self.total_euros = self.costo_parado_euros + self.costo_movimiento_euros
        
        self.tiempo_inicio_estado = time.time()

    def finalizar_trayecto(self):
        if not self.en_trayecto:
            return "No hay ningún trayecto en curso."
        
        self._acumular_tarifa()
        self.en_trayecto = False
        return f"Trayecto finalizado. Total a cobrar: {round(self.total_euros, 2)} €"