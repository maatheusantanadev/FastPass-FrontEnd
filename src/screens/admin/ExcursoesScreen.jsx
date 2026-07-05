import { Pencil, UserPlus, Users, CheckCircle2, Wallet } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import KPI from "../../components/KPI.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import MethodPill from "../../components/MethodPill.jsx";
import Avatar from "../../components/Avatar.jsx";
import Button from "../../components/Button.jsx";
import { passageiros } from "../../data/passageiros.js";
import { excursaoPorId } from "../../data/excursoes.js";
import { formatBRL } from "../../utils/format.js";

export default function ExcursoesScreen() {
  const excursao = excursaoPorId("praia-do-forte");
  const confirmados = passageiros.filter((p) => p.pagamento === "pago").length;
  const aReceber = passageiros.filter((p) => p.pagamento === "pendente").length * excursao.preco;

  const columns = [
    {
      key: "nome",
      header: "Passageiro",
      render: (p) => (
        <div className="flex items-center gap-3">
          <Avatar nome={p.nome} size="sm" />
          <div>
            <p className="font-medium text-ink">{p.nome}</p>
            <p className="text-[12px] text-muted">CPF {p.cpf}</p>
          </div>
        </div>
      ),
    },
    { key: "assento", header: "Assento", render: (p) => <span className="font-medium">{p.assento}</span> },
    {
      key: "pagamento",
      header: "Pagamento",
      render: (p) =>
        p.pagamento === "pago" ? (
          <Badge tone="success">Pago</Badge>
        ) : (
          <Badge tone="warning">Pendente</Badge>
        ),
    },
    {
      key: "metodo",
      header: "Embarque",
      render: (p) =>
        p.metodo ? <MethodPill metodo={p.metodo} size="sm" /> : <span className="text-muted">—</span>,
    },
  ];

  return (
    <DashboardShell
      title={excursao.destino}
      subtitle={`${excursao.data} · ${excursao.empresa}`}
      actions={
        <div className="hidden gap-2 sm:flex">
          <Button variant="soft" icon={Pencil} className="px-4 py-2 text-[13px]">
            Editar
          </Button>
          <Button variant="primary" icon={UserPlus} className="px-4 py-2 text-[13px]">
            Adicionar passageiro
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPI label="Capacidade" value={`${excursao.total} lugares`} icon={Users} />
        <KPI label="Confirmados" value={confirmados} icon={CheckCircle2} tone="cobalt" />
        <KPI label="A receber" value={formatBRL(aReceber)} icon={Wallet} sub="pagamentos pendentes" />
      </div>

      <div className="mt-6">
        <h2 className="mb-3 font-display text-[17px] font-medium text-ink">
          Passageiros ({passageiros.length})
        </h2>
        <DataTable columns={columns} rows={passageiros} getKey={(p) => p.id} />
      </div>

      {/* ações no mobile */}
      <div className="mt-4 flex gap-2 sm:hidden">
        <Button variant="soft" icon={Pencil} className="flex-1 py-2.5 text-[14px]">
          Editar
        </Button>
        <Button variant="primary" icon={UserPlus} className="flex-1 py-2.5 text-[14px]">
          Adicionar
        </Button>
      </div>
    </DashboardShell>
  );
}
