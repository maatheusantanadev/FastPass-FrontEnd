import { createContext, useContext, useMemo, useState } from "react";
import { embarqueDaExcursao, concluirEmbarqueMotorista } from "../api/motorista.js";
import { embarcarManual as embarcarManualApi } from "../api/embarque.js";
import { passageiroDaOperacao } from "../api/adapters.js";

// Estado da operação de embarque do motorista. Tudo vem do backend: a lista
// de passageiros, os contadores e a excursão em operação. Sem fallback para
// dados fictícios — se o backend falhar, a tela mostra o erro.
const OperacaoContext = createContext(null);

function contarStatus(lista) {
  return lista.reduce(
    (acc, p) => {
      if (p.status === "embarcado") acc.embarcados += 1;
      else if (p.status === "pendente") acc.pendentes += 1;
      else if (p.status === "ausente") acc.ausentes += 1;
      if (p.pagamento === "pago") acc.confirmados += 1;
      return acc;
    },
    { embarcados: 0, pendentes: 0, ausentes: 0, confirmados: 0 }
  );
}

export function OperacaoProvider({ children }) {
  const [lista, setLista] = useState([]);
  const [ultimo, setUltimo] = useState(null);
  const [excursaoId, setExcursaoIdState] = useState(null);
  const [excursaoAtual, setExcursaoAtual] = useState(null); // objeto excursao cru do backend
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const contagem = useMemo(() => contarStatus(lista), [lista]);
  const total = lista.length;
  const excursaoNome = excursaoAtual?.destino ?? excursaoAtual?.titulo ?? null;

  async function carregarPainel(id = excursaoId) {
    if (!id) return;
    setCarregando(true);
    setErro(null);
    try {
      const painel = await embarqueDaExcursao(id);
      setLista((painel?.lista_embarque ?? []).map(passageiroDaOperacao));
      setExcursaoAtual(painel?.excursao ?? null);
    } catch (err) {
      setErro(err.message || "Não foi possível carregar a lista de embarque.");
    } finally {
      setCarregando(false);
    }
  }

  function setExcursaoId(id) {
    setExcursaoIdState(id);
    if (id) carregarPainel(id);
  }

  function proximoPendente() {
    return lista.find((p) => p.status === "pendente") ?? null;
  }

  function marcarEmbarcado(alvo, metodo, horario) {
    const atualizado = { ...alvo, status: "embarcado", metodo, horario };
    setLista((prev) => prev.map((p) => (p.id === alvo.id ? atualizado : p)));
    setUltimo(atualizado);
    return atualizado;
  }

  // Confirma o embarque manual de um passageiro (POST /embarque/manual).
  async function embarcar(metodo, id = null) {
    const alvo = id ? lista.find((p) => p.id === id) : proximoPendente();
    if (!alvo) return null;

    if (metodo === "manual") {
      const res = await embarcarManualApi(Number(alvo.id));
      const p = passageiroDaOperacao(res.compra);
      return marcarEmbarcado(alvo, "manual", p.horario);
    }

    return marcarEmbarcado(alvo, metodo, alvo.horario);
  }

  // Registra um embarque já confirmado no backend (facial/QR): atualiza a
  // lista local e define o "último" a partir da compra retornada.
  function registrarEmbarque(compra, metodo) {
    const p = passageiroDaOperacao(compra);
    const alvo = lista.find((x) => x.id === p.id);
    if (alvo) return marcarEmbarcado(alvo, metodo, p.horario);
    const novo = { ...p, status: "embarcado", metodo };
    setLista((prev) => [...prev, novo]);
    setUltimo(novo);
    return novo;
  }

  // Encerra o embarque da viagem atual (POST /motorista/excursoes/{id}/concluir).
  async function encerrarEmbarque() {
    if (!excursaoId) return null;
    return concluirEmbarqueMotorista(excursaoId);
  }

  function reiniciar() {
    setLista([]);
    setUltimo(null);
    setExcursaoIdState(null);
    setExcursaoAtual(null);
    setErro(null);
  }

  const value = {
    lista,
    total,
    contagem,
    ultimo,
    excursaoId,
    setExcursaoId,
    excursaoAtual,
    excursaoNome,
    carregando,
    erro,
    carregarPainel,
    proximoPendente,
    embarcar,
    registrarEmbarque,
    encerrarEmbarque,
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
