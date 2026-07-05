import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import SeatMap from "../../components/SeatMap.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";

const ocupados = ["1A", "1B", "2C", "3A", "3B", "4D", "5A", "6B", "6C", "7D", "8A"];

export default function AssentosScreen() {
  const navigate = useNavigate();
  const { excursao, assento, setAssento } = usePedido();
  const [selecionado, setSelecionado] = useState(assento);

  function confirmar() {
    setAssento(selecionado);
    navigate("/app/passeios");
  }

  return (
    <MobileShell
      header={<AppHeader title="Escolha seu assento" subtitle={excursao.destino} />}
      footer={
        <div className="flex items-center gap-4 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="min-w-[92px]">
            <p className="text-[12px] text-muted">Assento</p>
            <p className="font-display text-[22px] font-semibold text-ink">
              {selecionado ?? "—"}
            </p>
          </div>
          <Button
            variant="primary"
            className="flex-1"
            disabled={!selecionado}
            onClick={confirmar}
          >
            Confirmar assento
          </Button>
        </div>
      }
    >
      <div className="px-5 py-6">
        <SeatMap
          rows={8}
          ocupados={ocupados}
          value={selecionado}
          onSelect={setSelecionado}
        />
      </div>
    </MobileShell>
  );
}
