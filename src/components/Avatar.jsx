// Avatar com iniciais — sem foto, mantém a paleta cobalto.
function iniciais(nome) {
  const partes = nome.trim().split(/\s+/);
  return (partes[0][0] + (partes[1]?.[0] ?? "")).toUpperCase();
}

const sizes = {
  sm: "h-9 w-9 text-[12px]",
  md: "h-11 w-11 text-[14px]",
  lg: "h-14 w-14 text-[18px]",
};

export default function Avatar({ nome, size = "md", tone = "tint", className = "" }) {
  const styles =
    tone === "solid"
      ? "bg-cobalt text-white"
      : "bg-cobalt-tint text-cobalt-dark";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${sizes[size]} ${styles} ${className}`}
      aria-hidden="true"
    >
      {iniciais(nome)}
    </span>
  );
}
