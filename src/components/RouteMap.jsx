import { useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

// Mini-mapa estilizado (SVG) com a rota e o ônibus em movimento.
// Sem SDK de mapa — apenas ilustração da viagem.
export default function RouteMap({ origem = "Salvador", destino = "Praia do Forte" }) {
  const reduce = useReducedMotion();
  const path = "M40 176 C120 120 150 60 236 78 S360 150 372 60";

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-cobalt-tint/40">
      <svg viewBox="0 0 400 220" className="h-full w-full">
        {/* malha viária de fundo */}
        <g stroke="#E7EAF6" strokeWidth="2">
          <path d="M0 60 H400" />
          <path d="M0 130 H400" />
          <path d="M120 0 V220" />
          <path d="M280 0 V220" />
        </g>

        {/* rota */}
        <path d={path} fill="none" stroke="#C9D4FF" strokeWidth="6" strokeLinecap="round" />
        <path
          d={path}
          fill="none"
          stroke="#2B50FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 14"
        />

        {/* pontos de origem e destino */}
        <circle cx="40" cy="176" r="7" fill="#1E3AD6" />
        <circle cx="372" cy="60" r="7" fill="#16B26A" />

        {/* ônibus em movimento */}
        <g>
          <circle r="9" fill="#2B50FF" stroke="#fff" strokeWidth="3">
            {!reduce && (
              <animateMotion dur="7s" repeatCount="indefinite" rotate="0" path={path} />
            )}
          </circle>
          {reduce && <circle cx="236" cy="78" r="9" fill="#2B50FF" stroke="#fff" strokeWidth="3" />}
        </g>
      </svg>

      <div className="flex items-center justify-between border-t border-line bg-white px-4 py-2.5 text-[13px]">
        <span className="inline-flex items-center gap-1.5 text-muted">
          <MapPin size={14} className="text-cobalt-dark" /> {origem}
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
          {destino} <MapPin size={14} className="text-success" />
        </span>
      </div>
    </div>
  );
}
