import { useNavigate } from "react-router-dom";
import { Bus, Clock, Users, ScanFace, ClipboardCheck } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import OperationHeader from "../../components/OperationHeader.jsx";
import KPI from "../../components/KPI.jsx";
import Scene from "../../components/Scene.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { resumoOperacao } from "../../data/passageiros.js";

export default function OperacaoScreen() {
  const navigate = useNavigate();
  const { total, contagem } = useOperacao();

  return (
    <MobileShell
      header={
        <OperationHeader
          embarcados={contagem.embarcados}
          total={total}
          showBack={false}
        />
      }
      footer={
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" icon={ScanFace} fullWidth onClick={() => navigate("/operacao/facial")}>
            Iniciar embarque
          </Button>
          <Button variant="soft" icon={ClipboardCheck} fullWidth onClick={() => navigate("/operacao/manual")}>
            Conferência manual
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        {/* card da viagem do dia */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="h-28">
            <Scene variant="praia" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-cobalt">
                Viagem do dia
              </p>
              <button
                type="button"
                onClick={() => navigate("/operacao/viagens")}
                className="tap-target -my-2 flex items-center rounded-full px-2 text-[13px] font-semibold text-cobalt hover:bg-cobalt-tint"
              >
                Trocar
              </button>
            </div>
            <h1 className="mt-0.5 font-display text-[22px] font-medium text-ink">
              {resumoOperacao.excursao}
            </h1>
            <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-muted">
              <span className="inline-flex items-center gap-2">
                <Clock size={14} className="text-cobalt" /> {resumoOperacao.data} · saída {resumoOperacao.saida}
              </span>
              <span className="inline-flex items-center gap-2">
                <Bus size={14} className="text-cobalt" /> {resumoOperacao.onibus}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users size={14} className="text-cobalt" /> {resumoOperacao.capacidade} poltronas
              </span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <KPI label="Confirmados" value={contagem.confirmados} />
          <KPI label="Embarcados" value={contagem.embarcados} tone="cobalt" />
          <KPI label="Pendentes" value={contagem.pendentes} />
        </div>
      </div>
    </MobileShell>
  );
}
