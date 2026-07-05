import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Clock, Flag } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import RouteMap from "../../components/RouteMap.jsx";
import Button from "../../components/Button.jsx";

export default function RastreamentoScreen() {
  const navigate = useNavigate();

  return (
    <MobileShell
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" fullWidth onClick={() => navigate("/app/avaliacao")}>
            Avaliar viagem
          </Button>
        </div>
      }
    >
      <div className="px-5 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
        {/* confirmação */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex items-center gap-3 rounded-2xl bg-success/10 p-4"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success text-white">
            <Check size={22} strokeWidth={3} />
          </span>
          <div>
            <p className="font-display text-[18px] font-medium text-ink">
              Embarque confirmado
            </p>
            <p className="text-[13px] text-muted">Assento 12A · Face ID · 06:12</p>
          </div>
        </motion.div>

        <RouteMap origem="Salvador" destino="Praia do Forte" />

        {/* ETA */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line p-4">
            <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wide text-muted">
              <Clock size={13} /> Saída
            </span>
            <p className="mt-1 font-display text-[20px] font-semibold text-ink">06:30</p>
            <p className="text-[12px] text-muted">no horário</p>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-wide text-muted">
              <Flag size={13} /> Chegada
            </span>
            <p className="mt-1 font-display text-[20px] font-semibold text-ink">08:05</p>
            <p className="text-[12px] text-success">ETA estimada</p>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
