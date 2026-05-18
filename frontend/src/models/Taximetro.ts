export interface TaxiEstadoResponse {
  estado: string;
  en_trayecto: boolean;
  total_actual: number;
  mensaje: string;
  tiempo_segundos: number;
  tiempo_parado: number;
  tiempo_movimiento: number;
  costo_parado: number;
  costo_movimiento: number;
}

export interface CambiarEstadoRequest {
  nuevo_estado: "PARADO" | "MOVIMIENTO";
}

export interface FinalizarTrayectoResponse {
  mensaje: string;
  total_cobrado: number;
}

export interface ViajeResponse {
  viaje_id: number;
  usuario_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  tiempo_total_segundos: number;
  tiempo_parado_segundos: number;
  tiempo_movimiento_segundos: number;
  costo_total: number;
  estado_viaje: string;
  fecha_registro: string;
}

export interface TarifaResponse {
  tarifa_id: number;
  estado_vehiculo: string;
  costo_por_segundo: number;
  fecha_actualizacion: string;
}