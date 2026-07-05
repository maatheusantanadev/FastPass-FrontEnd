import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Copy, Clock } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import PillTabs from "../../components/PillTabs.jsx";
import QRCode from "../../components/QRCode.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";
import { formatBRL } from "../../utils/format.js";

function formatCartao(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}
function formatValidade(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function Campo({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink/80">{label}</span>
      <input
        className="h-[50px] w-full rounded-[14px] border border-line bg-cobalt-tint/50 px-4 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
        {...props}
      />
    </label>
  );
}

export default function PagamentoScreen() {
  const navigate = useNavigate();
  const { totais, excursao } = usePedido();
  const [aba, setAba] = useState("cartao");
  const [cartao, setCartao] = useState({ numero: "", validade: "", cvv: "", nome: "" });
  const [segundos, setSegundos] = useState(14 * 60 + 59);

  useEffect(() => {
    if (aba !== "pix") return;
    const t = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [aba]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");

  return (
    <MobileShell
      header={<AppHeader title="Pagamento" />}
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
            onClick={() => navigate("/app/confirmacao")}
          >
            Pagar e confirmar
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        <PillTabs
          value={aba}
          onChange={setAba}
          tabs={[
            { value: "cartao", label: "Cartão" },
            { value: "pix", label: "Pix" },
          ]}
        />

        {aba === "cartao" ? (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-cobalt px-4 py-3 text-white">
              <CreditCard size={18} />
              <span className="text-[13px] font-medium">Crédito ou débito</span>
            </div>
            <Campo
              label="Número do cartão"
              inputMode="numeric"
              placeholder="0000 0000 0000 0000"
              value={cartao.numero}
              onChange={(e) => setCartao({ ...cartao, numero: formatCartao(e.target.value) })}
            />
            <div className="flex gap-3">
              <Campo
                label="Validade"
                className="flex-1"
                inputMode="numeric"
                placeholder="MM/AA"
                value={cartao.validade}
                onChange={(e) => setCartao({ ...cartao, validade: formatValidade(e.target.value) })}
              />
              <Campo
                label="CVV"
                className="flex-1"
                inputMode="numeric"
                placeholder="000"
                maxLength={4}
                value={cartao.cvv}
                onChange={(e) => setCartao({ ...cartao, cvv: e.target.value.replace(/\D/g, "") })}
              />
            </div>
            <Campo
              label="Nome no cartão"
              placeholder="Como está no cartão"
              value={cartao.nome}
              onChange={(e) => setCartao({ ...cartao, nome: e.target.value })}
            />
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center text-center">
            <QRCode value={`PIX|FASTPASS|${excursao.id}|${totais.total.toFixed(2)}`} size={188} />
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-warning/15 px-4 py-2 text-[13px] font-semibold text-[#B4761E]">
              <Clock size={15} /> Expira em {mm}:{ss}
            </div>
            <p className="mt-4 max-w-[290px] text-[14px] leading-relaxed text-muted">
              Abra o app do seu banco, escaneie o código e confirme o pagamento de{" "}
              <span className="font-semibold text-ink">{formatBRL(totais.total)}</span>.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-cobalt hover:text-cobalt-dark"
            >
              <Copy size={16} /> Copiar código Pix
            </button>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
