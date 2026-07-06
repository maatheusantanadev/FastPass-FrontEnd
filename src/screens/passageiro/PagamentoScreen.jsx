import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Clock, Check, RotateCw } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import QRCode from "../../components/QRCode.jsx";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";
import { criarCompra, consultarPagamento } from "../../api/compras.js";
import { formatBRL } from "../../utils/format.js";

export default function PagamentoScreen() {
  const navigate = useNavigate();
  const { excursao, totais, setCompra } = usePedido();
  const [pix, setPix] = useState(null); // { copia_cola, qr_base64, simulado }
  const [compraId, setCompraId] = useState(null);
  const [estado, setEstado] = useState("gerando"); // gerando | aguardando | pago | erro
  const [copiado, setCopiado] = useState(false);
  const [segundos, setSegundos] = useState(15 * 60);
  const criadoRef = useRef(false);

  // 1) Gera a cobrança Pix ao abrir a tela (uma vez).
  useEffect(() => {
    if (criadoRef.current) return;
    criadoRef.current = true;
    const excursaoId = excursao?.raw?.id ?? excursao?.id;
    criarCompra(excursaoId)
      .then((data) => {
        setPix(data.pix ?? null);
        setCompraId(data.compra?.id ?? null);
        if (data.compra) setCompra(data.compra);
        setEstado("aguardando");
      })
      .catch((err) => {
        if (err.offline) {
          // Modo demonstração: Pix fictício + confirmação manual.
          setPix({ copia_cola: `FASTPASS-DEMO-${excursaoId ?? ""}`, simulado: true });
          setEstado("aguardando");
        } else {
          setEstado("erro");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Contador regressivo.
  useEffect(() => {
    if (estado !== "aguardando") return;
    const t = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [estado]);

  // 3) Polling do status do pagamento.
  useEffect(() => {
    if (estado !== "aguardando" || !compraId) return;
    const poll = setInterval(async () => {
      try {
        const res = await consultarPagamento(compraId);
        if (res.status === "aprovado") {
          clearInterval(poll);
          if (res.compra) setCompra(res.compra);
          setEstado("pago");
          setTimeout(() => navigate("/app/confirmacao"), 1000);
        } else if (res.status === "recusado") {
          clearInterval(poll);
          setEstado("erro");
        }
      } catch {
        /* backend momentaneamente indisponível — continua tentando */
      }
    }, 3000);
    return () => clearInterval(poll);
  }, [estado, compraId, navigate, setCompra]);

  const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
  const ss = String(segundos % 60).padStart(2, "0");
  const total = totais.total;

  function copiar() {
    if (!pix?.copia_cola) return;
    navigator.clipboard?.writeText(pix.copia_cola).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  // "Já paguei" — força uma checagem imediata (avança no modo demo/simulado).
  async function jaPaguei() {
    if (!compraId) {
      navigate("/app/confirmacao");
      return;
    }
    try {
      const res = await consultarPagamento(compraId);
      if (res.compra) setCompra(res.compra);
      setEstado(res.status === "aprovado" ? "pago" : "aguardando");
      if (res.status === "aprovado") navigate("/app/confirmacao");
    } catch {
      navigate("/app/confirmacao");
    }
  }

  return (
    <MobileShell
      header={<AppHeader title="Pagamento via Pix" />}
      footer={
        estado === "aguardando" ? (
          <div className="flex flex-col gap-2 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button variant="primary" fullWidth onClick={jaPaguei}>
              Já paguei
            </Button>
            <p className="text-center text-[12px] text-muted">
              A confirmação é automática assim que o Pix cai.
            </p>
          </div>
        ) : null
      }
    >
      <div className="flex flex-col items-center px-6 py-6 text-center">
        {estado === "gerando" && (
          <div className="flex flex-col items-center py-16 text-muted">
            <RotateCw size={26} className="animate-spin text-cobalt" />
            <p className="mt-4 text-[15px]">Gerando cobrança Pix…</p>
          </div>
        )}

        {estado === "erro" && (
          <div className="flex flex-col items-center py-14">
            <p className="text-[15px] text-ink">Não foi possível gerar o Pix.</p>
            <Button variant="soft" className="mt-4" onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        )}

        {estado === "pago" && (
          <div className="flex flex-col items-center py-14">
            <SuccessCheck size={84} />
            <p className="mt-5 font-display text-[20px] font-medium text-ink">
              Pagamento confirmado!
            </p>
          </div>
        )}

        {estado === "aguardando" && (
          <>
            <p className="text-[14px] text-muted">Valor a pagar</p>
            <p className="font-display text-[30px] font-semibold text-cobalt">
              {formatBRL(total)}
            </p>

            <div className="mt-5">
              <QRCode value={pix?.copia_cola || "FASTPASS"} size={196} label="Escaneie no app do banco" />
            </div>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-warning/15 px-4 py-2 text-[13px] font-semibold text-[#B4761E]">
              <Clock size={15} /> Expira em {mm}:{ss}
            </div>

            {/* copia e cola */}
            <div className="mt-5 w-full">
              <p className="mb-1.5 text-left text-[12px] font-medium text-muted">
                Pix copia e cola
              </p>
              <div className="flex items-center gap-2 rounded-[14px] border border-line bg-cobalt-tint/40 p-3">
                <span className="min-w-0 flex-1 truncate text-left font-mono text-[12px] text-ink/80">
                  {pix?.copia_cola}
                </span>
                <button
                  type="button"
                  onClick={copiar}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-cobalt px-3 py-2 text-[13px] font-semibold text-white"
                >
                  {copiado ? <Check size={15} /> : <Copy size={15} />}
                  {copiado ? "Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            {pix?.simulado && (
              <p className="mt-4 max-w-[300px] text-[12px] leading-relaxed text-muted">
                Modo demonstração: o pagamento é confirmado automaticamente em
                alguns segundos.
              </p>
            )}
          </>
        )}
      </div>
    </MobileShell>
  );
}
