import { createContext, useContext, useMemo, useState } from "react";

// Estado do pedido em andamento (checkout). A excursão é escolhida na tela de
// detalhes e vem do backend; nada de dados fictícios aqui.
const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [excursao, setExcursao] = useState(null);
  const [assento, setAssento] = useState(null);
  const [compra, setCompra] = useState(null); // compra criada no checkout (com codigo_qr)

  const totais = useMemo(() => {
    const base = excursao?.preco ?? 0;
    return { base, subtotal: base, total: base };
  }, [excursao]);

  const value = {
    excursao,
    setExcursao,
    assento,
    setAssento,
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
