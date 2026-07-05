import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Bell, Check } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Button from "../../components/Button.jsx";

const permissoes = [
  {
    id: "camera",
    icon: Camera,
    titulo: "Câmera",
    apoio: "Para o Face ID e a leitura de QR Code.",
  },
  {
    id: "local",
    icon: MapPin,
    titulo: "Localização",
    apoio: "Rastrear o ônibus e o ponto de encontro no dia.",
  },
  {
    id: "notif",
    icon: Bell,
    titulo: "Notificações",
    apoio: "Avisos de embarque, pagamento e mudanças.",
  },
];

export default function PermissoesScreen() {
  const navigate = useNavigate();
  const [concedidas, setConcedidas] = useState({});

  function permitir(id) {
    setConcedidas((c) => ({ ...c, [id]: true }));
  }

  return (
    <MobileShell
      header={<AppHeader title="Permissões" />}
      footer={
        <div className="flex flex-col gap-2 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" fullWidth onClick={() => navigate("/faceid")}>
            Continuar
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate("/faceid")}>
            Agora não
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        <p className="mb-6 text-[15px] leading-relaxed text-muted">
          Libere os acessos para o embarque inteligente funcionar. Você pode
          mudar isso depois nas configurações.
        </p>

        <ul className="flex flex-col gap-3">
          {permissoes.map(({ id, icon: Icon, titulo, apoio }) => {
            const ok = concedidas[id];
            return (
              <li
                key={id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cobalt-tint text-cobalt-dark">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[15px] font-semibold text-ink">
                    {titulo}
                  </p>
                  <p className="text-[13px] leading-snug text-muted">{apoio}</p>
                </div>
                {ok ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-2 text-[13px] font-semibold text-success">
                    <Check size={15} strokeWidth={3} /> Ok
                  </span>
                ) : (
                  <Button
                    variant="soft"
                    onClick={() => permitir(id)}
                    className="px-4 py-2 text-[13px]"
                  >
                    Permitir
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </MobileShell>
  );
}
