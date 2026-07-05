// Formatação pt-BR / R$.
const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export function formatBRL(valor) {
  return brl.format(valor);
}

export function pct(fracao) {
  return `${Math.round(fracao * 100)}%`;
}
