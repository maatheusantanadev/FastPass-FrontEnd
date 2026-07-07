// Motorista — rotas /api/motorista/*.
import { api } from "./client.js";

// GET /motorista/excursoes — viagens atribuídas ao motorista autenticado
export function listarExcursoesMotorista() {
  return api("/motorista/excursoes");
}

// GET /motorista/excursoes/{id}/embarque — lista de embarque da viagem
export function embarqueDaExcursao(excursaoId) {
  return api(`/motorista/excursoes/${excursaoId}/embarque`);
}

// POST /motorista/excursoes/{id}/concluir — encerra o embarque da viagem
export function concluirEmbarqueMotorista(excursaoId) {
  return api(`/motorista/excursoes/${excursaoId}/concluir`, { method: "POST" });
}
