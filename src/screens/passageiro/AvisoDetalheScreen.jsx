import { useParams, useNavigate } from "react-router-dom";
import { Bus, CheckCircle2, MapPin, Ticket } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Button from "../../components/Button.jsx";
import { avisos } from "../../data/viagens.js";

const config = {
  embarque: {
    icon: Bus,
    tone: "bg-cobalt-tint text-cobalt-dark",
    detalhe:
      "Chegue com 20 minutos de antecedência ao Terminal da França. Tenha o Face ID ou o QR Code em mãos para agilizar o embarque.",
    acao: { label: "Ver minhas viagens", to: "/app/viagens" },
  },
  pagamento: {
    icon: CheckCircle2,
    tone: "bg-success/10 text-success",
    detalhe:
      "O pagamento foi aprovado e sua passagem está confirmada. O bilhete de embarque já está disponível nas suas viagens.",
    acao: { label: "Ver minhas viagens", to: "/app/viagens" },
  },
  local: {
    icon: MapPin,
    tone: "bg-warning/15 text-[#B4761E]",
    detalhe:
      "O ponto de encontro foi definido: portão 3 do terminal. O guia estará com a placa da FastPass a partir de 30 minutos antes da saída.",
    acao: { label: "Ver minhas viagens", to: "/app/viagens" },
  },
};

export default function AvisoDetalheScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const aviso = avisos.find((a) => a.id === id) ?? avisos[0];
  const info = config[aviso.tipo];
  const Icon = info.icon;

  return (
    <MobileShell
      header={<AppHeader title="Aviso" onBack={() => navigate("/app/avisos")} />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant="primary"
            icon={Ticket}
            fullWidth
            onClick={() => navigate(info.acao.to)}
          >
            {info.acao.label}
          </Button>
        </div>
      }
    >
      <div className="px-5 py-6">
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${info.tone}`}
        >
          <Icon size={26} strokeWidth={2} />
        </span>
        <h1 className="mt-5 font-display text-[23px] font-medium leading-tight text-ink">
          {aviso.titulo}
        </h1>
        <p className="mt-1 text-[13px] text-muted">{aviso.tempo}</p>

        <p className="mt-5 text-[15px] leading-relaxed text-ink/80">{aviso.texto}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{info.detalhe}</p>
      </div>
    </MobileShell>
  );
}
