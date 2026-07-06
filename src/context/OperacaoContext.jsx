import { createContext, useContext, useMemo, useState } from "react";
import { passageiros as base, contarStatus } from "../data/passageiros.js";
import { painelExcursao } from "../api/excursoes.js";
import { embarcarManual as embarcarManualApi } from "../api/embarque.js";
import { passageiroDaOperacao } from "../api/adapters.js";

// Estado da operação de embarque. Carrega a lista real do painel da excursão
// quando há uma excursão selecionada; sem backend, cai no mock (demonstração).
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
  const [excursaoId, setExcursaoIdState] = useState(null);
  const [excursaoNome, setExcursaoNome] = useState(null);
  const [real, setReal] = useState(false); // true quando a lista veio do backend

  const contagem = useMemo(() => contarStatus(lista), [lista]);
  const total = lista.length;

  async function carregarPainel(id = excursaoId) {
    if (!id) return;
    try {
      const painel = await painelExcursao(id);
      if (!painel) return;
      setLista((painel.lista_embarque ?? []).map(passageiroDaOperacao));
      setExcursaoNome(painel.excursao?.destino ?? null);
      setReal(true);
    } catch {
      // mantém a lista mock (backend offline)
    }
  }

  function setExcursaoId(id) {
    setExcursaoIdState(id);
    if (id) carregarPainel(id);
  }

  function proximoPendente() {
    return lista.find((p) => p.status === "pendente") ?? null;
  }

  function marcarEmbarcado(alvo, metodo) {
    const atualizado = {
      ...alvo,
      status: "embarcado",
      metodo,
      horario: alvo.horario ?? agora(),
    };
    setLista((prev) => prev.map((p) => (p.id === alvo.id ? atualizado : p)));
    setUltimo(atualizado);
    return atualizado;
  }

  // Embarca o próximo pendente (ou um id específico). O manual é persistido no
  // backend quando em modo real; facial/QR usam registrarEmbarque.
  async function embarcar(metodo, id = null) {
    const alvo = id ? lista.find((p) => p.id === id) : proximoPendente();
    if (!alvo) return null;

    if (real && metodo === "manual") {
      try {
        await embarcarManualApi(Number(alvo.id));
      } catch {
        // segue com atualização local (demonstração)
      }
    }
    return marcarEmbarcado(alvo, metodo);
  }

  // Registra um embarque já confirmado no backend (facial/QR): atualiza a lista
  // e define o "último" a partir da compra retornada.
  function registrarEmbarque(compra, metodo) {
    const p = passageiroDaOperacao(compra);
    const alvo = lista.find((x) => x.id === p.id);
    if (alvo) return marcarEmbarcado(alvo, metodo);
    const novo = { ...p, status: "embarcado", metodo, horario: p.horario ?? agora() };
    setUltimo(novo);
    return novo;
  }

  function reiniciar() {
    setLista(base.map((p) => ({ ...p })));
    setUltimo(null);
    setReal(false);
    setExcursaoIdState(null);
    setExcursaoNome(null);
  }

  const value = {
    lista,
    total,
    contagem,
    ultimo,
    excursaoId,
    setExcursaoId,
    excursaoNome,
    real,
    carregarPainel,
    proximoPendente,
    embarcar,
    registrarEmbarque,
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
