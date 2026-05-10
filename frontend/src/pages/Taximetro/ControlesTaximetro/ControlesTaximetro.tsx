import { CheckCircle, Pause, Play } from "lucide-react";

interface ControlesProps {
  enTrayecto: boolean;
  estadoActual: string;
  onIniciar: () => void;
  onCambiarEstado: (estado: "PARADO" | "MOVIMIENTO") => void;
  onFinalizar: () => void;
}

export default function ControlesTaximetro({
  enTrayecto,
  estadoActual,
  onIniciar,
  onCambiarEstado,
  onFinalizar,
}: ControlesProps) {
  if (!enTrayecto) {
    return (
      <button
        onClick={onIniciar}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex justify-center items-center gap-3"
      >
        <Play size={24} fill="currentColor" /> INICIAR TRAYECTO
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onCambiarEstado("MOVIMIENTO")}
          disabled={estadoActual === "MOVIMIENTO"}
          className={`py-4 font-black rounded-xl flex justify-center items-center gap-2 transition-all border-2
            ${
              estadoActual === "MOVIMIENTO"
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/30 hover:-translate-y-1"
            }`}
        >
          <Play
            size={20}
            fill={estadoActual !== "MOVIMIENTO" ? "currentColor" : "none"}
          />{" "}
          ARRANCAR
        </button>

        <button
          onClick={() => onCambiarEstado("PARADO")}
          disabled={estadoActual === "PARADO"}
          className={`py-4 font-black rounded-xl flex justify-center items-center gap-2 transition-all border-2
            ${
              estadoActual === "PARADO"
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-500/30 hover:-translate-y-1"
            }`}
        >
          <Pause
            size={20}
            fill={estadoActual !== "PARADO" ? "currentColor" : "none"}
          />{" "}
          DETENER
        </button>
      </div>

      <button
        onClick={onFinalizar}
        className="w-full py-4 bg-slate-900 hover:bg-black text-white font-black rounded-xl transition-all shadow-lg shadow-slate-900/30 hover:-translate-y-1 flex justify-center items-center gap-2"
      >
        <CheckCircle size={22} /> FINALIZAR VIAJE
      </button>
    </div>
  );
}
