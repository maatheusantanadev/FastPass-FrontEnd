// Painel da empresa — métricas agregadas.
import { api } from "./client.js";

// GET /dashboard — visão geral, vendas por dia, mix de métodos e relatórios.
export function obterDashboard() {
  return api("/dashboard");
}
