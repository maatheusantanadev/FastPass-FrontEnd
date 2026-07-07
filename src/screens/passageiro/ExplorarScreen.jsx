import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import TabBar from "../../components/TabBar.jsx";
import Chip from "../../components/Chip.jsx";
import Avatar from "../../components/Avatar.jsx";
import ExcursionCard from "../../components/ExcursionCard.jsx";
import { listarExcursoes } from "../../api/excursoes.js";
import { excursaoDoBackend } from "../../api/adapters.js";
import { useAuth } from "../../context/AuthContext.jsx";

const filtros = [
  { id: "todos", label: "Todos" },
  { id: "praia", label: "Praia" },
  { id: "aventura", label: "Aventura" },
  { id: "1dia", label: "1 dia" },
  { id: "ate200", label: "Até R$200" },
];

export default function ExplorarScreen() {
  const { usuario: authUser } = useAuth();
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [excursoes, setExcursoes] = useState([]);

  // Carrega o catálogo da API.
  useEffect(() => {
    let vivo = true;
    listarExcursoes()
      .then((lista) => {
        if (vivo && Array.isArray(lista)) {
          setExcursoes(lista.map(excursaoDoBackend));
        }
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, []);

  const primeiroNome = authUser?.name?.trim().split(" ")[0] ?? "viajante";
  const nomeCompleto = authUser?.name ?? "Passageiro";

  const lista = useMemo(() => {
    return excursoes.filter((e) => {
      if (busca && !e.destino.toLowerCase().includes(busca.toLowerCase()))
        return false;
      if (filtro === "praia") return e.categoria === "praia";
      if (filtro === "aventura") return e.categoria === "aventura";
      if (filtro === "1dia") return e.duracao === "1 dia";
      if (filtro === "ate200") return e.preco <= 200;
      return true;
    });
  }, [filtro, busca, excursoes]);

  return (
    <MobileShell footer={<TabBar />}>
      {/* saudação */}
      <div className="flex items-center gap-3 px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex-1">
          <p className="text-[13px] text-muted">Olá,</p>
          <h1 className="font-display text-[24px] font-medium leading-tight text-ink">
            {primeiroNome}
          </h1>
        </div>
        <Avatar nome={nomeCompleto} size="lg" tone="solid" />
      </div>

      {/* busca */}
      <div className="px-5">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar destino"
            aria-label="Buscar destino"
            className="h-[50px] w-full rounded-[14px] border border-line bg-cobalt-tint/50 pl-11 pr-4 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* chips */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {filtros.map((f) => (
          <Chip
            key={f.id}
            active={filtro === f.id}
            onClick={() => setFiltro(f.id)}
          >
            {f.label}
          </Chip>
        ))}
      </div>

      {/* cards */}
      <div className="flex flex-col gap-4 px-5 py-4">
        {lista.length === 0 ? (
          <p className="py-10 text-center text-[14px] text-muted">
            Nenhuma excursão encontrada.
          </p>
        ) : (
          lista.map((e) => <ExcursionCard key={e.id} excursao={e} />)
        )}
      </div>
    </MobileShell>
  );
}
