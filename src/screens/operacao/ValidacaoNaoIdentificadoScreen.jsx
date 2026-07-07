import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, RotateCw, QrCode, ClipboardCheck } from "lucide-react";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ValidacaoNaoIdentificadoScreen() {
  const navigate = useNavigate();
  const { contagem, total } = useOperacao();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <p className="text-center text-[13px] font-semibold text-white/50">
        {contagem.embarcados}/{total} embarcados
      </p>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-danger"
        >
          <X size={48} strokeWidth={3} className="text-white" />
        </motion.span>
        <h1 className="mt-6 font-display text-[26px] font-medium">Não identificado</h1>
        <p className="mt-2 max-w-[290px] text-[15px] leading-relaxed text-white/70">
          Não foi possível confirmar o rosto. Tente de novo ou use outro método.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="soft" icon={RotateCw} fullWidth onClick={() => navigate("/operacao/pedidos")}>
          Tentar novamente
        </Button>
        <Button
          variant="ghost"
          icon={QrCode}
          fullWidth
          onClick={() => navigate("/operacao/qr")}
          className="!text-white hover:!bg-white/10"
        >
          Ler QR Code
        </Button>
        <Button
          variant="ghost"
          icon={ClipboardCheck}
          fullWidth
          onClick={() => navigate("/operacao/manual")}
          className="!text-white hover:!bg-white/10"
        >
          Conferência manual
        </Button>
      </div>
    </div>
  );
}
