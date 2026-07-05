// Compras / passagens — rotas /api/compras/*.
import { api } from "./client.js";

// GET /compras — passagens do passageiro autenticado
export function listarCompras() {
  return api("/compras");
}

// POST /compras — { excursao_id }. Pagamento simulado; nasce confirmada.
export function criarCompra(excursaoId) {
  return api("/compras", {
    method: "POST",
    body: { excursao_id: excursaoId },
  });
}

// GET /compras/{id} — detalhe do bilhete
export function obterCompra(id) {
  return api(`/compras/${id}`);
}

// POST /compras/{id}/facial — registra a biometria (imagem base64)
export function registrarFacial(compraId, imagemBase64) {
  return api(`/compras/${compraId}/facial`, {
    method: "POST",
    body: { imagem: imagemBase64 },
  });
}
