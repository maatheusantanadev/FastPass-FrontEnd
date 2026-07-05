import { motion } from "framer-motion";

// Abas em pílula com indicador deslizante (framer-motion layoutId).
export default function PillTabs({ tabs, value, onChange, className = "" }) {
  return (
    <div
      className={`flex gap-1 rounded-full border border-line bg-cobalt-tint/60 p-1 ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={`tap-target relative flex-1 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              active ? "text-white" : "text-muted hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId="pilltab-active"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 -z-0 rounded-full bg-cobalt"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
