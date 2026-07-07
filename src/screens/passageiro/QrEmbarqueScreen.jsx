import { useNavigate } from "react-router-dom";
import { WifiOff } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import QRCode from "../../components/QRCode.jsx";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function QrEmbarqueScreen() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const identificador = usuario?.email ?? usuario?.name ?? "FASTPASS";

  return (
    <MobileShell
      header={<AppHeader title="QR Code de embarque" />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" fullWidth onClick={() => navigate("/conta-criada")}>
            Continuar
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center px-6 py-8 text-center">
        <QRCode value={`FASTPASS|${identificador}`} size={208} label={identificador} />

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-cobalt-tint px-4 py-2 text-[13px] font-medium text-cobalt-dark">
          <WifiOff size={15} strokeWidth={2} />
          Sua alternativa de embarque, offline
        </div>

        <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-muted">
          Cada passagem gera um QR Code próprio nas suas viagens. O motorista lê
          o código na porta do ônibus para validar o seu embarque.
        </p>
      </div>
    </MobileShell>
  );
}
