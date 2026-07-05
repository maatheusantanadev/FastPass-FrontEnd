import { Star } from "lucide-react";

// Avaliação por estrelas (controlada).
export default function StarRating({ value, onChange, size = 40 }) {
  return (
    <div className="flex items-center justify-center gap-2" role="radiogroup" aria-label="Nota">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
            onClick={() => onChange(n)}
            className="tap-target flex items-center justify-center rounded-full transition-transform active:scale-90"
          >
            <Star
              size={size}
              strokeWidth={1.6}
              className={filled ? "text-warning" : "text-line"}
              fill={filled ? "#E8A33D" : "transparent"}
            />
          </button>
        );
      })}
    </div>
  );
}
