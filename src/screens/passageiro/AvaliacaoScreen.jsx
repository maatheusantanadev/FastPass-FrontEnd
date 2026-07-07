import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import StarRating from "../../components/StarRating.jsx";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import Button from "../../components/Button.jsx";

export default function AvaliacaoScreen() {
  const navigate = useNavigate();
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <MobileShell
        footer={
          <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button variant="primary" fullWidth onClick={() => navigate("/app/explorar")}>
              Voltar ao início
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-center px-6 pb-6 pt-[max(2.5rem,env(safe-area-inset-top))] text-center">
          <SuccessCheck size={84} />
          <h1 className="mt-6 font-display text-[26px] font-medium text-ink">
            Obrigado pela avaliação!
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            Sua opinião ajuda a melhorar as próximas viagens.
          </p>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell
      header={<AppHeader title="Avaliar viagem" subtitle="Praia do Forte · 15 jul" />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant="primary"
            fullWidth
            disabled={nota === 0}
            onClick={() => setEnviado(true)}
          >
            Enviar avaliação
          </Button>
        </div>
      }
    >
      <div className="px-5 py-8">
        <p className="text-center font-display text-[19px] font-medium text-ink">
          Como foi sua viagem?
        </p>
        <div className="mt-6">
          <StarRating value={nota} onChange={setNota} />
        </div>

        <label className="mt-8 block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink/80">
            Deixe um comentário (opcional)
          </span>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            placeholder="Conte como foi o passeio, o motorista, o embarque…"
            className="w-full resize-none rounded-[14px] border border-line bg-cobalt-tint/50 p-4 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
          />
        </label>
      </div>
    </MobileShell>
  );
}
