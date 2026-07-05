import { motion, useReducedMotion } from "framer-motion";

// Check de sucesso animado (círculo + traço). Verde da marca.
export default function SuccessCheck({ size = 88, tone = "success" }) {
  const reduce = useReducedMotion();
  const ring = size;
  const color = tone === "danger" ? "#E5484D" : "#16B26A";

  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: ring, height: ring }}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: color, opacity: 0.15 }}
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.span
        className="flex items-center justify-center rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
        initial={reduce ? false : { scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          />
        </svg>
      </motion.span>
    </span>
  );
}
