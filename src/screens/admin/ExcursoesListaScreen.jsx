import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronRight } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import Button from "../../components/Button.jsx";
import { listarExcursoes } from "../../api/excursoes.js";
import { excursaoDoBackend } from "../../api/adapters.js";
import { formatBRL, pct } from "../../utils/format.js";

function OcupacaoBar({ ocupadas, total }) {
  const frac = ocupadas / total;
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-cobalt" style={{ width: `${frac * 100}%` }} />
      </div>
      <span className="text-[13px] font-medium text-ink">{pct(frac)}</span>
    </div>
  );
}

export default function ExcursoesListaScreen() {
  const navigate = useNavigate();
  const [excursoes, setExcursoes] = useState([]);

  useEffect(() => {
    let vivo = true;
    listarExcursoes()
      .then((lista) => {
        if (vivo && Array.isArray(lista)) {
          setExcursoes(lista.map(excursaoDoBackend));
        }
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const columns = [
    {
      key: "destino",
      header: "Excursão",
      render: (e) => (
        <div>
          <p className="font-medium text-ink">{e.destino}</p>
          <p className="text-[12px] text-muted">{e.empresa}</p>
        </div>
      ),
    },
    { key: "data", header: "Data" },
    {
      key: "ocupacao",
      header: "Ocupação",
      render: (e) => <OcupacaoBar ocupadas={e.total - e.vagas} total={e.total} />,
    },
    {
      key: "status",
      header: "Situação",
      render: (e) =>
        e.vagas <= 5 ? (
          <Badge tone="warning">Últimas vagas</Badge>
        ) : (
          <Badge tone="success">Aberta</Badge>
        ),
    },
    {
      key: "receita",
      header: "Prevista",
      align: "right",
      render: (e) => (
        <span className="font-semibold text-ink">
          {formatBRL((e.total - e.vagas) * e.preco)}
        </span>
      ),
    },
    {
      key: "acao",
      header: "",
      align: "right",
      render: (e) => (
        <button
          type="button"
          onClick={() => navigate(`/painel/excursoes/${e.id}`)}
          aria-label={`Gerir ${e.destino}`}
          className="tap-target inline-flex items-center justify-center rounded-lg text-cobalt hover:bg-cobalt-tint"
        >
          <ChevronRight size={18} />
        </button>
      ),
    },
  ];

  return (
    <DashboardShell
      title="Excursões"
      subtitle="Bahia Sol Turismo"
      actions={
        <Button
          variant="primary"
          icon={Plus}
          className="px-4 py-2 text-[13px]"
          onClick={() => navigate("/painel/excursoes/nova")}
        >
          Nova excursão
        </Button>
      }
    >
      <DataTable columns={columns} rows={excursoes} getKey={(e) => e.id} />
    </DashboardShell>
  );
}
