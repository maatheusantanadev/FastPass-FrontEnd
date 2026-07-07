import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth.js";
import { getToken, setToken } from "../api/client.js";

// Sessão do usuário autenticado contra a API (token Bearer persistido).
const AuthContext = createContext(null);

// Chave usada para persistir a sessão das contas fixas (motorista/admin),
// que não passam pelo backend.
const FIXO_KEY = "fastpass.usuarioFixo";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o app: se houver uma conta fixa salva, restaura direto (sem
  // bater no backend). Senão, se houver token salvo, recupera o usuário real.
  useEffect(() => {
    const fixoSalvo = localStorage.getItem(FIXO_KEY);
    if (fixoSalvo) {
      try {
        setUsuario(JSON.parse(fixoSalvo));
      } catch {
        localStorage.removeItem(FIXO_KEY);
      }
      setCarregando(false);
      return;
    }

    if (!getToken()) {
      setCarregando(false);
      return;
    }
    authApi
      .me()
      .then(setUsuario)
      .catch(() => setToken(null)) // token inválido/expirado
      .finally(() => setCarregando(false));
  }, []);

  async function entrar(credenciais) {
    const data = await authApi.login(credenciais);
    setUsuario(data.usuario ?? null);
    return data;
  }

  // Login fixo (motorista/administrador) — não passa pelo backend.
  function entrarFixo(usuarioFixo) {
    localStorage.setItem(FIXO_KEY, JSON.stringify(usuarioFixo));
    setUsuario(usuarioFixo);
  }

  async function cadastrar(payload) {
    const data = await authApi.register(payload);
    setUsuario(data.usuario ?? null);
    return data;
  }

  async function sair() {
    const eraFixo = !!localStorage.getItem(FIXO_KEY);
    localStorage.removeItem(FIXO_KEY);
    if (eraFixo) {
      setUsuario(null);
      return;
    }
    try {
      await authApi.logout();
    } finally {
      setUsuario(null);
    }
  }

  const value = {
    usuario,
    carregando,
    autenticado: !!usuario,
    entrar,
    entrarFixo,
    cadastrar,
    sair,
    setUsuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
