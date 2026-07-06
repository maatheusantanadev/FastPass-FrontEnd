// Embarque inteligente — rotas /api/embarque/*.
import { api } from "./client.js";

// POST /embarque/facial — { excursao_id, imagem(base64) }
// Identifica o passageiro pela face e marca a passagem como embarcada.
export function embarcarPorFacial(excursaoId, imagemBase64) {
  return api("/embarque/facial", {
    method: "POST",
    body: { excursao_id: excursaoId, imagem: imagemBase64 },
  });
}

// POST /embarque/qrcode — { codigo_qr }
export function embarcarPorQrCode(codigoQr) {
  return api("/embarque/qrcode", {
    method: "POST",
    body: { codigo_qr: codigoQr },
  });
}

// POST /embarque/manual — { compra_id } (conferência manual do operador)
export function embarcarManual(compraId) {
  return api("/embarque/manual", {
    method: "POST",
    body: { compra_id: compraId },
  });
}
