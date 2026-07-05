import { useState, useMemo } from "react";
import { Search, Check } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import OperationHeader from "../../components/OperationHeader.jsx";
import Avatar from "../../components/Avatar.jsx";
import Badge from "../../components/Badge.jsx";
import MethodPill from "../../components/MethodPill.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ConferenciaManualScreen() {
  const { lista, total, contagem, embarcar } = useOperacao();
  const [busca, setBusca] = useState("");

  const filtrada = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return lista;
    return lista.filter(
      (p) => p.nome.toLowerCase().includes(q) || p.cpf.includes(q)
    );
  }, [lista, busca]);

  return (
    <MobileShell
      header={<OperationHeader embarcados={contagem.embarcados} total={total} />}
    >
      <div className="sticky top-0 z-10 bg-white px-5 pb-3 pt-4">
        <h1 className="mb-3 font-display text-[20px] font-medium text-ink">
          Conferência manual
        </h1>
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou CPF"
            aria-label="Buscar passageiro"
            className="h-[50px] w-full rounded-[14px] border border-line bg-cobalt-tint/50 pl-11 pr-4 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <ul className="divide-y divide-line px-5 pb-6">
        {filtrada.map((p) => {
          const embarcado = p.status === "embarcado";
          return (
            <li key={p.id} className="flex items-center gap-3 py-3">
              <Avatar nome={p.nome} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-ink">{p.nome}</p>
                <p className="text-[12px] text-muted">
                  Assento {p.assento} · CPF {p.cpf}
                </p>
              </div>
              {embarcado ? (
                <div className="flex flex-col items-end gap-1">
                  <Badge tone="success" icon={Check}>Embarcado</Badge>
                  {p.metodo && <MethodPill metodo={p.metodo} size="sm" />}
                </div>
              ) : (
                <Button
                  variant="soft"
                  onClick={() => embarcar("manual", p.id)}
                  className="px-4 py-2 text-[13px]"
                >
                  Confirmar
                </Button>
              )}
            </li>
          );
        })}
        {filtrada.length === 0 && (
          <li className="py-10 text-center text-[14px] text-muted">
            Nenhum passageiro encontrado.
          </li>
        )}
      </ul>
    </MobileShell>
  );
}
