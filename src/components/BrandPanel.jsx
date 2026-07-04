export default function BrandPanel({ children }) {
  return (
    <div className="min-h-full bg-white sm:flex sm:min-h-screen sm:items-center sm:justify-center sm:bg-cobalt sm:py-10">
      <div className="mx-auto flex min-h-full w-full flex-col bg-white px-6 pb-10 pt-8 safe-top safe-bottom sm:min-h-0 sm:w-[420px] sm:rounded-[28px] sm:px-8 sm:py-10 sm:shadow-[0_30px_80px_-20px_rgba(14,19,48,0.45)]">
        {children}
      </div>
    </div>
  );
}
