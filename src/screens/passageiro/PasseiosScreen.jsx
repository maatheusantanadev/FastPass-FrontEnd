import { useNavigate } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import Scene from "../../components/Scene.jsx";
import Button from "../../components/Button.jsx";
import { passeiosExtras } from "../../data/excursoes.js";
import { usePedido } from "../../context/PedidoContext.jsx";
import { formatBRL } from "../../utils/format.js";

export default function PasseiosScreen() {
  const navigate = useNavigate();
  const { extras, toggleExtra, totais } = usePedido();

  const selecionadoId = (id) => extras.some((e) => e.id === id);

  return (
    <MobileShell
      header={<AppHeader title="Passeios adicionais" subtitle="Opcional" />}
      footer={
        <div className="flex items-center gap-4 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="min-w-[96px]">
            <p className="text-[12px] text-muted">Extras</p>
            <p className="font-display text-[20px] font-semibold text-ink">
              {formatBRL(totais.extrasTotal)}
            </p>
          </div>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate("/app/resumo")}
          >
            {extras.length ? "Adicionar ao pedido" : "Pular"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3 px-5 py-5">
        <p className="text-[15px] leading-relaxed text-muted">
          Turbine sua viagem. Você pode seguir sem nenhum extra.
        </p>
        {passeiosExtras.map((item) => {
          const on = selecionadoId(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleExtra(item)}
              aria-pressed={on}
              className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                on ? "border-cobalt bg-cobalt-tint/50" : "border-line bg-white"
              }`}
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <Scene variant={item.cena} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[15px] font-semibold text-ink">
                  {item.nome}
                </p>
                <p className="text-[13px] text-muted">{item.descricao}</p>
                <p className="mt-0.5 text-[14px] font-semibold text-cobalt">
                  {formatBRL(item.preco)}
                </p>
              </div>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  on ? "bg-cobalt text-white" : "bg-cobalt-tint text-cobalt"
                }`}
              >
                {on ? <Check size={17} strokeWidth={3} /> : <Plus size={17} strokeWidth={2.4} />}
              </span>
            </button>
          );
        })}
      </div>
    </MobileShell>
  );
}
