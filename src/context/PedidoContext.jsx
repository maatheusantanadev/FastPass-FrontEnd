import { createContext, useContext, useMemo, useState } from "react";
import { excursoes, cupons } from "../data/excursoes.js";

// Estado do pedido em memória (frontend-only, sem backend).
const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [excursao, setExcursao] = useState(excursoes[0]);
  const [assento, setAssento] = useState(null);
  const [extras, setExtras] = useState([]);
  const [cupom, setCupom] = useState(null);
  const [compra, setCompra] = useState(null); // compra criada no checkout (com codigo_qr)

  function toggleExtra(item) {
    setExtras((prev) =>
      prev.find((e) => e.id === item.id)
        ? prev.filter((e) => e.id !== item.id)
        : [...prev, item]
    );
  }

  function aplicarCupom(codigo) {
    const cod = codigo.trim().toUpperCase();
    if (cupons[cod]) {
      setCupom({ codigo: cod, ...cupons[cod] });
      return true;
    }
    return false;
  }

  const totais = useMemo(() => {
    const base = excursao?.preco ?? 0;
    const extrasTotal = extras.reduce((s, e) => s + e.preco, 0);
    const subtotal = base + extrasTotal;
    const desconto = cupom ? subtotal * cupom.desconto : 0;
    return { base, extrasTotal, subtotal, desconto, total: subtotal - desconto };
  }, [excursao, extras, cupom]);

  const value = {
    excursao,
    setExcursao,
    assento,
    setAssento,
    extras,
    toggleExtra,
    cupom,
    aplicarCupom,
    setCupom,
    compra,
    setCompra,
    totais,
  };

  return <PedidoContext.Provider value={value}>{children}</PedidoContext.Provider>;
}

export function usePedido() {
  const ctx = useContext(PedidoContext);
  if (!ctx) throw new Error("usePedido deve ser usado dentro de PedidoProvider");
  return ctx;
}
