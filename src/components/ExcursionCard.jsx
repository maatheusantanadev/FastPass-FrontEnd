import { Link } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import Scene from "./Scene.jsx";
import { formatBRL } from "../utils/format.js";

// Card de excursão: hero geométrico + destino, data, vagas e preço.
export default function ExcursionCard({ excursao }) {
  const poucasVagas = excursao.vagas <= 5;

  return (
    <Link
      to={`/app/excursao/${excursao.id}`}
      className="block overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-transform duration-150 active:scale-[0.99]"
    >
      <div className="relative h-32">
        <Scene variant={excursao.cena} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-cobalt-dark">
          {excursao.duracao}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-[18px] font-medium text-ink">
          {excursao.destino}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} strokeWidth={2} aria-hidden="true" />
            {excursao.data}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} strokeWidth={2} aria-hidden="true" />
            <span className={poucasVagas ? "font-semibold text-warning" : ""}>
              {excursao.vagas} vagas
            </span>
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p className="font-display text-[20px] font-semibold text-cobalt">
            {formatBRL(excursao.preco)}
          </p>
          <span className="text-[12px] text-muted">por pessoa</span>
        </div>
      </div>
    </Link>
  );
}
