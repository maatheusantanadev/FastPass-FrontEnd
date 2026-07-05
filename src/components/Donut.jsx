import { motion } from "framer-motion";

// Donut com stroke-dasharray — ocupação / proporção. Sem lib de gráfico.
export default function Donut({ value, size = 132, stroke = 14, label, caption }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.min(Math.max(value, 0), 1) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EEF1FF" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#2B50FF"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - dash }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[24px] font-semibold text-ink">
          {label ?? `${Math.round(value * 100)}%`}
        </span>
        {caption && <span className="text-[11px] text-muted">{caption}</span>}
      </div>
    </div>
  );
}
