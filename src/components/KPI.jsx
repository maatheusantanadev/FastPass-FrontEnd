// Cartão de indicador (KPI) — usado na operação e no admin.
export default function KPI({ label, value, sub, icon: Icon, tone = "default" }) {
  const accent =
    tone === "cobalt"
      ? "bg-cobalt text-white"
      : "border border-line bg-white text-ink";
  const labelColor = tone === "cobalt" ? "text-white/70" : "text-muted";
  const subColor = tone === "cobalt" ? "text-white/70" : "text-muted";

  return (
    <div className={`rounded-2xl p-4 ${accent}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[12px] font-medium ${labelColor}`}>{label}</span>
        {Icon && (
          <Icon
            size={16}
            strokeWidth={2}
            className={tone === "cobalt" ? "text-white/70" : "text-cobalt"}
            aria-hidden="true"
          />
        )}
      </div>
      <p className="mt-2 font-display text-[26px] font-semibold leading-none">
        {value}
      </p>
      {sub && <p className={`mt-1.5 text-[12px] ${subColor}`}>{sub}</p>}
    </div>
  );
}
