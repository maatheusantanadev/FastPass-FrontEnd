import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  MapPinned,
  ScanLine,
  BarChart3,
  Menu,
  X,
  Smartphone,
} from "lucide-react";

const nav = [
  { to: "/painel", label: "Visão geral", icon: LayoutGrid, end: true },
  { to: "/painel/excursoes", label: "Excursões", icon: MapPinned },
  { to: "/painel/validacao", label: "Validação", icon: ScanLine },
  { to: "/painel/relatorios", label: "Relatórios", icon: BarChart3 },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-7">
        <p className="font-display text-[22px] font-light tracking-tight text-white">
          FastPass
        </p>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-badge text-white/50">
          Face ID
        </p>
      </div>

      <nav className="mt-8 flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <NavLink
          to="/app/explorar"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          <Smartphone size={18} strokeWidth={2} aria-hidden="true" />
          Ver app do passageiro
        </NavLink>
      </div>
    </div>
  );
}

export default function DashboardShell({ title, subtitle, actions, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-cobalt-tint/40 lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-[100dvh] bg-cobalt lg:block">
        <SidebarContent />
      </aside>

      {/* Drawer mobile/tablet */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-[248px] bg-cobalt">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="tap-target absolute right-2 top-3 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10"
            >
              <X size={22} />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-[100dvh] flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-white/90 px-5 py-4 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="tap-target flex items-center justify-center rounded-xl text-ink hover:bg-cobalt-tint lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[22px] font-medium leading-tight text-ink">
              {title}
            </h1>
            {subtitle && <p className="truncate text-[13px] text-muted">{subtitle}</p>}
          </div>
          {actions}
        </header>

        <main className="flex-1 p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
