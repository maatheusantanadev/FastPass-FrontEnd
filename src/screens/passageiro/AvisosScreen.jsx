import { useNavigate } from "react-router-dom";
import { Bus, CheckCircle2, MapPin, ChevronRight } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import TabBar from "../../components/TabBar.jsx";
import { avisos } from "../../data/viagens.js";

const iconePorTipo = {
  embarque: { icon: Bus, tone: "bg-cobalt-tint text-cobalt-dark" },
  pagamento: { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  local: { icon: MapPin, tone: "bg-warning/15 text-[#B4761E]" },
};

export default function AvisosScreen() {
  const navigate = useNavigate();
  return (
    <MobileShell footer={<TabBar />}>
      <div className="px-5 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-[24px] font-medium text-ink">Avisos</h1>
      </div>

      <ul className="divide-y divide-line px-5">
        {avisos.map((a) => {
          const info = iconePorTipo[a.tipo];
          const Icon = info.icon;
          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => navigate(`/app/aviso/${a.id}`)}
                className="flex w-full items-center gap-3 py-4 text-left transition-colors active:bg-cobalt-tint/30"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${info.tone}`}
                >
                  <Icon size={19} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-[15px] font-semibold text-ink">
                      {a.titulo}
                    </p>
                    {a.novo && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-cobalt" aria-label="novo" />
                    )}
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted">{a.texto}</p>
                  <p className="mt-1 text-[12px] text-muted/70">{a.tempo}</p>
                </div>
                <ChevronRight size={18} className="shrink-0 text-muted" />
              </button>
            </li>
          );
        })}
      </ul>
    </MobileShell>
  );
}
