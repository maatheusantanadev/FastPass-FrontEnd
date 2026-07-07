import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Armchair, MapPin } from "lucide-react";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import Avatar from "../../components/Avatar.jsx";
import MethodPill from "../../components/MethodPill.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ValidacaoAprovadoScreen() {
  const navigate = useNavigate();
  const { ultimo, contagem, total, excursaoNome } = useOperacao();
  const destino = excursaoNome ?? "Viagem em andamento";

  const p = ultimo ?? {
    nome: "Passageiro",
    cpf: "000.***.***-00",
    assento: "—",
    metodo: "facial",
    horario: "--:--",
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <p className="text-center text-[13px] font-semibold text-white/50">
        {contagem.embarcados}/{total} embarcados
      </p>

      <div className="flex flex-1 flex-col items-center justify-center">
        <SuccessCheck size={92} />
        <h1 className="mt-6 font-display text-[26px] font-medium">Embarque confirmado</h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 w-full rounded-2xl bg-white/5 p-4"
        >
          <div className="flex items-center gap-3">
            <Avatar nome={p.nome} size="lg" className="bg-white/15 text-white" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[18px] font-medium">{p.nome}</p>
              <p className="text-[13px] text-white/60">CPF {p.cpf}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-3 text-[13px] text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Armchair size={14} /> Assento {p.assento}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {destino}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <MethodPill metodo={p.metodo} />
            <span className="text-[13px] text-white/50">às {p.horario}</span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="soft" fullWidth onClick={() => navigate("/operacao/pedidos")}>
          Próximo passageiro
        </Button>
        <button
          type="button"
          onClick={() => navigate("/operacao/lista")}
          className="tap-target text-[14px] font-medium text-white/80 hover:text-white"
        >
          Ver lista
        </button>
      </div>
    </div>
  );
}
