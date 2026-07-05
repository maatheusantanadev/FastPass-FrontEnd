// Dados mock — métricas do painel admin. Sem backend.

export const vendasPorDia = [
  { dia: "Seg", valor: 12 },
  { dia: "Ter", valor: 18 },
  { dia: "Qua", valor: 9 },
  { dia: "Qui", valor: 24 },
  { dia: "Sex", valor: 31 },
  { dia: "Sáb", valor: 27 },
  { dia: "Dom", valor: 15 },
];

export const kpisVisaoGeral = {
  vagasOcupadas: 21,
  capacidade: 33,
  confirmados: 19,
  pagamentos: 3860,
  ocupacaoMedia: 0.82,
};

export const mixMetodos = [
  { metodo: "facial", rotulo: "Face ID", valor: 6 },
  { metodo: "qr", rotulo: "QR Code", valor: 2 },
  { metodo: "manual", rotulo: "Manual", valor: 2 },
];

export const historicoViagens = [
  { id: "v1", destino: "Praia do Forte", data: "01 jul", ocupacao: 0.94, presenca: 0.97, receita: 5940 },
  { id: "v2", destino: "Morro de São Paulo", data: "24 jun", ocupacao: 0.88, presenca: 0.92, receita: 8410 },
  { id: "v3", destino: "Chapada Diamantina", data: "17 jun", ocupacao: 1.0, presenca: 0.95, receita: 21120 },
  { id: "v4", destino: "Ilha dos Frades", data: "10 jun", ocupacao: 0.7, presenca: 0.9, receita: 3045 },
  { id: "v5", destino: "Cachoeira & Recôncavo", data: "03 jun", ocupacao: 0.82, presenca: 0.88, receita: 4185 },
];

export const kpisRelatorios = {
  presencaMedia: 0.92,
  atrasos: 3,
  ocupacao: 0.87,
  viagensMes: 14,
};
