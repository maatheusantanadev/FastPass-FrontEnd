import { Steering } from "./icons.jsx";

// Mapa de assentos do ônibus: livre / ocupado / selecionado (por cor).
// Layout 2+2 com corredor central.
function buildRows(rows) {
  const letters = ["A", "B", "C", "D"];
  return Array.from({ length: rows }, (_, r) =>
    letters.map((l) => `${r + 1}${l}`)
  );
}

function Seat({ id, state, onSelect }) {
  const base =
    "flex h-9 w-9 items-center justify-center rounded-[10px] text-[11px] font-semibold transition-colors";
  const styles = {
    livre: "border border-line bg-white text-muted hover:border-cobalt",
    ocupado: "bg-line text-muted/70 cursor-not-allowed",
    selecionado: "bg-cobalt text-white shadow-card",
  };
  return (
    <button
      type="button"
      disabled={state === "ocupado"}
      onClick={() => onSelect(id)}
      aria-label={`Assento ${id} — ${state}`}
      aria-pressed={state === "selecionado"}
      className={`${base} ${styles[state]}`}
    >
      {id}
    </button>
  );
}

export default function SeatMap({ rows = 8, ocupados = [], value, onSelect }) {
  const grid = buildRows(rows);
  const occSet = new Set(ocupados);

  const stateOf = (id) =>
    id === value ? "selecionado" : occSet.has(id) ? "ocupado" : "livre";

  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div className="rounded-[26px] border border-line bg-cobalt-tint/40 p-4">
        {/* frente do ônibus */}
        <div className="mb-4 flex items-center justify-between px-1 text-muted">
          <Steering className="h-6 w-6" />
          <span className="text-[11px] font-medium uppercase tracking-wide">
            Frente
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {grid.map((row, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex gap-2">
                <Seat id={row[0]} state={stateOf(row[0])} onSelect={onSelect} />
                <Seat id={row[1]} state={stateOf(row[1])} onSelect={onSelect} />
              </div>
              <span className="w-5 text-center text-[10px] text-muted/60">
                {i + 1}
              </span>
              <div className="flex gap-2">
                <Seat id={row[2]} state={stateOf(row[2])} onSelect={onSelect} />
                <Seat id={row[3]} state={stateOf(row[3])} onSelect={onSelect} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* legenda */}
      <div className="mt-4 flex items-center justify-center gap-4 text-[12px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded border border-line bg-white" /> Livre
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-line" /> Ocupado
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded bg-cobalt" /> Selecionado
        </span>
      </div>
    </div>
  );
}
