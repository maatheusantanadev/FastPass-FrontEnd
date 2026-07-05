import { useNavigate } from "react-router-dom";
import { Users, CheckCircle2, Wallet, TrendingUp, Radio, ArrowRight } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import KPI from "../../components/KPI.jsx";
import BarChart from "../../components/BarChart.jsx";
import Donut from "../../components/Donut.jsx";
import { vendasPorDia, kpisVisaoGeral } from "../../data/relatorios.js";
import { formatBRL, pct } from "../../utils/format.js";

export default function VisaoGeralScreen() {
  const navigate = useNavigate();
  const k = kpisVisaoGeral;

  return (
    <DashboardShell title="Visão geral" subtitle="Bahia Sol Turismo · julho">
      {/* banner embarque em andamento */}
      <button
        type="button"
        onClick={() => navigate("/painel/validacao")}
        className="mb-6 flex w-full items-center gap-4 rounded-2xl bg-cobalt p-5 text-left text-white transition-colors hover:bg-cobalt-dark"
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>
        <div className="flex-1">
          <p className="inline-flex items-center gap-2 font-display text-[18px] font-medium">
            <Radio size={18} /> Embarque em andamento
          </p>
          <p className="text-[13px] text-white/70">
            Praia do Forte · acompanhe a validação em tempo real
          </p>
        </div>
        <ArrowRight size={20} />
      </button>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPI label="Vagas ocupadas" value={`${k.vagasOcupadas}/${k.capacidade}`} icon={Users} sub="nesta viagem" />
        <KPI label="Confirmados" value={k.confirmados} icon={CheckCircle2} sub="pagamento ok" />
        <KPI label="Pagamentos" value={formatBRL(k.pagamentos)} icon={Wallet} sub="a receber hoje" />
        <KPI label="Ocupação média" value={pct(k.ocupacaoMedia)} icon={TrendingUp} sub="últimos 7 dias" />
      </div>

      {/* gráficos */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-5 lg:col-span-2">
          <h2 className="font-display text-[17px] font-medium text-ink">
            Vendas por dia
          </h2>
          <p className="mb-4 text-[13px] text-muted">Passagens emitidas na semana</p>
          <BarChart data={vendasPorDia} unit=" passagens" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-4 self-start font-display text-[17px] font-medium text-ink">
            Ocupação
          </h2>
          <Donut value={k.vagasOcupadas / k.capacidade} caption="ocupadas" />
          <p className="mt-4 text-[13px] text-muted">
            {k.vagasOcupadas} de {k.capacidade} poltronas
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
