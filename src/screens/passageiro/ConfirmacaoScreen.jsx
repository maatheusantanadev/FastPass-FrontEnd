import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import QRCode from "../../components/QRCode.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";
import { usuario } from "../../data/passageiros.js";
import { formatBRL } from "../../utils/format.js";

export default function ConfirmacaoScreen() {
  const navigate = useNavigate();
  const { excursao, assento, totais } = usePedido();

  return (
    <MobileShell
      footer={
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" fullWidth onClick={() => navigate("/app/viagens")}>
            Ver minhas viagens
          </Button>
          <Button variant="ghost" icon={Share2} fullWidth>
            Compartilhar bilhete
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center px-6 pb-6 pt-[max(2rem,env(safe-area-inset-top))] text-center">
        <SuccessCheck size={84} />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-6 font-display text-[26px] font-medium text-ink"
        >
          Compra confirmada!
        </motion.h1>
        <p className="mt-2 text-[15px] text-muted">
          {excursao.destino} · {excursao.data}
        </p>

        <div className="mt-6 w-full rounded-2xl border border-line bg-cobalt-tint/30 p-4 text-left text-[14px]">
          <div className="flex justify-between py-1">
            <span className="text-muted">Passageiro</span>
            <span className="font-medium text-ink">{usuario.nomeCompleto}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Assento</span>
            <span className="font-medium text-ink">{assento ?? "—"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted">Total pago</span>
            <span className="font-semibold text-ink">{formatBRL(totais.total)}</span>
          </div>
        </div>

        <div className="mt-6">
          <QRCode value={`FASTPASS|${usuario.codigoEmbarque}|${excursao.id}`} size={188} label="Bilhete de embarque" />
        </div>
      </div>
    </MobileShell>
  );
}
