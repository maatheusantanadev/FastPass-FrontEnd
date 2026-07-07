import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import Button from "../../components/Button.jsx";
import { consultarPedido } from "../../api/embarque.js";

export default function AguardandoValidacaoScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("pendente"); // pendente | aprovado | reprovado

  const consultar = useCallback(async () => {
    try {
      const { pedido } = await consultarPedido(id);
      if (pedido?.status) setStatus(pedido.status);
    } catch {
      // mantém o status atual; tenta de novo no próximo ciclo
    }
  }, [id]);

  useEffect(() => {
    consultar();
    const intervalo = setInterval(consultar, 3000);
    return () => clearInterval(intervalo);
  }, [consultar]);

  const conteudo = {
    pendente: {
      icone: <Loader2 size={44} strokeWidth={3} className="animate-spin text-white" />,
      fundo: "bg-white/10",
      titulo: "Aguardando o motorista",
      texto: "Assim que ele comparar as fotos, seu embarque é confirmado aqui.",
    },
    aprovado: {
      icone: <Check size={44} strokeWidth={3} className="text-white" />,
      fundo: "bg-success",
      titulo: "Embarque confirmado!",
      texto: "Boa viagem! Você já pode entrar no ônibus.",
    },
    reprovado: {
      icone: <X size={44} strokeWidth={3} className="text-white" />,
      fundo: "bg-danger",
      titulo: "Não foi possível confirmar",
      texto: "As fotos não bateram. Tente enviar uma nova selfie.",
    },
  }[status];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={`flex h-24 w-24 items-center justify-center rounded-full ${conteudo.fundo}`}
        >
          {conteudo.icone}
        </motion.span>
        <h1 className="mt-6 font-display text-[26px] font-medium">{conteudo.titulo}</h1>
        <p className="mt-2 max-w-[290px] text-[15px] leading-relaxed text-white/70">
          {conteudo.texto}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {status === "aprovado" && (
          <Button variant="primary" fullWidth onClick={() => navigate("/app/viagens")}>
            Ver minhas viagens
          </Button>
        )}
        {status === "reprovado" && (
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate(`/app/embarque/${id}/facial`)}
          >
            Tentar novamente
          </Button>
        )}
        {status === "pendente" && (
          <Button
            variant="soft"
            fullWidth
            onClick={() => navigate(`/app/embarque/${id}`)}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
