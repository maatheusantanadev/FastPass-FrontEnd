// Embarque — rotas /api/embarque/*.
import { api } from "./client.js";

// POST /embarque/qrcode — { codigo_qr } (o motorista lê o QR do passageiro)
export function embarcarPorQrCode(codigoQr) {
  return api("/embarque/qrcode", {
    method: "POST",
    body: { codigo_qr: codigoQr },
  });
}

// POST /embarque/manual — { compra_id } (conferência manual do motorista)
export function embarcarManual(compraId) {
  return api("/embarque/manual", {
    method: "POST",
    body: { compra_id: compraId },
  });
}

// POST /embarque/solicitar — { compra_id, imagem(base64) }
// O passageiro tira a selfie e pede o embarque; quem confirma é o motorista.
export function solicitarEmbarque(compraId, imagemBase64) {
  return api("/embarque/solicitar", {
    method: "POST",
    body: { compra_id: compraId, imagem: imagemBase64 },
  });
}

// GET /compras/{id}/pedido — acompanha o andamento do próprio pedido
export function consultarPedido(compraId) {
  return api(`/compras/${compraId}/pedido`);
}
