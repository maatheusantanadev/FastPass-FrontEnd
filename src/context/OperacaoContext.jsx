import { createContext, useContext, useMemo, useState } from "react";
import { passageiros as base, contarStatus } from "../data/passageiros.js";

// Estado da operação de embarque em memória (frontend-only).
const OperacaoContext = createContext(null);

function agora() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OperacaoProvider({ children }) {
  const [lista, setLista] = useState(() => base.map((p) => ({ ...p })));
  const [ultimo, setUltimo] = useState(null);

  const contagem = useMemo(() => contarStatus(lista), [lista]);
  const total = lista.length;

  function proximoPendente() {
    return lista.find((p) => p.status === "pendente") ?? null;
  }

  // Embarca o próximo pendente (ou um id específico) com o método dado.
  function embarcar(metodo, id = null) {
    const alvo = id
      ? lista.find((p) => p.id === id)
      : proximoPendente();
    if (!alvo) return null;
    const atualizado = { ...alvo, status: "embarcado", metodo, horario: agora() };
    setLista((prev) => prev.map((p) => (p.id === alvo.id ? atualizado : p)));
    setUltimo(atualizado);
    return atualizado;
  }

  function reiniciar() {
    setLista(base.map((p) => ({ ...p })));
    setUltimo(null);
  }

  const value = {
    lista,
    total,
    contagem,
    ultimo,
    proximoPendente,
    embarcar,
    reiniciar,
  };

  return (
    <OperacaoContext.Provider value={value}>{children}</OperacaoContext.Provider>
  );
}

export function useOperacao() {
  const ctx = useContext(OperacaoContext);
  if (!ctx) throw new Error("useOperacao deve ser usado dentro de OperacaoProvider");
  return ctx;
}
