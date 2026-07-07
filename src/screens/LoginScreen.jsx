import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import BrandPanel from "../components/BrandPanel.jsx";
import TextField from "../components/TextField.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const navigate = useNavigate();
  const { entrar } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (!EMAIL_RE.test(email)) {
      nextErrors.email = "Digite um e-mail válido.";
    }
    if (!password) {
      nextErrors.password = "Digite sua senha.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setEnviando(true);
    try {
      const data = await entrar({ email, password });
      const role = data?.usuario?.role;
      if (role === "motorista") navigate("/operacao");
      else if (role === "administrador") navigate("/painel");
      else navigate("/app/explorar");
    } catch (err) {
      if (err.offline) {
        setErrors({ password: "Não foi possível conectar ao servidor. Tente novamente." });
        return;
      }
      setErrors({ password: err.message || "Credenciais inválidas." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <BrandPanel>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col"
      >
        <header className="mb-8">
          <h1 className="font-display text-[32px] font-medium leading-tight text-ink">
            Entrar
          </h1>
          <p className="mt-1 font-body text-[15px] text-muted">
            Bem-vindo de volta
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <TextField
            label="E-mail"
            type="email"
            icon={Mail}
            placeholder="voce@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <div>
            <TextField
              label="Senha"
              type="password"
              icon={Lock}
              placeholder="Sua senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <div className="mt-2 flex justify-end">
              <Link
                to="/recuperar-senha"
                className="tap-target flex items-center font-body text-[13px] font-medium text-cobalt hover:text-cobalt-dark"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={enviando}>
            {enviando ? "Entrando…" : "Entrar"}
          </Button>
        </form>

        <p className="mt-auto pt-10 text-center font-body text-[14px] text-muted">
          Novo por aqui?{" "}
          <Link to="/cadastro" className="font-semibold text-cobalt hover:text-cobalt-dark">
            Criar conta
          </Link>
        </p>
      </motion.div>
    </BrandPanel>
  );
}
