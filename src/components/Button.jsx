import { useMemo } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-cobalt text-white hover:bg-cobalt-dark active:bg-cobalt-dark disabled:bg-cobalt/40",
  soft: "bg-cobalt-soft text-cobalt-dark hover:bg-cobalt-soft/70 disabled:opacity-50",
  ghost: "bg-transparent text-cobalt hover:bg-cobalt-tint disabled:opacity-40",
};

export default function Button({
  as = "button",
  variant = "primary",
  icon: Icon,
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  const MotionComponent = useMemo(() => motion.create(as), [as]);

  return (
    <MotionComponent
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`tap-target inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-body font-semibold text-[15px] transition-colors duration-150 disabled:cursor-not-allowed ${
        variants[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {Icon ? <Icon size={19} strokeWidth={2} aria-hidden="true" /> : null}
      {children}
    </MotionComponent>
  );
}
