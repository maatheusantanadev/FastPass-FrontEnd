// Viagens do passageiro (mock, em memória).
export const viagens = {
  proximas: [
    {
      id: "t1",
      destino: "Praia do Forte",
      cena: "praia",
      data: "15 jul, sáb",
      saida: "06:30 · Terminal da França",
      assento: "12A",
      status: "confirmada",
    },
    {
      id: "t2",
      destino: "Morro de São Paulo",
      cena: "ilha",
      data: "29 jul, sáb",
      saida: "06:00 · Terminal da França",
      assento: "07C",
      status: "aguardando",
    },
  ],
  anteriores: [
    {
      id: "t3",
      destino: "Chapada Diamantina",
      cena: "montanha",
      data: "17 jun, sáb",
      saida: "05:00 · Terminal da França",
      assento: "03B",
      status: "concluida",
    },
    {
      id: "t4",
      destino: "Ilha dos Frades",
      cena: "ilha",
      data: "10 jun, sáb",
      saida: "08:00 · Terminal Náutico",
      assento: "09A",
      status: "concluida",
    },
  ],
};

export const avisos = [
  {
    id: "a1",
    tipo: "embarque",
    titulo: "Embarque amanhã, 06:30",
    texto: "Praia do Forte · chegue 20 min antes ao Terminal da França.",
    tempo: "há 2 h",
    novo: true,
  },
  {
    id: "a2",
    tipo: "pagamento",
    titulo: "Pagamento aprovado",
    texto: "Sua passagem para Morro de São Paulo está confirmada.",
    tempo: "ontem",
    novo: true,
  },
  {
    id: "a3",
    tipo: "local",
    titulo: "Ponto de encontro definido",
    texto: "Chapada Diamantina · encontro no portão 3 do terminal.",
    tempo: "3 dias",
    novo: false,
  },
];
