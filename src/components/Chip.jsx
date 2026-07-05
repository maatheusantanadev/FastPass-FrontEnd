// Chip de filtro selecionável (pílula).
export default function Chip({ active = false, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`tap-target shrink-0 rounded-full border px-4 text-[13px] font-medium transition-colors duration-150 ${
        active
          ? "border-cobalt bg-cobalt text-white"
          : "border-line bg-white text-muted hover:border-cobalt-soft"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
