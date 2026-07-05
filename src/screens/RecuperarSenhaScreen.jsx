import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Lock } from "lucide-react";
import BrandPanel from "../components/BrandPanel.jsx";
import AppHeader from "../components/AppHeader.jsx";
import TextField from "../components/TextField.jsx";
import Button from "../components/Button.jsx";
import SuccessCheck from "../components/SuccessCheck.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecuperarSenhaScreen() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState("email"); // email | codigo | ok
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});

  function enviarCodigo(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setErros({ email: "Digite um e-mail válido." });
      return;
    }
    setErros({});
    setEtapa("codigo");
  }

  function redefinir(e) {
    e.preventDefault();
    const next = {};
    if (codigo.replace(/\D/g, "").length < 4) next.codigo = "Código de 4 dígitos.";
    if (senha.length < 6) next.senha = "Mínimo de 6 caracteres.";
    setErros(next);
    if (Object.keys(next).length === 0) setEtapa("ok");
  }

  return (
    <BrandPanel>
      <div className="-mx-6 -mt-14 sm:-mx-8 sm:-mt-10">
        <AppHeader
          title="Recuperar senha"
          onBack={() => (etapa === "codigo" ? setEtapa("email") : navigate("/login"))}
          border={false}
        />
      </div>

      <AnimatePresence mode="wait">
        {etapa === "email" && (
          <motion.form
            key="email"
            onSubmit={enviarCodigo}
            noValidate
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <p className="mb-6 font-body text-[15px] leading-relaxed text-muted">
              Informe o e-mail da sua conta. Enviaremos um código de 4 dígitos
              para você criar uma nova senha.
            </p>
            <TextField
              label="E-mail"
              type="email"
              icon={Mail}
              placeholder="voce@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={erros.email}
            />
            <Button type="submit" variant="primary" fullWidth className="mt-6">
              Enviar código
            </Button>
            <p className="mt-auto pt-10 text-center font-body text-[14px] text-muted">
              Lembrou a senha?{" "}
              <Link to="/login" className="font-semibold text-cobalt hover:text-cobalt-dark">
                Entrar
              </Link>
            </p>
          </motion.form>
        )}

        {etapa === "codigo" && (
          <motion.form
            key="codigo"
            onSubmit={redefinir}
            noValidate
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col gap-5"
          >
            <p className="font-body text-[15px] leading-relaxed text-muted">
              Enviamos um código para{" "}
              <span className="font-semibold text-ink">{email}</span>.
            </p>
            <TextField
              label="Código de verificação"
              icon={KeyRound}
              inputMode="numeric"
              placeholder="0000"
              maxLength={4}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
              error={erros.codigo}
            />
            <TextField
              label="Nova senha"
              type="password"
              icon={Lock}
              placeholder="Crie uma nova senha"
              autoComplete="new-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={erros.senha}
            />
            <Button type="submit" variant="primary" fullWidth className="mt-1">
              Redefinir senha
            </Button>
            <button
              type="button"
              onClick={() => setEtapa("email")}
              className="tap-target text-center text-[14px] font-medium text-muted hover:text-ink"
            >
              Não recebi o código
            </button>
          </motion.form>
        )}

        {etapa === "ok" && (
          <motion.div
            key="ok"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <SuccessCheck size={84} />
            <h2 className="mt-6 font-display text-[24px] font-medium text-ink">
              Senha redefinida
            </h2>
            <p className="mt-2 max-w-[280px] font-body text-[15px] leading-relaxed text-muted">
              Pronto! Use sua nova senha para entrar.
            </p>
            <Button
              variant="primary"
              fullWidth
              className="mt-8"
              onClick={() => navigate("/login")}
            >
              Voltar para entrar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </BrandPanel>
  );
}
