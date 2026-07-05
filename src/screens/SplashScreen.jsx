import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Wordmark from "../components/Wordmark.jsx";

const cornerClasses = [
  "left-0 top-0 rounded-tl-2xl border-l-2 border-t-2",
  "right-0 top-0 rounded-tr-2xl border-r-2 border-t-2",
  "left-0 bottom-0 rounded-bl-2xl border-l-2 border-b-2",
  "right-0 bottom-0 rounded-br-2xl border-r-2 border-b-2",
];

export default function SplashScreen() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/onboarding"), 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex min-h-screen flex-col items-center justify-center gap-14 bg-cobalt px-6 safe-top safe-bottom"
    >
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden px-12 py-10"
      >
        {/* Moldura de leitura facial — assinatura da marca */}
        {cornerClasses.map((classes, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
            className={`absolute h-7 w-7 border-white/30 ${classes}`}
          />
        ))}

        {/* Varredura única, discreta */}
        {!reducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ top: "8%", opacity: 0 }}
            animate={{ top: ["8%", "88%"], opacity: [0, 0.5, 0.5, 0] }}
            transition={{ delay: 1.0, duration: 1.0, ease: "easeInOut" }}
            className="absolute left-4 right-4 h-px bg-white/40"
          />
        )}

        <Wordmark tone="light" size="lg" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center gap-2"
        role="status"
        aria-label="Carregando"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
            animate={reducedMotion ? { opacity: 0.7 } : { opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
