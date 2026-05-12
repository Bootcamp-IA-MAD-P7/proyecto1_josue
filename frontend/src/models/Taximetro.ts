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