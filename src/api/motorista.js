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

// GET /motorista/excursoes/{id}/pedidos — pedidos de embarque pendentes
export function listarPedidosMotorista(excursaoId) {
  return api(`/motorista/excursoes/${excursaoId}/pedidos`);
}

// POST /motorista/pedidos/{id}/aprovar — compara as fotos e confirma o embarque
export function aprovarPedidoMotorista(pedidoId) {
  return api(`/motorista/pedidos/${pedidoId}/aprovar`, { method: "POST" });
}

// POST /motorista/pedidos/{id}/reprovar — as fotos não batem
export function reprovarPedidoMotorista(pedidoId) {
  return api(`/motorista/pedidos/${pedidoId}/reprovar`, { method: "POST" });
}

// POST /motorista/excursoes/{id}/concluir — encerra o embarque da viagem
export function concluirEmbarqueMotorista(excursaoId) {
  return api(`/motorista/excursoes/${excursaoId}/concluir`, { method: "POST" });
}
