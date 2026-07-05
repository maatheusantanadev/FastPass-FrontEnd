import { Download, UserCheck, Clock, TrendingUp, CalendarDays } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import KPI from "../../components/KPI.jsx";
import DataTable from "../../components/DataTable.jsx";
import Button from "../../components/Button.jsx";
import { historicoViagens, kpisRelatorios } from "../../data/relatorios.js";
import { formatBRL, pct } from "../../utils/format.js";

function BarraMini({ valor }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-cobalt" style={{ width: `${valor * 100}%` }} />
      </div>
      <span className="text-[13px] font-medium text-ink">{pct(valor)}</span>
    </div>
  );
}

export default function RelatoriosScreen() {
  const k = kpisRelatorios;

  const columns = [
    { key: "destino", header: "Viagem", render: (v) => <span className="font-medium text-ink">{v.destino}</span> },
    { key: "data", header: "Data" },
    { key: "ocupacao", header: "Ocupação", render: (v) => <BarraMini valor={v.ocupacao} /> },
    { key: "presenca", header: "Presença", render: (v) => pct(v.presenca) },
    {
      key: "receita",
      header: "Receita",
      align: "right",
      render: (v) => <span className="font-semibold text-ink">{formatBRL(v.receita)}</span>,
    },
  ];

  return (
    <DashboardShell
      title="Relatórios e histórico"
      subtitle="Desempenho das viagens"
      actions={
        <Button variant="primary" icon={Download} className="px-4 py-2 text-[13px]">
          Exportar
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPI label="Presença média" value={pct(k.presencaMedia)} icon={UserCheck} sub="check-in no embarque" />
        <KPI label="Atrasos" value={k.atrasos} icon={Clock} sub="no mês" />
        <KPI label="Ocupação" value={pct(k.ocupacao)} icon={TrendingUp} tone="cobalt" />
        <KPI label="Viagens no mês" value={k.viagensMes} icon={CalendarDays} />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-[17px] font-medium text-ink">
          Histórico de viagens
        </h2>
        <DataTable columns={columns} rows={historicoViagens} getKey={(v) => v.id} />
      </div>
    </DashboardShell>
  );
}
