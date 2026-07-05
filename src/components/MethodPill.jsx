import { ScanFace, QrCode, ClipboardCheck } from "lucide-react";

// Selo do método de embarque — consistente nas 3 superfícies.
export const metodos = {
  facial: { rotulo: "Face ID", icon: ScanFace },
  qr: { rotulo: "QR Code", icon: QrCode },
  manual: { rotulo: "Manual", icon: ClipboardCheck },
};

export default function MethodPill({ metodo, size = "md", className = "" }) {
  const info = metodos[metodo];
  if (!info) return null;
  const Icon = info.icon;
  const small = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-cobalt-tint font-semibold text-cobalt-dark ${
        small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      } ${className}`}
    >
      <Icon size={small ? 12 : 14} strokeWidth={2.2} aria-hidden="true" />
      {info.rotulo}
    </span>
  );
}
