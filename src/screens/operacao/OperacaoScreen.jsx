import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bus, Clock, Users, ScanFace, ClipboardCheck } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import OperationHeader from "../../components/OperationHeader.jsx";
import KPI from "../../components/KPI.jsx";
import Scene from "../../components/Scene.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { listarExcursoesMotorista } from "../../api/motorista.js";
import { dataCurta, hora } from "../../api/adapters.js";

export default function OperacaoScreen() {
  const navigate = useNavigate();
  const { total, contagem, excursaoId, setExcursaoId, excursaoAtual, erro } = useOperacao();

  // Ao entrar sem viagem selecionada, escolhe a próxima viagem atribuída ao
  // motorista autenticado (vinda do banco, via /motorista/excursoes).
  useEffect(() => {
    if (excursaoId) return;
    let vivo = true;
    listarExcursoesMotorista()
      .then((viagens) => {
        if (vivo && Array.isArray(viagens) && viagens.length) {
          setExcursaoId(viagens[0].id);
        }
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [excursaoId, setExcursaoId]);

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
          <Button
            variant="primary"
            icon={ScanFace}
            fullWidth
            disabled={!excursaoId}
            onClick={() => navigate("/operacao/facial")}
          >
            Iniciar embarque
          </Button>
          <Button
            variant="soft"
            icon={ClipboardCheck}
            fullWidth
            disabled={!excursaoId}
            onClick={() => navigate("/operacao/manual")}
          >
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

            {excursaoAtual ? (
              <>
                <h1 className="mt-0.5 font-display text-[22px] font-medium text-ink">
                  {excursaoAtual.destino ?? excursaoAtual.titulo}
                </h1>
                <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-muted">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={14} className="text-cobalt" />{" "}
                    {dataCurta(excursaoAtual.data_saida)} · saída {hora(excursaoAtual.data_saida)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Bus size={14} className="text-cobalt" /> {excursaoAtual.titulo}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users size={14} className="text-cobalt" /> {excursaoAtual.vagas_total} poltronas
                  </span>
                </div>
              </>
            ) : (
              <p className="mt-2 text-[14px] text-muted">
                {erro ?? "Nenhuma viagem atribuída a você no momento."}
              </p>
            )}
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
