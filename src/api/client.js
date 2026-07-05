// Cliente HTTP base da API FastPass (Laravel + Sanctum).
//
// A URL é lida de VITE_API_URL (.env). O token Bearer é persistido em
// localStorage e injetado automaticamente nas rotas autenticadas.

const BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api"
).replace(/\/$/, "");

const TOKEN_KEY = "fastpass.token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

// Erro normalizado da API. `status: 0` indica falha de rede / backend fora
// do ar — as telas usam isso para cair em modo demonstração sem quebrar.
export class ApiError extends Error {
  constructor(mensagem, { status = 0, errors = null, data = null } = {}) {
    super(mensagem);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }

  get offline() {
    return this.status === 0;
  }
}

export async function api(
  path,
  { method = "GET", body, auth = true, headers = {} } = {}
) {
  const opts = { method, headers: { Accept: "application/json", ...headers } };

  if (body !== undefined) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }

  const token = getToken();
  if (auth && token) opts.headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, opts);
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor.", { status: 0 });
  }

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const mensagem =
      data?.mensagem || data?.message || "Erro ao processar a requisição.";
    throw new ApiError(mensagem, {
      status: res.status,
      errors: data?.errors ?? null,
      data,
    });
  }

  return data;
}

export { BASE_URL };
