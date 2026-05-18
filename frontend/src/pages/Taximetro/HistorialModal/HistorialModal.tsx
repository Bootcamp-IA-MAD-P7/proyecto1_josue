import { useObtenerHistorial } from '../../../services/Taximetro/useTaximetro';

export const HistorialModal = ({ onClose }: { onClose: () => void }) => {
  const { data: historial, isLoading, isError } = useObtenerHistorial();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            📋 Historial de Trayectos
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 font-bold text-xl">
            ×
          </button>
        </div>

        <div className="overflow-x-auto max-h-96">
          {isLoading ? (
            <p className="text-center text-slate-500 py-4">Cargando viajes...</p>
          ) : isError ? (
            <p className="text-center text-rose-500 py-4">Error al cargar el historial.</p>
          ) : historial && historial.length > 0 ? (
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Fecha</th>
                  <th className="px-4 py-3">T. Parado</th>
                  <th className="px-4 py-3">T. Movimiento</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Total Cobrado</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((viaje) => (
                  <tr key={viaje.viaje_id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {new Date(viaje.fecha_fin).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{viaje.tiempo_parado_segundos}s</td>
                    <td className="px-4 py-3">{viaje.tiempo_movimiento_segundos}s</td>
                    <td className="px-4 py-3 text-right font-bold text-indigo-600">
                      {viaje.costo_total} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-slate-500 py-4">No hay trayectos registrados aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};