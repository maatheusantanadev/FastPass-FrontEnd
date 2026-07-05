import { Check, Clock, UserX } from "lucide-react";
import Avatar from "./Avatar.jsx";
import MethodPill from "./MethodPill.jsx";

// Linha de passageiro na lista de embarque (operação + admin).
const statusInfo = {
  embarcado: { icon: Check, tone: "text-success", bg: "bg-success/10", label: "Embarcado" },
  pendente: { icon: Clock, tone: "text-warning", bg: "bg-warning/15", label: "Pendente" },
  ausente: { icon: UserX, tone: "text-danger", bg: "bg-danger/10", label: "Ausente" },
};

export default function BoardingRow({ passageiro, action }) {
  const info = statusInfo[passageiro.status];
  const Icon = info.icon;

  return (
    <li className="flex items-center gap-3 py-3">
      <span
        className={`relative flex ${info.bg} items-center justify-center rounded-full`}
      >
        <Avatar nome={passageiro.nome} size="md" />
        <span
          className={`absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white ${info.tone}`}
        >
          <Icon size={13} strokeWidth={3} />
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-[15px] font-medium text-ink">
          {passageiro.nome}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-[12px] text-muted">
          <span>Assento {passageiro.assento}</span>
          {passageiro.metodo && (
            <>
              <span aria-hidden="true">·</span>
              <MethodPill metodo={passageiro.metodo} size="sm" />
              {passageiro.horario && <span>{passageiro.horario}</span>}
            </>
          )}
        </div>
      </div>

      {action}
    </li>
  );
}
