// Shell mobile-first do app (passageiro + operação).
// Desktop: coluna ~430px centralizada sobre fundo cobalto, cara de app.
export default function MobileShell({
  header,
  footer,
  children,
  tone = "light",
  contentClassName = "",
}) {
  const isDark = tone === "dark";
  const columnBg = isDark ? "bg-night" : "bg-white";
  const ambientBg = isDark ? "sm:bg-night" : "sm:bg-cobalt";

  return (
    <div
      className={`flex min-h-[100dvh] justify-center bg-white ${ambientBg} ${
        isDark ? "bg-night" : ""
      } sm:py-6`}
    >
      <div
        className={`flex h-[100dvh] w-full flex-col overflow-hidden ${columnBg} sm:h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone`}
      >
        {header}
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden ${contentClassName}`}
        >
          {children}
        </main>
        {footer}
      </div>
    </div>
  );
}
