// Dados mock — excursões da Bahia. Sem backend; estado em memória.

export const excursoes = [
  {
    id: "praia-do-forte",
    destino: "Praia do Forte",
    categoria: "praia",
    cena: "praia",
    duracao: "1 dia",
    data: "15 jul, sáb",
    saida: "06:30 · Terminal da França",
    retorno: "19:00 · Praia do Forte",
    preco: 180,
    vagas: 12,
    total: 33,
    empresa: "Bahia Sol Turismo",
    descricao:
      "Dia inteiro na Praia do Forte com parada no Projeto Tamar, tempo livre na vila e almoço à beira-mar. Ônibus leito com ar-condicionado e guia local.",
  },
  {
    id: "chapada-diamantina",
    destino: "Chapada Diamantina",
    categoria: "aventura",
    cena: "montanha",
    duracao: "2 dias",
    data: "22 jul, sáb",
    saida: "05:00 · Terminal da França",
    retorno: "21:00 · dom, Lençóis",
    preco: 640,
    vagas: 4,
    total: 33,
    empresa: "Trilha Viva Expedições",
    descricao:
      "Fim de semana em Lençóis com trilha ao Poço Azul, Cachoeira da Fumaça e pôr do sol no Morro do Pai Inácio. Hospedagem e café da manhã inclusos.",
  },
  {
    id: "morro-de-sao-paulo",
    destino: "Morro de São Paulo",
    categoria: "praia",
    cena: "ilha",
    duracao: "1 dia",
    data: "29 jul, sáb",
    saida: "06:00 · Terminal da França",
    retorno: "20:30 · Valença",
    preco: 290,
    vagas: 20,
    total: 40,
    empresa: "Bahia Sol Turismo",
    descricao:
      "Bate-volta à ilha com travessia de catamarã, tempo livre nas quatro praias e volta ao entardecer. Inclui traslado terrestre e marítimo.",
  },
  {
    id: "cachoeira-recncavo",
    destino: "Cachoeira & Recôncavo",
    categoria: "aventura",
    cena: "montanha",
    duracao: "1 dia",
    data: "05 ago, sáb",
    saida: "07:00 · Terminal da França",
    retorno: "19:30 · Cachoeira",
    preco: 155,
    vagas: 8,
    total: 33,
    empresa: "Raízes do Recôncavo",
    descricao:
      "Circuito histórico por Cachoeira e São Félix com degustação em alambique, centro histórico e travessia da ponte Dom Pedro II.",
  },
  {
    id: "ilha-dos-frades",
    destino: "Ilha dos Frades",
    categoria: "praia",
    cena: "ilha",
    duracao: "1 dia",
    data: "12 ago, sáb",
    saida: "08:00 · Terminal Náutico",
    retorno: "18:00 · Ilha dos Frades",
    preco: 145,
    vagas: 15,
    total: 30,
    empresa: "Baía Azul Passeios",
    descricao:
      "Passeio de escuna pela Baía de Todos-os-Santos com parada na Ilha dos Frades e Ponta de Nossa Senhora. Almoço opcional na ilha.",
  },
];

export function excursaoPorId(id) {
  return excursoes.find((e) => e.id === id) ?? excursoes[0];
}

export const passeiosExtras = [
  {
    id: "catamara",
    nome: "Travessia de catamarã",
    descricao: "Ida e volta pela baía, 40 min",
    preco: 60,
    cena: "ilha",
  },
  {
    id: "mergulho",
    nome: "Mergulho livre guiado",
    descricao: "Piscinas naturais, com equipamento",
    preco: 90,
    cena: "praia",
  },
  {
    id: "almoco",
    nome: "Almoço regional",
    descricao: "Moqueca + acompanhamentos",
    preco: 55,
    cena: "praia",
  },
  {
    id: "quadriciclo",
    nome: "Passeio de quadriciclo",
    descricao: "Trilha na mata, 1h",
    preco: 120,
    cena: "montanha",
  },
];

export const cupons = {
  BAHIA10: { desconto: 0.1, rotulo: "10% de desconto" },
  PRIMEIRA: { desconto: 0.15, rotulo: "15% — primeira viagem" },
};
