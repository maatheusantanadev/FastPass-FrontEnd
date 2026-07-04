const sizeMap = {
  sm: "text-3xl",
  md: "text-4xl",
  lg: "text-5xl sm:text-6xl",
};

export default function Wordmark({ tone = "light", size = "lg", className = "" }) {
  const textColor = tone === "light" ? "text-white" : "text-cobalt";
  const badgeColor = tone === "light" ? "text-white/70" : "text-cobalt/60";

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <span
        className={`font-display font-light ${sizeMap[size]} ${textColor} tracking-tight leading-none`}
      >
        FastPass
      </span>
      <span
        className={`font-body font-bold text-[11px] ${badgeColor} tracking-badge uppercase`}
      >
        Face ID
      </span>
    </div>
  );
}
