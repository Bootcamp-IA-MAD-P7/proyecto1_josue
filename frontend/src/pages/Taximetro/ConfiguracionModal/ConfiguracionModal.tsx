import { useObtenerTarifas } from '../../../services/Taximetro/useTaximetro';

export const ConfiguracionModal = ({ onClose }: { onClose: () => void }) => {
  const { data: tarifas, isLoading } = useObtenerTarifas();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            ⚙️ Configuración
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 font-bold text-xl">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Tarifas Vigentes</h3>
          {isLoading ? (
            <p className="text-center text-slate-500 text-sm">Cargando tarifas...</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {tarifas?.map((tarifa) => (
                <div key={tarifa.tarifa_id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">{tarifa.estado_vehiculo}</span>
                  <span className="font-mono font-bold text-indigo-600">{tarifa.costo_por_segundo} €/s</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};