import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

function Resumo({ label, value, tone = "text-ink" }) {
  return (
    <div className="rounded-2xl border border-line p-4 text-center">
      <p className={`font-display text-[24px] font-semibold ${tone}`}>{value}</p>
      <p className="mt-0.5 text-[12px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

export default function EmbarqueConcluidoScreen() {
  const navigate = useNavigate();
  const { contagem, total, excursaoNome, reiniciar } = useOperacao();
  const ausentes = total - contagem.embarcados;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <SuccessCheck size={100} />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-7 font-display text-[28px] font-medium text-ink"
        >
          Embarque encerrado
        </motion.h1>
        <p className="mt-2 text-[15px] text-muted">{excursaoNome ?? "Viagem"}</p>

        <div className="mt-8 grid w-full grid-cols-2 gap-3">
          <Resumo label="Embarcados" value={contagem.embarcados} tone="text-success" />
          <Resumo label="Ausentes" value={ausentes} tone="text-danger" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            reiniciar();
            navigate("/operacao");
          }}
        >
          Liberar saída
        </Button>
      </div>
    </div>
  );
}
