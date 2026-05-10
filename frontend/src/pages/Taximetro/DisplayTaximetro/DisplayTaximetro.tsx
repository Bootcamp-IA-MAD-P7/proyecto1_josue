interface DisplayProps {
  estado: string;
  total: number;
  enTrayecto: boolean;
}

export default function DisplayTaximetro({
  estado,
  total,
  enTrayecto,
}: DisplayProps) {
  return (
    <div className="bg-slate-50 rounded-2xl p-6 text-center border-2 border-slate-100 relative overflow-hidden shadow-inner">
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
        Importe Total
      </p>

      <div className="text-6xl sm:text-7xl font-black text-slate-800 font-mono tracking-tighter">
        {total.toFixed(2)} <span className="text-4xl text-slate-400">€</span>
      </div>

      <div className="mt-6">
        <span
          className={`inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-sm border transition-colors
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
  );
}
