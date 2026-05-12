interface DisplayProps {
  estado: string;
  total: number;
  enTrayecto: boolean;
  tiempoSegundos: number;
  tiempoParado: number;
  tiempoMovimiento: number;
  costoParado: number;
  costoMovimiento: number;
}

export default function DisplayTaximetro({
  estado,
  total,
  enTrayecto,
  tiempoSegundos,
  tiempoParado,
  tiempoMovimiento,
  costoParado,
  costoMovimiento,
}: DisplayProps) {
  const formatearTiempo = (segundosTotales: number) => {
    const segundosReales = enTrayecto ? Math.max(0, segundosTotales) : 0;
    const minutos = Math.floor(segundosReales / 60);
    const segundos = Math.floor(segundosReales % 60);
    return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 text-center border-2 border-slate-100 relative overflow-hidden shadow-inner flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-6 pb-6 border-b border-slate-200">
        <div className="text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Cronómetro Total
          </p>
          <div className="text-3xl font-black text-slate-800 font-mono tracking-widest">
            {formatearTiempo(tiempoSegundos)}
          </div>
        </div>

        <div className="text-right">
          <span
            className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-sm border transition-colors
            ${
              !enTrayecto
                ? "bg-slate-200 text-slate-500 border-slate-300"
                : estado === "MOVIMIENTO"
                  ? "bg-amber-100 text-amber-700 border-amber-300"
                  : "bg-rose-100 text-rose-700 border-rose-300"
            }`}
          >
            {enTrayecto ? `TAXI EN ${estado}` : "TAXI LIBRE"}
          </span>
        </div>
      </div>

      <div className="mb-8 w-full">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
          Importe Total
        </p>
        <div className="text-7xl font-black text-slate-900 font-mono tracking-tighter drop-shadow-sm">
          {total.toFixed(2)}{" "}
          <span className="text-4xl text-slate-400 font-bold">€</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-rose-50 border border-rose-100">
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">
            Detalle Parado
          </p>
          <div className="flex items-end gap-3">
            <span className="text-lg font-mono font-bold text-slate-700">
              {formatearTiempo(tiempoParado)}
            </span>
            <span className="text-lg font-mono font-black text-rose-600">
              {costoParado.toFixed(2)}€
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-amber-50 border border-amber-100">
          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">
            Detalle Movimiento
          </p>
          <div className="flex items-end gap-3">
            <span className="text-lg font-mono font-bold text-slate-700">
              {formatearTiempo(tiempoMovimiento)}
            </span>
            <span className="text-lg font-mono font-black text-amber-600">
              {costoMovimiento.toFixed(2)}€
            </span>obtener_estado_actual
          </div>
        </div>
      </div>
    </div>
  );
}
