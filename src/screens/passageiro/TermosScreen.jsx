import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Checkbox from "../../components/Checkbox.jsx";
import Button from "../../components/Button.jsx";

export default function TermosScreen() {
  const navigate = useNavigate();
  const [aceito, setAceito] = useState(false);
  const [dados, setDados] = useState(false);
  const pronto = aceito && dados;

  return (
    <MobileShell
      header={<AppHeader title="Termos e privacidade" />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant="primary"
            fullWidth
            disabled={!pronto}
            onClick={() => navigate("/permissoes")}
          >
            Aceitar e continuar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-5 px-5 py-5">
        <p className="text-[15px] leading-relaxed text-muted">
          Antes de embarcar, revise como a FastPass usa seus dados para o
          reconhecimento facial e a gestão da viagem.
        </p>

        <div className="max-h-72 overflow-y-auto rounded-2xl border border-line bg-cobalt-tint/30 p-4 text-[13px] leading-relaxed text-ink/75">
          <h2 className="font-display text-[15px] font-semibold text-ink">
            1. Uso dos dados biométricos
          </h2>
          <p className="mt-1.5">
            O cadastro facial é opcional e serve apenas para agilizar seu
            embarque. A imagem é convertida em um código e pode ser removida a
            qualquer momento no seu perfil.
          </p>
          <h2 className="mt-4 font-display text-[15px] font-semibold text-ink">
            2. Passagens e pagamentos
          </h2>
          <p className="mt-1.5">
            Compras via Pix e cartão são processadas para emissão do bilhete. O
            QR Code de embarque funciona offline como alternativa ao Face ID.
          </p>
          <h2 className="mt-4 font-display text-[15px] font-semibold text-ink">
            3. Localização durante a viagem
          </h2>
          <p className="mt-1.5">
            Usamos a localização apenas no dia da excursão, para mostrar o ônibus
            no mapa e avisar sobre o ponto de encontro.
          </p>
          <p className="mt-4 text-muted">
            Este é um resumo. Consulte os documentos completos para todos os
            detalhes.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 self-start text-[14px] font-semibold text-cobalt hover:text-cobalt-dark"
        >
          <FileText size={16} strokeWidth={2} />
          Ler documentos completos
        </button>

        <div className="flex flex-col gap-4 border-t border-line pt-5">
          <Checkbox checked={aceito} onChange={setAceito}>
            Li e aceito os <span className="font-semibold text-ink">Termos de Uso</span>.
          </Checkbox>
          <Checkbox checked={dados} onChange={setDados}>
            Autorizo o uso dos meus dados para embarque e gestão da viagem.
          </Checkbox>
        </div>
      </div>
    </MobileShell>
  );
}
