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

// GET /excursoes/{id}/painel — visão de gestão (empresa/admin)
export function painelExcursao(id) {
  return api(`/excursoes/${id}/painel`);
}

// POST /excursoes/{id}/concluir — encerra a viagem
export function concluirExcursao(id) {
  return api(`/excursoes/${id}/concluir`, { method: "POST" });
}
