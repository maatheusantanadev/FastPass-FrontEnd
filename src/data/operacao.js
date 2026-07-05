// Partidas do dia para o operador (mock, em memória).
// situacao: "andamento" | "aguardando" | "concluida"
export const viagensDoDia = [
  {
    id: "vd1",
    destino: "Praia do Forte",
    cena: "praia",
    saida: "06:30",
    onibus: "Leito · OGT-2B47",
    capacidade: 33,
    embarcados: 8,
    situacao: "andamento",
    atual: true,
  },
  {
    id: "vd2",
    destino: "Morro de São Paulo",
    cena: "ilha",
    saida: "09:00",
    onibus: "Executivo · JHK-7C12",
    capacidade: 40,
    embarcados: 0,
    situacao: "aguardando",
    atual: false,
  },
  {
    id: "vd3",
    destino: "Ilha dos Frades",
    cena: "ilha",
    saida: "05:40",
    onibus: "Van · MPQ-3D88",
    capacidade: 18,
    embarcados: 18,
    situacao: "concluida",
    atual: false,
  },
];
