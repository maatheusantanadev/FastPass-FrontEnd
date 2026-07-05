import { useNavigate } from "react-router-dom";
import { ScanFace, QrCode, ClipboardCheck, X } from "lucide-react";

// Layout imersivo das telas de câmera da operação (fundo escuro, tela cheia).
const modos = [
  { id: "facial", label: "Face ID", icon: ScanFace, to: "/operacao/facial" },
  { id: "qr", label: "QR Code", icon: QrCode, to: "/operacao/qr" },
  { id: "manual", label: "Manual", icon: ClipboardCheck, to: "/operacao/manual" },
];

export default function CameraLayout({ modo, embarcados, total, legenda, children, rodape }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-night text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:overflow-hidden sm:rounded-[34px] sm:shadow-phone">
      {/* topo: fechar + contador */}
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => navigate("/operacao")}
          aria-label="Encerrar câmera"
          className="tap-target flex items-center justify-center rounded-full bg-white/10 text-white/80"
        >
          <X size={20} />
        </button>
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold">
          {embarcados}/{total} embarcados
        </span>
      </div>

      {/* área da câmera */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        {children}
        {legenda && (
          <p className="mt-8 max-w-[280px] text-center text-[15px] leading-relaxed text-white/80">
            {legenda}
          </p>
        )}
        {rodape}
      </div>

      {/* barra de modos */}
      <div className="px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-2 rounded-2xl bg-white/10 p-1.5">
          {modos.map((m) => {
            const Icon = m.icon;
            const ativo = m.id === modo;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => navigate(m.to)}
                aria-pressed={ativo}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 text-[12px] font-semibold transition-colors ${
                  ativo ? "bg-white text-cobalt-dark" : "text-white/70"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
