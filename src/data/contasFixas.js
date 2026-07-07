// Contas fixas (hardcoded) para acesso direto de Motorista e Administrador,
// sem depender do backend estar no ar — úteis para demonstração/TCC.
//
// Para trocar e-mail/senha, edite os valores abaixo.
export const CONTAS_FIXAS = [
  {
    email: "motorista@fastpass.com",
    senha: "motorista123",
    redirect: "/operacao",
    usuario: {
      id: "fixo-motorista",
      name: "Sr. Antônio",
      email: "motorista@fastpass.com",
      role: "motorista",
    },
  },
  {
    email: "admin@fastpass.com",
    senha: "admin123",
    redirect: "/painel",
    usuario: {
      id: "fixo-admin",
      name: "Administrador",
      email: "admin@fastpass.com",
      role: "administrador",
    },
  },
];

// Procura uma conta fixa pelo par e-mail/senha (e-mail não sensível a maiúsculas).
export function encontrarContaFixa(email, senha) {
  const emailNormalizado = (email ?? "").trim().toLowerCase();
  return CONTAS_FIXAS.find(
    (conta) => conta.email === emailNormalizado && conta.senha === senha
  );
}
