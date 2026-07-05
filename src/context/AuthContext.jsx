import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth.js";
import { getToken, setToken } from "../api/client.js";

// Sessão do usuário autenticado contra a API (token Bearer persistido).
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o app, se houver token salvo, recupera o usuário.
  useEffect(() => {
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

  async function cadastrar(payload) {
    const data = await authApi.register(payload);
    setUsuario(data.usuario ?? null);
    return data;
  }

  async function sair() {
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
