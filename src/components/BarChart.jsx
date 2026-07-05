import { motion } from "framer-motion";

// Gráfico de barras desenhado à mão (CSS) — paleta cobalto, sem cara de lib.
export default function BarChart({ data, unit = "" }) {
  const max = Math.max(...data.map((d) => d.valor), 1);

  return (
    <div className="flex h-44 items-stretch justify-between gap-2">
      {data.map((d, i) => {
        const h = (d.valor / max) * 100;
        const destaque = d.valor === max;
        return (
          <div key={d.dia} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end justify-center">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[26px] rounded-t-md ${
                  destaque ? "bg-cobalt" : "bg-cobalt-soft"
                }`}
                title={`${d.valor}${unit}`}
              />
            </div>
            <span className="text-[11px] text-muted">{d.dia}</span>
          </div>
        );
      })}
    </div>
  );
}
