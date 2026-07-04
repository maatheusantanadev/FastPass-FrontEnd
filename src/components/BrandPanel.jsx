export default function BrandPanel({ children }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white sm:flex-row sm:items-center sm:justify-center sm:gap-20 sm:bg-cobalt sm:px-10 sm:py-10">
      {/* Painel de marca — só em telas largas */}
      <aside className="hidden lg:block lg:max-w-[380px]">
        <p className="font-display text-3xl font-light tracking-tight text-white">
          FastPass
        </p>
        <p className="mt-2 font-body text-[10px] font-bold uppercase tracking-badge text-white/60">
          Face ID
        </p>
        <h2 className="mt-12 font-display text-[28px] font-medium leading-snug text-white">
          Da compra da passagem ao embarque, tudo em um só lugar.
        </h2>
        <p className="mt-4 font-body text-[15px] leading-relaxed text-white/70">
          Reconhecimento facial, QR Code e presença automática. Embarque em
          segundos.
        </p>
      </aside>

      <div className="flex w-full flex-1 flex-col bg-white px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(3.5rem,env(safe-area-inset-top))] sm:w-[420px] sm:flex-none sm:rounded-[28px] sm:px-8 sm:py-10 sm:shadow-[0_30px_80px_-20px_rgba(14,19,48,0.45)]">
        {children}
      </div>
    </div>
  );
}
