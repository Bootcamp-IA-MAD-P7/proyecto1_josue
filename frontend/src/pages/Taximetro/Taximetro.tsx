import { CarFront, Info, Map } from "lucide-react";
import { useState } from "react";
import ModalInfo from "../../components/common/ModalInfo/ModalInfo";
import {
  useCambiarEstado,
  useFinalizarTrayecto,
  useIniciarTrayecto,
  useObtenerEstadoActual,
} from "../../services/Taximetro/useTaximetro";
import ControlesTaximetro from "./ControlesTaximetro/ControlesTaximetro";
import DisplayTaximetro from "./DisplayTaximetro/DisplayTaximetro";

export default function Taximetro() {
  const [enTrayecto, setEnTrayecto] = useState(false);
  const [vistaActual, setVistaActual] = useState<"manual" | "mapa">("manual");
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const { data: taximetroData } = useObtenerEstadoActual(enTrayecto);
  const { mutate: iniciarTrayecto } = useIniciarTrayecto();
  const { mutate: cambiarEstado } = useCambiarEstado();
  const { mutate: finalizarTrayecto } = useFinalizarTrayecto();

  const handleIniciar = () => {
    iniciarTrayecto(undefined, {
      onSuccess: () => setEnTrayecto(true),
    });
  };

  const handleCambiarEstado = (nuevoEstado: "PARADO" | "MOVIMIENTO") => {
    cambiarEstado({ nuevo_estado: nuevoEstado });
  };

  const handleFinalizar = () => {
    finalizarTrayecto(undefined, {
      onSuccess: () => setEnTrayecto(false),
    });
  };

  const estado = taximetroData?.estado || "PARADO";
  const total = taximetroData?.total_actual || 0;
  const mensaje = taximetroData?.mensaje || "Taxímetro listo para iniciar.";
  const tiempoSegundos = taximetroData?.tiempo_segundos || 0;
  const tiempoParado = taximetroData?.tiempo_parado || 0;
  const tiempoMovimiento = taximetroData?.tiempo_movimiento || 0;
  const costoParado = taximetroData?.costo_parado || 0;
  const costoMovimiento = taximetroData?.costo_movimiento || 0;

  return (
    <div id="taximetro-mf" className="w-full h-full">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 mt-4 md:mt-0 relative">
        {" "}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setVistaActual("manual")}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${vistaActual === "manual" ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <CarFront className="w-4 h-4" /> Manual
          </button>
          <button
            onClick={() => setVistaActual("mapa")}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${vistaActual === "mapa" ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600" : "text-slate-500 hover:bg-slate-50"}`}
          >
            <Map className="w-4 h-4" /> Estimador Google Maps
          </button>
        </div>
        {vistaActual === "manual" ? (
          <>
            <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <CarFront className="text-indigo-400 w-6 h-6" />
                </div>
                <h2 className="text-white font-bold text-lg tracking-wide">
                  Panel de Control
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMostrarInfo(true)}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Instrucciones"
                >
                  <Info className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${enTrayecto ? "bg-emerald-400" : "bg-rose-400"}`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${enTrayecto ? "bg-emerald-500" : "bg-rose-500"}`}
                    ></span>
                  </span>
                  <span className="text-xs font-bold text-slate-300 uppercase">
                    {enTrayecto ? "En Ruta" : "Libre"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <DisplayTaximetro
                estado={estado}
                total={total}
                enTrayecto={enTrayecto}
                tiempoSegundos={tiempoSegundos}
                tiempoParado={tiempoParado}
                tiempoMovimiento={tiempoMovimiento}
                costoParado={costoParado}
                costoMovimiento={costoMovimiento}
              />

              <ControlesTaximetro
                enTrayecto={enTrayecto}
                estadoActual={estado}
                onIniciar={handleIniciar}
                onCambiarEstado={handleCambiarEstado}
                onFinalizar={handleFinalizar}
              />

              <div className="flex items-center justify-center gap-2 text-sm font-mono text-cyan-400 bg-[#0B1120] p-3 rounded-lg shadow-inner border border-slate-800">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                {mensaje}
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center space-y-4 bg-slate-50">
            <Map className="w-16 h-16 text-indigo-300 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">
              Estimador de Rutas
            </h3>
            <p className="text-slate-500 text-sm">
              Próximamente conectaremos con la API de Google Maps para
              pre-calcular tarifas según el tráfico real.
            </p>
          </div>
        )}
        {mostrarInfo && <ModalInfo setMostrarInfo={setMostrarInfo} />}
      </div>
    </div>
  );
}
