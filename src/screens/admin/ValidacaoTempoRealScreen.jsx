import { useMemo } from "react";
import { Radio } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import BoardingRow from "../../components/BoardingRow.jsx";
import SeatMap from "../../components/SeatMap.jsx";
import MethodPill, { metodos } from "../../components/MethodPill.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ValidacaoTempoRealScreen() {
  const { lista, total, contagem, embarcar } = useOperacao();
  const pct = Math.round((contagem.embarcados / total) * 100);

  const ocupados = useMemo(
    () => lista.filter((p) => p.status === "embarcado").map((p) => p.assento),
    [lista]
  );

  const mix = useMemo(() => {
    const c = { facial: 0, qr: 0, manual: 0 };
    lista.forEach((p) => {
      if (p.metodo) c[p.metodo] += 1;
    });
    return c;
  }, [lista]);
  const mixTotal = mix.facial + mix.qr + mix.manual || 1;

  return (
    <DashboardShell
      title="Validação de embarque · tempo real"
      subtitle="Praia do Forte · Sr. Antônio"
      actions={
        <span className="hidden items-center gap-2 rounded-full bg-cobalt-tint px-3 py-1.5 text-[13px] font-semibold text-cobalt-dark sm:inline-flex">
          <Radio size={15} /> Ao vivo
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        {/* lista ao vivo */}
        <div className="rounded-2xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[17px] font-medium text-ink">
              Passageiros validados
            </h2>
            <span className="text-[14px] font-semibold text-cobalt">
              {contagem.embarcados}/{total}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-cobalt transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <ul className="mt-2 divide-y divide-line">
            {lista.map((p) => (
              <BoardingRow
                key={p.id}
                passageiro={p}
                action={
                  p.status !== "embarcado" ? (
                    <Button
                      variant="soft"
                      onClick={() => embarcar("manual", p.id)}
                      className="px-3 py-2 text-[13px]"
                    >
                      Confirmar manualmente
                    </Button>
                  ) : null
                }
              />
            ))}
          </ul>
        </div>

        {/* lateral: ocupação + mix */}
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="mb-4 font-display text-[17px] font-medium text-ink">
              Ocupação do ônibus
            </h2>
            <SeatMap rows={8} ocupados={ocupados} value={null} onSelect={() => {}} />
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="mb-4 font-display text-[17px] font-medium text-ink">
              Métodos usados
            </h2>
            <div className="space-y-3">
              {Object.keys(metodos).map((m) => (
                <div key={m}>
                  <div className="mb-1 flex items-center justify-between text-[13px]">
                    <MethodPill metodo={m} size="sm" />
                    <span className="font-semibold text-ink">{mix[m]}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-cobalt"
                      style={{ width: `${(mix[m] / mixTotal) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
