import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Header padrão das telas internas do passageiro: voltar + título opcional.
export default function AppHeader({
  title,
  subtitle,
  onBack,
  right,
  tone = "light",
  border = true,
}) {
  const navigate = useNavigate();
  const isDark = tone === "dark";

  return (
    <header
      className={`flex items-center gap-2 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] ${
        border ? (isDark ? "border-b border-white/10" : "border-b border-line") : ""
      } ${isDark ? "bg-night text-white" : "bg-white text-ink"}`}
    >
      <button
        type="button"
        onClick={onBack || (() => navigate(-1))}
        aria-label="Voltar"
        className={`tap-target -ml-2 flex items-center justify-center rounded-full ${
          isDark ? "text-white/80 hover:bg-white/10" : "text-ink hover:bg-cobalt-tint"
        }`}
      >
        <ChevronLeft size={24} strokeWidth={2} />
      </button>
      <div className="min-w-0 flex-1">
        {title && (
          <h1 className="truncate font-display text-[19px] font-medium leading-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            className={`truncate text-[13px] ${
              isDark ? "text-white/60" : "text-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </header>
  );
}
