// Dados mock — passageiros e lista de embarque. Estado em memória, sem backend.

// status: "embarcado" | "pendente" | "ausente"
// metodo: "facial" | "qr" | "manual" | null
export const passageiros = [
  { id: "p01", nome: "Maria Andrade", cpf: "123.***.***-04", assento: "1A", status: "embarcado", metodo: "facial", horario: "06:12", pagamento: "pago" },
  { id: "p02", nome: "João Nascimento", cpf: "455.***.***-11", assento: "1B", status: "embarcado", metodo: "qr", horario: "06:13", pagamento: "pago" },
  { id: "p03", nome: "Ana Beatriz Lima", cpf: "789.***.***-20", assento: "2A", status: "embarcado", metodo: "facial", horario: "06:15", pagamento: "pago" },
  { id: "p04", nome: "Carlos Eduardo Souza", cpf: "321.***.***-38", assento: "2B", status: "pendente", metodo: null, horario: null, pagamento: "pago" },
  { id: "p05", nome: "Fernanda Rocha", cpf: "654.***.***-52", assento: "3A", status: "embarcado", metodo: "manual", horario: "06:18", pagamento: "pago" },
  { id: "p06", nome: "Rafael Mendes", cpf: "987.***.***-63", assento: "3B", status: "pendente", metodo: null, horario: null, pagamento: "pendente" },
  { id: "p07", nome: "Juliana Prado", cpf: "147.***.***-70", assento: "4A", status: "embarcado", metodo: "facial", horario: "06:20", pagamento: "pago" },
  { id: "p08", nome: "Bruno Carvalho", cpf: "258.***.***-81", assento: "4B", status: "embarcado", metodo: "qr", horario: "06:21", pagamento: "pago" },
  { id: "p09", nome: "Larissa Gomes", cpf: "369.***.***-99", assento: "5A", status: "pendente", metodo: null, horario: null, pagamento: "pago" },
  { id: "p10", nome: "Diego Ferreira", cpf: "159.***.***-08", assento: "5B", status: "ausente", metodo: null, horario: null, pagamento: "pago" },
  { id: "p11", nome: "Patrícia Alves", cpf: "753.***.***-16", assento: "6A", status: "embarcado", metodo: "facial", horario: "06:24", pagamento: "pago" },
  { id: "p12", nome: "Gustavo Ribeiro", cpf: "852.***.***-27", assento: "6B", status: "embarcado", metodo: "manual", horario: "06:25", pagamento: "pago" },
];

// Passageiro "logado" no app
export const usuario = {
  nome: "Maria",
  nomeCompleto: "Maria Andrade",
  cpf: "123.***.***-04",
  pontos: 150,
  codigoEmbarque: "FP-7K2M-9QX4",
};

export const resumoOperacao = {
  excursao: "Praia do Forte",
  data: "15 jul, sáb",
  saida: "06:30",
  capacidade: 33,
  onibus: "Leito · Placa OGT-2B47",
  motorista: "Sr. Antônio",
};

export function contarStatus(lista) {
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
