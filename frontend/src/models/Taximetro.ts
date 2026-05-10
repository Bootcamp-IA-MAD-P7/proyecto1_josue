export interface TaxiEstadoResponse {
  estado: string;
  en_trayecto: boolean;
  total_actual: number;
  mensaje: string;
}

export interface CambiarEstadoRequest {
  nuevo_estado: "PARADO" | "MOVIMIENTO";
}

export interface FinalizarTrayectoResponse {
  mensaje: string;
  total_cobrado: number;
}