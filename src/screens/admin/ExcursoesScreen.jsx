import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pencil, UserPlus, Users, CheckCircle2, Wallet } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import KPI from "../../components/KPI.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import MethodPill from "../../components/MethodPill.jsx";
import Avatar from "../../components/Avatar.jsx";
import Button from "../../components/Button.jsx";
import { passageiros as passageirosMock } from "../../data/passageiros.js";
import { excursaoPorId } from "../../data/excursoes.js";
import { painelExcursao } from "../../api/excursoes.js";
import { excursaoDoBackend, passageirosDoPainel } from "../../api/adapters.js";
import { formatBRL } from "../../utils/format.js";

// Normaliza a lista mock para o mesmo formato do adapter do painel.
function normalizarMock(p) {
  return {
    id: p.id,
    nome: p.nome,
    sub: `CPF ${p.cpf}`,
    pagamento: p.pagamento,
    embarque: p.status === "embarcado",
    metodo: p.metodo,
  };
}

export default function ExcursoesScreen() {
  const { id } = useParams();
  const [excursao, setExcursao] = useState(() => excursaoPorId(id));
  const [passageiros, setPassageiros] = useState(() =>
    passageirosMock.map(normalizarMock)
  );

  // Carrega o painel real; mantém o mock se o backend estiver offline.
  useEffect(() => {
    let vivo = true;
    painelExcursao(id)
      .then((p) => {
        if (!vivo || !p) return;
        if (p.excursao) setExcursao(excursaoDoBackend(p.excursao));
        setPassageiros(passageirosDoPainel(p));
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [id]);

  const confirmados = passageiros.filter((p) => p.pagamento === "pago").length;
  const aReceber =
    passageiros.filter((p) => p.pagamento === "pendente").length * excursao.preco;

  const columns = [
    {
      key: "nome",
      header: "Passageiro",
      render: (p) => (
        <div className="flex items-center gap-3">
          <Avatar nome={p.nome} size="sm" />
          <div>
            <p className="font-medium text-ink">{p.nome}</p>
            <p className="text-[12px] text-muted">{p.sub}</p>
          </div>
        </div>
      ),
    },
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
      key: "embarque",
      header: "Embarque",
      render: (p) =>
        p.embarque ? (
          p.metodo ? (
            <MethodPill metodo={p.metodo} size="sm" />
          ) : (
            <Badge tone="success">Embarcado</Badge>
          )
        ) : (
          <span className="text-muted">—</span>
        ),
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
