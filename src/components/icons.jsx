// Ícones próprios (não existem no lucide) — traço consistente com o lucide.
export function Steering({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 14.4V21" />
      <path d="M10.1 11 4.2 8.4" />
      <path d="M13.9 11l5.9 -2.6" />
    </svg>
  );
}
