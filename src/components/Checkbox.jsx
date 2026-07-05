import { useId } from "react";
import { Check } from "lucide-react";

// Checkbox acessível com visual da marca.
export default function Checkbox({ checked, onChange, children, className = "" }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 ${className}`}
    >
      <span className="relative mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-cobalt peer-focus-visible:ring-offset-2 ${
            checked ? "border-cobalt bg-cobalt" : "border-line bg-white"
          }`}
        >
          {checked && <Check size={15} strokeWidth={3} className="text-white" />}
        </span>
      </span>
      <span className="text-[14px] leading-relaxed text-ink/80">{children}</span>
    </label>
  );
}
