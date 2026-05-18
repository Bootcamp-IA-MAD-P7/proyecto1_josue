// src/services/Taximetro/TaximetroRepository.ts
import type {
  CambiarEstadoRequest,
  FinalizarTrayectoResponse,
  TarifaResponse,
  TaxiEstadoResponse,
  ViajeResponse
} from "../../models/Taximetro";

export interface TaximetroRepository {
  iniciarTrayecto(): Promise<TaxiEstadoResponse>;
  cambiarEstado(data: CambiarEstadoRequest): Promise<TaxiEstadoResponse>;
  finalizarTrayecto(): Promise<FinalizarTrayectoResponse>;
  obtenerEstadoActual(): Promise<TaxiEstadoResponse>;
  obtenerHistorial(): Promise<ViajeResponse[]>;
  obtenerTarifas(): Promise<TarifaResponse[]>;
}