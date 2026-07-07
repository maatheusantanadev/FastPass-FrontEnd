import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, UserPlus, Users, CheckCircle2, Wallet, X } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import KPI from "../../components/KPI.jsx";
import DataTable from "../../components/DataTable.jsx";
import Badge from "../../components/Badge.jsx";
import MethodPill from "../../components/MethodPill.jsx";
import Avatar from "../../components/Avatar.jsx";
import Button from "../../components/Button.jsx";
import { painelExcursao, adicionarPassageiro } from "../../api/excursoes.js";
import { excursaoDoBackend, passageirosDoPainel } from "../../api/adapters.js";
import { formatBRL } from "../../utils/format.js";

export default function ExcursoesScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [excursao, setExcursao] = useState(null);
  const [passageiros, setPassageiros] = useState([]);

  // Form "adicionar passageiro"
  const [adicionando, setAdicionando] = useState(false);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const [salvando, setSalvando] = useState(false);

  function carregar() {
    return painelExcursao(id)
      .then((p) => {
        if (!p) return;
        if (p.excursao) setExcursao(excursaoDoBackend(p.excursao));
        setPassageiros(passageirosDoPainel(p));
      })
      .catch(() => {});
  }

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function submeterPassageiro(e) {
    e.preventDefault();
    setMsg(null);
    setSalvando(true);
    try {
      await adicionarPassageiro(id, email.trim());
      setEmail("");
      setAdicionando(false);
      await carregar();
    } catch (err) {
      setMsg(err.message || "Não foi possível adicionar o passageiro.");
    } finally {
      setSalvando(false);
    }
  }

  const confirmados = passageiros.filter((p) => p.pagamento === "pago").length;
  const aReceber =
    passageiros.filter((p) => p.pagamento === "pendente").length *
    (excursao?.preco ?? 0);

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

  const acoes = (
    <>
      <Button
        variant="soft"
        icon={Pencil}
        className="px-4 py-2 text-[13px]"
        onClick={() => navigate(`/painel/excursoes/${id}/editar`)}
      >
        Editar
      </Button>
      <Button
        variant="primary"
        icon={UserPlus}
        className="px-4 py-2 text-[13px]"
        onClick={() => {
          setAdicionando((v) => !v);
          setMsg(null);
        }}
      >
        Adicionar passageiro
      </Button>
    </>
  );

  return (
    <DashboardShell
      title={excursao?.destino ?? "Excursão"}
      subtitle={excursao ? `${excursao.data} · ${excursao.empresa}` : ""}
      actions={<div className="hidden gap-2 sm:flex">{acoes}</div>}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPI label="Capacidade" value={`${excursao?.total ?? 0} lugares`} icon={Users} />
        <KPI label="Confirmados" value={confirmados} icon={CheckCircle2} tone="cobalt" />
        <KPI label="A receber" value={formatBRL(aReceber)} icon={Wallet} sub="pagamentos pendentes" />
      </div>

      {/* form adicionar passageiro */}
      {adicionando && (
        <form
          onSubmit={submeterPassageiro}
          className="mt-6 rounded-2xl border border-line bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-medium text-ink">
              Adicionar passageiro
            </h3>
            <button
              type="button"
              onClick={() => setAdicionando(false)}
              aria-label="Fechar"
              className="tap-target text-muted hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>
          <p className="mt-1 text-[12px] text-muted">
            Informe o e-mail de um passageiro já cadastrado.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="passageiro@email.com"
              className="h-[46px] flex-1 rounded-[12px] border border-line bg-cobalt-tint/40 px-3.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
            />
            <Button type="submit" variant="primary" className="px-5 py-2.5 text-[14px]" disabled={salvando}>
              {salvando ? "Adicionando…" : "Adicionar"}
            </Button>
          </div>
          {msg && <p className="mt-2 text-[13px] text-danger">{msg}</p>}
        </form>
      )}

      <div className="mt-6">
        <h2 className="mb-3 font-display text-[17px] font-medium text-ink">
          Passageiros ({passageiros.length})
        </h2>
        <DataTable columns={columns} rows={passageiros} getKey={(p) => p.id} />
      </div>

      {/* ações no mobile */}
      <div className="mt-4 flex gap-2 sm:hidden">{acoes}</div>
    </DashboardShell>
  );
}
