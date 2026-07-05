// Autenticação — mapeia as rotas /api/auth/* do backend.
import { api, setToken } from "./client.js";

// POST /auth/register — { name, email, password, password_confirmation, cpf, telefone }
export async function register(payload) {
  const data = await api("/auth/register", {
    method: "POST",
    body: payload,
    auth: false,
  });
  if (data?.token) setToken(data.token);
  return data;
}

// POST /auth/login — { email, password }
export async function login({ email, password }) {
  const data = await api("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
  if (data?.token) setToken(data.token);
  return data;
}

// GET /auth/me — usuário autenticado
export function me() {
  return api("/auth/me");
}

// POST /auth/logout — encerra a sessão e descarta o token local
export async function logout() {
  try {
    await api("/auth/logout", { method: "POST" });
  } finally {
    setToken(null);
  }
}
