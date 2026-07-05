import { QRCodeSVG } from "qrcode.react";

// QR real (qrcode.react) na moldura da marca — cantoneiras cobalto.
export default function QRCode({ value, size = 200, label, className = "" }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div className="relative rounded-[22px] bg-white p-5 shadow-card ring-1 ring-line">
        {/* cantoneiras — eco da moldura de scan da marca */}
        <span className="absolute left-2.5 top-2.5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-cobalt" />
        <span className="absolute right-2.5 top-2.5 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-cobalt" />
        <span className="absolute bottom-2.5 left-2.5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-cobalt" />
        <span className="absolute bottom-2.5 right-2.5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-cobalt" />
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          bgColor="#FFFFFF"
          fgColor="#0E1330"
        />
      </div>
      {label && (
        <p className="mt-3 font-body text-[13px] font-semibold tracking-[0.18em] text-muted">
          {label}
        </p>
      )}
    </div>
  );
}
