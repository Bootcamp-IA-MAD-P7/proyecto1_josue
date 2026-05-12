import { Info } from "lucide-react";

interface ModalInfoProps {
  setMostrarInfo: (mostrarInfo: boolean) => void;
}

export default function ModalInfo({ setMostrarInfo }: ModalInfoProps) {
  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 rounded-3xl">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-4 border-b pb-3 border-slate-100">
          <Info className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-bold text-slate-800">
            Instrucciones de Uso
          </h3>
        </div>
        <ul className="space-y-4 text-sm text-slate-600 mb-6">
          <li className="flex gap-2">
            <span className="text-lg">▶️</span>{" "}
            <span>
              <strong>Iniciar Trayecto:</strong> Arranca el taxímetro. Inicia
              por defecto en estado "PARADO".
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-lg">🛑</span>{" "}
            <span>
              <strong>Parado:</strong> Cobra la tarifa de espera (0.02€/seg).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-lg">🚗</span>{" "}
            <span>
              <strong>Movimiento:</strong> Cobra tarifa de desplazamiento
              (0.05€/seg).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-lg">🏁</span>{" "}
            <span>
              <strong>Finalizar Viaje:</strong> Detiene el cobro y muestra el
              total.
            </span>
          </li>
        </ul>
        <button
          onClick={() => setMostrarInfo(false)}
          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
