import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Bus, Armchair } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import TabBar from "../../components/TabBar.jsx";
import PillTabs from "../../components/PillTabs.jsx";
import Scene from "../../components/Scene.jsx";
import Badge from "../../components/Badge.jsx";
import Button from "../../components/Button.jsx";
import { listarCompras } from "../../api/compras.js";
import { compraParaViagem } from "../../api/adapters.js";

const statusBadge = {
  confirmada: { tone: "success", label: "Confirmada" },
  aguardando: { tone: "warning", label: "Aguardando embarque" },
  concluida: { tone: "neutral", label: "Concluída" },
  cancelada: { tone: "neutral", label: "Cancelada" },
};

function ViagemCard({ viagem, proxima }) {
  const navigate = useNavigate();
  const info = statusBadge[viagem.status] ?? statusBadge.confirmada;
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
      <button
        type="button"
        onClick={() => navigate(`/app/viagem/${viagem.id}`)}
        className="flex w-full gap-3 p-3 text-left transition-colors active:bg-cobalt-tint/30"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
          <Scene variant={viagem.cena} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[17px] font-medium text-ink">
              {viagem.destino}
            </h3>
            <Badge tone={info.tone}>{info.label}</Badge>
          </div>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-muted">
            <Calendar size={13} /> {viagem.data}
          </p>
          <div className="mt-1 flex items-center gap-3 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Bus size={13} /> {viagem.saida.split(" · ")[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Armchair size={13} /> {viagem.assento}
            </span>
          </div>
        </div>
      </button>
      {proxima && (
        <div className="border-t border-line p-3">
          <Button
            variant={viagem.status === "confirmada" ? "primary" : "soft"}
            fullWidth
            onClick={() => navigate(`/app/embarque/${viagem.id}`)}
          >
            Fazer embarque
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ViagensScreen() {
  const [aba, setAba] = useState("proximas");
  const [viagens, setViagens] = useState({ proximas: [], anteriores: [] });

  // Carrega as compras do passageiro a partir do backend.
  useEffect(() => {
    let vivo = true;
    listarCompras()
      .then((compras) => {
        if (!vivo || !Array.isArray(compras)) return;
        const mapeadas = compras.map(compraParaViagem);
        setViagens({
          proximas: mapeadas.filter(
            (v) => v.status !== "concluida" && v.status !== "cancelada"
          ),
          anteriores: mapeadas.filter(
            (v) => v.status === "concluida" || v.status === "cancelada"
          ),
        });
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const lista = aba === "proximas" ? viagens.proximas : viagens.anteriores;

  return (
    <MobileShell footer={<TabBar />}>
      <div className="px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="mb-4 font-display text-[24px] font-medium text-ink">
          Minhas viagens
        </h1>
        <PillTabs
          value={aba}
          onChange={setAba}
          tabs={[
            { value: "proximas", label: "Próximas" },
            { value: "anteriores", label: "Anteriores" },
          ]}
        />
      </div>

      <div className="flex flex-col gap-4 px-5 pb-6">
        {lista.length === 0 ? (
          <p className="py-10 text-center text-[14px] text-muted">
            {aba === "proximas"
              ? "Você ainda não tem viagens. Explore os destinos disponíveis."
              : "Nenhuma viagem anterior por aqui."}
          </p>
        ) : (
          lista.map((v) => (
            <ViagemCard key={v.id} viagem={v} proxima={aba === "proximas"} />
          ))
        )}
      </div>
    </MobileShell>
  );
}
