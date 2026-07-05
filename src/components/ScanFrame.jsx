import { motion, useReducedMotion } from "framer-motion";
import { ScanFace } from "lucide-react";

// Viewport de câmera MOCKADO (sem getUserMedia). Toque simula a leitura.
// variant: "facial" (moldura circular) | "qr" (retículo quadrado).
export default function ScanFrame({
  variant = "facial",
  onCapture,
  scanning = true,
  size = 260,
}) {
  const reduce = useReducedMotion();
  const isFacial = variant === "facial";

  return (
    <button
      type="button"
      onClick={onCapture}
      aria-label={isFacial ? "Simular leitura facial" : "Simular leitura do QR"}
      className="relative flex items-center justify-center focus-visible:outline-none"
      style={{ width: size, height: size }}
    >
      {/* textura sutil de "câmera" ao fundo */}
      <div
        className={`absolute inset-0 ${
          isFacial ? "rounded-full" : "rounded-[28px]"
        } bg-white/[0.03]`}
      />

      {/* anéis pulsando */}
      {scanning &&
        !reduce &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className={`absolute ${
              isFacial ? "rounded-full" : "rounded-[32px]"
            } border border-cobalt-soft/40`}
            style={{ width: size, height: size }}
            initial={{ scale: 0.86, opacity: 0.5 }}
            animate={{ scale: 1.08, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}

      {/* moldura + cantoneiras */}
      {isFacial ? (
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-full border-2 border-white/70"
          style={{ width: size - 24, height: size - 24 }}
        >
          <ScanFace
            size={size * 0.5}
            strokeWidth={1}
            className="text-white/25"
            aria-hidden="true"
          />
          {scanning && (
            <motion.span
              className="absolute left-4 right-4 h-0.5 rounded bg-cobalt-soft shadow-[0_0_12px_2px_rgba(201,212,255,0.6)]"
              initial={{ top: "16%" }}
              animate={reduce ? { top: "50%" } : { top: ["16%", "84%", "16%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      ) : (
        <div
          className="relative overflow-hidden rounded-[26px]"
          style={{ width: size - 24, height: size - 24 }}
        >
          {["left-0 top-0 border-l-2 border-t-2 rounded-tl-xl",
            "right-0 top-0 border-r-2 border-t-2 rounded-tr-xl",
            "left-0 bottom-0 border-l-2 border-b-2 rounded-bl-xl",
            "right-0 bottom-0 border-r-2 border-b-2 rounded-br-xl",
          ].map((c) => (
            <span key={c} className={`absolute h-9 w-9 border-white/80 ${c}`} />
          ))}
          {scanning && (
            <motion.span
              className="absolute left-3 right-3 h-0.5 rounded bg-cobalt-soft shadow-[0_0_12px_2px_rgba(201,212,255,0.6)]"
              initial={{ top: "12%" }}
              animate={reduce ? { top: "50%" } : { top: ["12%", "88%", "12%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      )}
    </button>
  );
}
