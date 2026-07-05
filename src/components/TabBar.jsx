import { NavLink } from "react-router-dom";
import { Compass, Ticket, Bell, User } from "lucide-react";

const tabs = [
  { to: "/app/explorar", label: "Explorar", icon: Compass },
  { to: "/app/viagens", label: "Viagens", icon: Ticket },
  { to: "/app/avisos", label: "Avisos", icon: Bell },
  { to: "/app/perfil", label: "Perfil", icon: User },
];

export default function TabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="flex border-t border-line bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2"
    >
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className="tap-target flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1"
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.9}
                className={isActive ? "text-cobalt" : "text-muted"}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-cobalt" : "text-muted"
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
