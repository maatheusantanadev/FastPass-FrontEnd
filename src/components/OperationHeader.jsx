import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Header da operação: selo "Operação" + contador X/total + barra de progresso.
export default function OperationHeader({
  embarcados,
  total,
  onBack,
  showBack = true,
}) {
  const navigate = useNavigate();
  const pct = total ? Math.round((embarcados / total) * 100) : 0;

  return (
    <header className="bg-cobalt px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            type="button"
            onClick={onBack || (() => navigate(-1))}
            aria-label="Voltar"
            className="tap-target -ml-2 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-badge">
          Operação
        </span>
        <div className="ml-auto text-right">
          <p className="font-display text-[17px] font-semibold leading-none">
            {embarcados}/{total}
          </p>
          <p className="text-[10px] uppercase tracking-wide text-white/60">embarcados</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}
