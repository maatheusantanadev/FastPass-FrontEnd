import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Bus, ChevronRight } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Scene from "../../components/Scene.jsx";
import Badge from "../../components/Badge.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { listarExcursoesMotorista } from "../../api/motorista.js";
import { dataCurta, hora } from "../../api/adapters.js";

const situacaoBadge = {
  aberta: { tone: "warning", label: "A sair" },
  encerrada: { tone: "cobalt", label: "Em andamento" },
  concluida: { tone: "success", label: "Concluída" },
};

export default function SeletorViagemScreen() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { setExcursaoId } = useOperacao();
  const [viagens, setViagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let vivo = true;
    listarExcursoesMotorista()
      .then((lista) => {
        if (vivo) setViagens(Array.isArray(lista) ? lista : []);
      })
      .catch((err) => {
        if (vivo) setErro(err.message || "Não foi possível carregar suas viagens.");
      })
      .finally(() => {
        if (vivo) setCarregando(false);
      });
    return () => {
      vivo = false;
    };
  }, []);

  function escolher(excursao) {
    setExcursaoId(excursao.id);
    navigate("/operacao");
  }

  return (
    <MobileShell
      header={
        <AppHeader
          title="Viagens do dia"
          subtitle={usuario?.name}
          onBack={() => navigate("/operacao")}
        />
      }
    >
      <div className="px-5 py-5">
        {carregando && (
          <p className="text-[14px] text-muted">Carregando viagens…</p>
        )}

        {!carregando && erro && (
          <p className="text-[14px] text-danger">{erro}</p>
        )}

        {!carregando && !erro && (
          <>
            <p className="mb-4 text-[15px] leading-relaxed text-muted">
              {viagens.length === 0
                ? "Nenhuma viagem atribuída a você no momento."
                : `Escolha a viagem para operar o embarque. Você tem ${viagens.length} viagem(ns).`}
            </p>

            <ul className="flex flex-col gap-3">
              {viagens.map((v) => {
                const info = situacaoBadge[v.status] ?? situacaoBadge.aberta;
                const pct = v.vagas_total
                  ? Math.round(
                      ((v.vagas_total - v.vagas_disponiveis) / v.vagas_total) * 100
                    )
                  : 0;
                return (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => escolher(v)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3 text-left transition-colors active:bg-cobalt-tint/20"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Scene variant="praia" />
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
                            <Clock size={12} /> {dataCurta(v.data_saida)} · {hora(v.data_saida)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Bus size={12} /> {v.titulo}
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
                            {v.vagas_total - v.vagas_disponiveis}/{v.vagas_total}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="shrink-0 text-muted" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </MobileShell>
  );
}
