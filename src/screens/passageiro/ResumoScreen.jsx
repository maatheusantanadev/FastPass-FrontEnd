import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Armchair, Tag, Check, X } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";
import { formatBRL } from "../../utils/format.js";

function Item({ icon: Icon, titulo, sub, valor }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cobalt-tint text-cobalt-dark">
        <Icon size={17} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-ink">{titulo}</p>
        {sub && <p className="truncate text-[13px] text-muted">{sub}</p>}
      </div>
      <span className="text-[15px] font-semibold text-ink">{valor}</span>
    </div>
  );
}

export default function ResumoScreen() {
  const navigate = useNavigate();
  const { excursao, assento, extras, cupom, aplicarCupom, setCupom, totais } = usePedido();
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState(false);

  function aplicar() {
    if (aplicarCupom(codigo)) {
      setErro(false);
    } else {
      setErro(true);
    }
  }

  return (
    <MobileShell
      header={<AppHeader title="Resumo do pedido" />}
      footer={
        <div className="flex items-center gap-4 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="min-w-[104px]">
            <p className="text-[12px] text-muted">Total</p>
            <p className="font-display text-[22px] font-semibold text-cobalt">
              {formatBRL(totais.total)}
            </p>
          </div>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate("/app/pagamento")}
          >
            Ir para pagamento
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        <div className="divide-y divide-line rounded-2xl border border-line px-4">
          <Item
            icon={Ticket}
            titulo={excursao.destino}
            sub={`${excursao.data} · ${excursao.duracao}`}
            valor={formatBRL(excursao.preco)}
          />
          {assento && (
            <Item icon={Armchair} titulo="Assento" sub={`Poltrona ${assento}`} valor="Incluso" />
          )}
          {extras.map((e) => (
            <Item key={e.id} icon={Tag} titulo={e.nome} sub={e.descricao} valor={formatBRL(e.preco)} />
          ))}
        </div>

        {/* cupom */}
        <div className="mt-5">
          <label className="mb-1.5 block text-[13px] font-medium text-ink/80">
            Cupom de desconto
          </label>
          <div className="flex gap-2">
            <input
              value={codigo}
              onChange={(e) => {
                setCodigo(e.target.value.toUpperCase());
                setErro(false);
              }}
              placeholder="Ex.: BAHIA10"
              aria-label="Código do cupom"
              className={`h-[50px] flex-1 rounded-[14px] border bg-cobalt-tint/50 px-4 text-[15px] uppercase text-ink placeholder:normal-case placeholder:text-muted/70 focus:bg-white focus:outline-none ${
                erro ? "border-danger" : "border-line focus:border-cobalt"
              }`}
            />
            <Button variant="soft" onClick={aplicar} className="px-5">
              Aplicar
            </Button>
          </div>
          {erro && <p className="mt-1.5 text-[13px] text-danger">Cupom inválido.</p>}
          {cupom && (
            <div className="mt-2 flex items-center justify-between rounded-xl bg-success/10 px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-success">
                <Check size={15} strokeWidth={3} /> {cupom.codigo} · {cupom.rotulo}
              </span>
              <button
                type="button"
                onClick={() => { setCupom(null); setCodigo(""); }}
                aria-label="Remover cupom"
                className="tap-target flex items-center justify-center rounded-full text-success"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* totais */}
        <div className="mt-5 space-y-2 border-t border-line pt-4 text-[14px]">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>{formatBRL(totais.subtotal)}</span>
          </div>
          {totais.desconto > 0 && (
            <div className="flex justify-between text-success">
              <span>Desconto</span>
              <span>−{formatBRL(totais.desconto)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 font-display text-[18px] font-semibold text-ink">
            <span>Total</span>
            <span>{formatBRL(totais.total)}</span>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
