// src/services/Taximetro/TaximetroApi.ts
import { api } from "../../api/axiosClient";
import type {
  ActualizarTarifasRequest,
  CambiarEstadoRequest,
  FinalizarTrayectoResponse,
  TarifaResponse,
  TaxiEstadoResponse,
  ViajeResponse
} from "../../models/Taximetro";
import type { TaximetroRepository } from "./TaximetroRepository";

export class TaximetroApi implements TaximetroRepository {
  async iniciarTrayecto(): Promise<TaxiEstadoResponse> {
    const response = await api.post<TaxiEstadoResponse>("/trayecto/iniciar");
    return response.data;
  }

  async cambiarEstado(data: CambiarEstadoRequest): Promise<TaxiEstadoResponse> {
    const response = await api.put<TaxiEstadoResponse>("/trayecto/estado", data);
    return response.data;
  }

  async finalizarTrayecto(): Promise<FinalizarTrayectoResponse> {
    const response = await api.post<FinalizarTrayectoResponse>("/trayecto/finalizar");
    return response.data;
  }

  async obtenerEstadoActual(): Promise<TaxiEstadoResponse> {
    const response = await api.get<TaxiEstadoResponse>("/trayecto/actual");
    return response.data;
  }

  async obtenerHistorial(): Promise<ViajeResponse[]> {
    const response = await api.get<ViajeResponse[]>("/historial");
    return response.data;
  }

  async obtenerTarifas(): Promise<TarifaResponse[]> {
    const response = await api.get<TarifaResponse[]>("/tarifas");
    return response.data;
  }

  async actualizarTarifas(data: ActualizarTarifasRequest[]): Promise<{mensaje: string}> {
    const response = await api.put<{mensaje: string}>("/tarifas", data);
    return response.data;
  }
}