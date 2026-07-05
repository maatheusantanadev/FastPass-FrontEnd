import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, QrCode, Check } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Button from "../../components/Button.jsx";

const opcoes = [
  {
    id: "facial",
    icon: ScanFace,
    titulo: "Reconhecimento facial",
    apoio: "O operador aponta a câmera e você embarca em segundos.",
    recomendado: true,
  },
  {
    id: "qr",
    icon: QrCode,
    titulo: "QR Code",
    apoio: "Mostre seu código na tela. Funciona offline.",
    recomendado: false,
  },
];

export default function EmbarqueScreen() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("facial");

  return (
    <MobileShell
      header={<AppHeader title="Embarque" subtitle="Praia do Forte · 15 jul" />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" fullWidth onClick={() => navigate("/app/rastreamento")}>
            Apresentar ao operador
          </Button>
        </div>
      }
    >
      <div className="px-5 py-5">
        <p className="mb-5 text-[15px] leading-relaxed text-muted">
          Escolha como quer embarcar na porta do ônibus. Você pode alternar a
          qualquer momento.
        </p>

        <div className="flex flex-col gap-3">
          {opcoes.map((op) => {
            const Icon = op.icon;
            const ativo = metodo === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setMetodo(op.id)}
                aria-pressed={ativo}
                className={`flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                  ativo ? "border-cobalt bg-cobalt-tint/40" : "border-line bg-white"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    ativo ? "bg-cobalt text-white" : "bg-cobalt-tint text-cobalt-dark"
                  }`}
                >
                  <Icon size={22} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-[16px] font-semibold text-ink">
                      {op.titulo}
                    </p>
                    {op.recomendado && (
                      <span className="rounded-full bg-cobalt px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-muted">{op.apoio}</p>
                </div>
                <span
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                    ativo ? "border-cobalt bg-cobalt text-white" : "border-line"
                  }`}
                >
                  {ativo && <Check size={14} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}
