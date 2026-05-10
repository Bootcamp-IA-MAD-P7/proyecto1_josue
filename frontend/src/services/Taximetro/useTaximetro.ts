// src/services/Taximetro/useTaximetro.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CambiarEstadoRequest } from "../../models/Taximetro";
import { TaximetroApi } from "./TaximetroApi";

const taximetroApi = new TaximetroApi();

export const TAXIMETRO_KEYS = {
  all: ["taximetro"] as const,
  estadoActual: () => [...TAXIMETRO_KEYS.all, "estadoActual"] as const,
};

export const useObtenerEstadoActual = (enTrayecto: boolean) => {
  return useQuery({
    queryKey: TAXIMETRO_KEYS.estadoActual(),
    queryFn: () => taximetroApi.obtenerEstadoActual(),
    enabled: enTrayecto, 
    refetchInterval: enTrayecto ? 1000 : false, 
  });
};

export const useIniciarTrayecto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => taximetroApi.iniciarTrayecto(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAXIMETRO_KEYS.estadoActual() });
    },
  });
};

export const useCambiarEstado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CambiarEstadoRequest) => taximetroApi.cambiarEstado(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAXIMETRO_KEYS.estadoActual() });
    },
  });
};

export const useFinalizarTrayecto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => taximetroApi.finalizarTrayecto(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAXIMETRO_KEYS.estadoActual() });
    },
  });
};