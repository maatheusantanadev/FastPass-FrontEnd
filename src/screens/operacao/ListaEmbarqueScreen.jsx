import { useNavigate } from "react-router-dom";
import { ScanFace } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import OperationHeader from "../../components/OperationHeader.jsx";
import BoardingRow from "../../components/BoardingRow.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

function Metric({ label, value, tone }) {
  return (
    <div className="flex-1 text-center">
      <p className={`font-display text-[22px] font-semibold ${tone}`}>{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

export default function ListaEmbarqueScreen() {
  const navigate = useNavigate();
  const { lista, total, contagem } = useOperacao();
  const pct = Math.round((contagem.embarcados / total) * 100);

  // embarcados primeiro (mais recentes no topo), depois pendentes/ausentes
  const ordenada = [...lista].sort((a, b) => {
    const ordem = { embarcado: 0, pendente: 1, ausente: 2 };
    return ordem[a.status] - ordem[b.status];
  });

  return (
    <MobileShell
      header={<OperationHeader embarcados={contagem.embarcados} total={total} />}
      footer={
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" icon={ScanFace} fullWidth onClick={() => navigate("/operacao/facial")}>
            Continuar validando
          </Button>
          <Button variant="soft" fullWidth onClick={() => navigate("/operacao/fim")}>
            Encerrar embarque
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        <h1 className="mb-4 font-display text-[20px] font-medium text-ink">
          Lista de embarque
        </h1>

        {/* progresso */}
        <div className="rounded-2xl border border-line bg-white p-4">
          <div className="flex">
            <Metric label="Embarcados" value={contagem.embarcados} tone="text-success" />
            <Metric label="Confirmados" value={contagem.confirmados} tone="text-ink" />
            <Metric label="Pendentes" value={contagem.pendentes} tone="text-warning" />
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-cobalt transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* lista ao vivo */}
        <ul className="mt-2 divide-y divide-line">
          {ordenada.map((p) => (
            <BoardingRow key={p.id} passageiro={p} />
          ))}
        </ul>
      </div>
    </MobileShell>
  );
}
