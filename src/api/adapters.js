// Adaptadores backend → front-end.
//
// O app foi desenhado antes da API e usa um formato próprio (datas já
// formatadas, `vagas`/`total`, `cena`, etc.). Estas funções traduzem o JSON
// do Laravel para exatamente esse formato, de modo que as telas não precisem
// mudar sua forma de consumir os dados.

const MESES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];
const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

function toDate(valor) {
  if (!valor) return null;
  const d = new Date(valor);
  return Number.isNaN(d.getTime()) ? null : d;
}

// "15 jul, sáb"
export function dataCurta(valor) {
  const d = toDate(valor);
  if (!d) return "";
  return `${String(d.getDate()).padStart(2, "0")} ${MESES[d.getMonth()]}, ${DIAS[d.getDay()]}`;
}

// "06:30"
export function hora(valor) {
  const d = toDate(valor);
  if (!d) return "";
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

// "1 dia" | "2 dias"
export function duracao(saida, retorno) {
  const a = toDate(saida);
  const b = toDate(retorno);
  if (!a || !b) return "1 dia";
  const dias = Math.round((b - a) / 86_400_000);
  const n = dias <= 0 ? 1 : dias;
  return n === 1 ? "1 dia" : `${n} dias`;
}

function comLocal(valor, local) {
  return [hora(valor), local].filter(Boolean).join(" · ");
}

// Excursão do backend → excursão do app.
export function excursaoDoBackend(e) {
  if (!e) return null;
  return {
    id: String(e.id),
    destino: e.destino ?? e.titulo ?? "",
    categoria: e.categoria ?? "praia",
    cena: e.cena ?? "praia",
    duracao: duracao(e.data_saida, e.data_retorno),
    data: dataCurta(e.data_saida),
    saida: comLocal(e.data_saida, e.ponto_partida),
    retorno: comLocal(e.data_retorno, e.ponto_retorno),
    preco: Number(e.preco ?? 0),
    vagas: e.vagas_disponiveis ?? 0,
    total: e.vagas_total ?? 0,
    empresa: e.empresa ?? "",
    descricao: e.descricao ?? "",
    status: e.status ?? "aberta",
    raw: e, // objeto original (id numérico) para chamadas subsequentes
  };
}

// confirmada | embarcada | concluida | cancelada → status usado no app
const STATUS_VIAGEM = {
  confirmada: "confirmada",
  embarcada: "confirmada",
  concluida: "concluida",
  cancelada: "cancelada",
};

// Compra do backend (com excursao carregada) → item de "Minhas viagens".
export function compraParaViagem(c) {
  if (!c) return null;
  const ex = c.excursao ?? {};
  return {
    id: String(c.id),
    destino: ex.destino ?? "",
    cena: ex.cena ?? "praia",
    data: dataCurta(ex.data_saida),
    saida: comLocal(ex.data_saida, ex.ponto_partida),
    assento: "—",
    status: STATUS_VIAGEM[c.status] ?? "confirmada",
    valor: Number(c.valor ?? 0),
    codigoQr: c.codigo_qr ?? null,
    raw: c,
  };
}

// Painel de gestão da excursão → linhas da tabela de passageiros (admin).
// O backend expõe user {id, name, email} e o status da compra; não há
// assento nem método de embarque persistido, então mapeamos o que existe.
export function passageirosDoPainel(painel) {
  return (painel?.lista_embarque ?? []).map((c) => ({
    id: String(c.id),
    nome: c.user?.name ?? "—",
    sub: c.user?.email ?? "",
    pagamento: c.status === "cancelada" ? "pendente" : "pago",
    embarque: c.status === "embarcada" || c.status === "concluida",
    metodo: null,
  }));
}
