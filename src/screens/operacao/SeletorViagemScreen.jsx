import { useNavigate } from "react-router-dom";
import { Clock, Bus, ChevronRight } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Scene from "../../components/Scene.jsx";
import Badge from "../../components/Badge.jsx";
import { viagensDoDia } from "../../data/operacao.js";

const situacaoBadge = {
  andamento: { tone: "cobalt", label: "Em andamento" },
  aguardando: { tone: "warning", label: "A sair" },
  concluida: { tone: "success", label: "Concluída" },
};

export default function SeletorViagemScreen() {
  const navigate = useNavigate();

  return (
    <MobileShell
      header={<AppHeader title="Viagens do dia" subtitle="Sr. Antônio" onBack={() => navigate("/operacao")} />}
    >
      <div className="px-5 py-5">
        <p className="mb-4 text-[15px] leading-relaxed text-muted">
          Escolha a viagem para operar o embarque. Hoje há{" "}
          {viagensDoDia.length} partidas.
        </p>

        <ul className="flex flex-col gap-3">
          {viagensDoDia.map((v) => {
            const info = situacaoBadge[v.situacao];
            const pct = Math.round((v.embarcados / v.capacidade) * 100);
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => navigate("/operacao")}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                    v.atual ? "border-cobalt bg-cobalt-tint/40" : "border-line bg-white active:bg-cobalt-tint/20"
                  }`}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Scene variant={v.cena} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-[16px] font-medium text-ink">
                        {v.destino}
                      </h2>
                      <Badge tone={info.tone}>{info.label}</Badge>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[12px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {v.saida}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Bus size={12} /> {v.onibus}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-cobalt"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-medium text-muted">
                        {v.embarcados}/{v.capacidade}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-muted" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </MobileShell>
  );
}
