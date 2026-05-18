import { useEffect, useState } from 'react';
import { useActualizarTarifas, useObtenerTarifas } from '../../../services/Taximetro/useTaximetro';

export const ConfiguracionModal = ({ onClose, enTrayecto }: { onClose: () => void, enTrayecto: boolean }) => {
  const { data: tarifas, isLoading } = useObtenerTarifas();
  const { mutate: actualizar, isPending } = useActualizarTarifas();
  
  const [valores, setValores] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (tarifas) {
      const iniciales: { [key: number]: number } = {};
      tarifas.forEach(t => {
        iniciales[t.tarifa_id] = t.costo_por_segundo;
      });
      setValores(iniciales);
    }
  }, [tarifas]);

  const handleCambio = (id: number, valor: string) => {
    setValores(prev => ({ ...prev, [id]: parseFloat(valor) || 0 }));
  };

  const handleGuardar = () => {
    const payload = Object.keys(valores).map(id => ({
      tarifa_id: Number(id),
      costo_por_segundo: valores[Number(id)]
    }));
    
    actualizar(payload, {
      onSuccess: () => onClose()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-slate-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            ⚙️ Configurar Tarifas
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 font-bold text-xl">
            ×
          </button>
        </div>

        {enTrayecto && (
          <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">⚠️</span>
            <p className="text-sm text-amber-700 font-medium">
              Edición bloqueada. No puedes modificar los precios mientras hay un trayecto en curso.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-slate-500 text-sm">Cargando tarifas...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {tarifas?.map((tarifa) => (
                <div key={tarifa.tarifa_id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-700 text-sm">{tarifa.estado_vehiculo}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      step="0.01"
                      value={valores[tarifa.tarifa_id] ?? 0}
                      onChange={(e) => handleCambio(tarifa.tarifa_id, e.target.value)}
                      disabled={enTrayecto} 
                      className="w-20 px-2 py-1 text-right font-mono text-sm border border-slate-300 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200"
                    />
                    <span className={`text-sm font-bold ${enTrayecto ? 'text-slate-400' : 'text-slate-500'}`}>€/s</span>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={handleGuardar}
                disabled={isPending || enTrayecto} 
                className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {isPending ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};