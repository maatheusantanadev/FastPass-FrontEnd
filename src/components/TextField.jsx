import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function TextField({
  label,
  icon: Icon,
  error,
  type = "text",
  hint,
  className = "",
  ...props
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-ink/80"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
        )}
        <input
          id={id}
          type={inputType}
          className={`h-[52px] w-full rounded-[14px] border bg-cobalt-tint/60 font-body text-[15px] text-ink placeholder:text-muted/70 transition-colors duration-150 focus:bg-white focus:border-cobalt focus:outline-none ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-12" : "pr-4"} ${
            error ? "border-red-400" : "border-line"
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="tap-target absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-ink"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2} />
            ) : (
              <Eye size={18} strokeWidth={2} />
            )}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
