// src/services/Taximetro/TaximetroRepository.ts
import type {
  CambiarEstadoRequest,
  FinalizarTrayectoResponse,
  TaxiEstadoResponse
} from "../../models/Taximetro";

export interface TaximetroRepository {
  iniciarTrayecto(): Promise<TaxiEstadoResponse>;
  cambiarEstado(data: CambiarEstadoRequest): Promise<TaxiEstadoResponse>;
  finalizarTrayecto(): Promise<FinalizarTrayectoResponse>;
  obtenerEstadoActual(): Promise<TaxiEstadoResponse>;
}