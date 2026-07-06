// Excursões — rotas /api/excursoes/*.
import { api } from "./client.js";

// GET /excursoes — catálogo disponível para compra (dashboard)
export function listarExcursoes() {
  return api("/excursoes");
}

// GET /excursoes/{id}
export function obterExcursao(id) {
  return api(`/excursoes/${id}`);
}

// POST /excursoes — cria uma excursão (gestão)
export function criarExcursao(payload) {
  return api("/excursoes", { method: "POST", body: payload });
}

// PUT /excursoes/{id} — atualiza uma excursão (gestão)
export function atualizarExcursao(id, payload) {
  return api(`/excursoes/${id}`, { method: "PUT", body: payload });
}

// POST /excursoes/{id}/passageiros — adiciona um passageiro por e-mail (gestão)
export function adicionarPassageiro(id, email) {
  return api(`/excursoes/${id}/passageiros`, {
    method: "POST",
    body: { email },
  });
}

// GET /excursoes/{id}/painel — visão de gestão (empresa/admin)
export function painelExcursao(id) {
  return api(`/excursoes/${id}/painel`);
}

// POST /excursoes/{id}/concluir — encerra a viagem
export function concluirExcursao(id) {
  return api(`/excursoes/${id}/concluir`, { method: "POST" });
}
