import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Protege um grupo de rotas (via <Outlet />) exigindo que o usuário logado
// tenha o `role` informado. Sem sessão ou com o perfil errado, manda pro login.
export default function RotaProtegida({ perfil }) {
  const { usuario, carregando } = useAuth();

  // Evita "flash" de redirecionamento enquanto a sessão ainda está sendo lida.
  if (carregando) return null;

  if (!usuario || usuario.role !== perfil) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
