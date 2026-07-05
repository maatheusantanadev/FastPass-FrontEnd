// Selo de status: sucesso (verde) / pendente (âmbar) / negado (vermelho) / neutro.
const tones = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-[#B4761E]",
  danger: "bg-danger/10 text-danger",
  cobalt: "bg-cobalt-tint text-cobalt-dark",
  neutral: "bg-line/70 text-muted",
};

export default function Badge({ tone = "neutral", icon: Icon, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${tones[tone]} ${className}`}
    >
      {Icon && <Icon size={13} strokeWidth={2.4} aria-hidden="true" />}
      {children}
    </span>
  );
}
