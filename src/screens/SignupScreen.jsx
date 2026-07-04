import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Phone, IdCard, Lock } from "lucide-react";
import BrandPanel from "../components/BrandPanel.jsx";
import TextField from "../components/TextField.jsx";
import Button from "../components/Button.jsx";
import { formatPhone, formatCPF, passwordStrength } from "../utils/masks.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const strengthLabels = ["Fraca", "Razoável", "Boa", "Forte"];
const strengthColors = ["bg-red-400", "bg-amber-400", "bg-amber-400", "bg-success"];

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const strength = passwordStrength(form.password);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};

    if (form.name.trim().length < 3) {
      nextErrors.name = "Digite seu nome completo.";
    }
    if (!EMAIL_RE.test(form.email)) {
      nextErrors.email = "Digite um e-mail válido.";
    }
    if (form.phone.replace(/\D/g, "").length < 11) {
      nextErrors.phone = "Telefone incompleto.";
    }
    if (form.cpf.replace(/\D/g, "").length < 11) {
      nextErrors.cpf = "CPF incompleto.";
    }
    if (form.password.length < 6) {
      nextErrors.password = "Mínimo de 6 caracteres.";
    }

    setErrors(nextErrors);
    setSuccess(Object.keys(nextErrors).length === 0);
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
        <header className="mb-7">
          <h1 className="font-display text-[32px] font-medium leading-tight text-ink">
            Criar conta
          </h1>
          <p className="mt-1 font-body text-[15px] text-muted">
            Comece em menos de um minuto
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <TextField
            label="Nome completo"
            icon={User}
            placeholder="Seu nome"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            error={errors.name}
          />

          <TextField
            label="E-mail"
            type="email"
            icon={Mail}
            placeholder="voce@email.com"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />

          <TextField
            label="Telefone"
            icon={Phone}
            placeholder="(71) 9 9999-9999"
            inputMode="numeric"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", formatPhone(e.target.value))}
            error={errors.phone}
          />

          <TextField
            label="CPF"
            icon={IdCard}
            placeholder="000.000.000-00"
            inputMode="numeric"
            value={form.cpf}
            onChange={(e) => update("cpf", formatCPF(e.target.value))}
            error={errors.cpf}
          />

          <div>
            <TextField
              label="Senha"
              type="password"
              icon={Lock}
              placeholder="Crie uma senha"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              error={errors.password}
            />
            {form.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex flex-1 gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                        i < strength ? strengthColors[strength] : "bg-line"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-[12px] text-muted">
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>

          <p className="font-body text-[12px] leading-relaxed text-muted">
            Ao continuar, você concorda com os Termos de Uso e a Política de
            Privacidade.
          </p>

          {success && (
            <p className="font-body text-[13px] font-medium text-success" role="status">
              Conta criada — tudo pronto para embarcar.
            </p>
          )}

          <Button type="submit" variant="primary" fullWidth>
            Criar conta
          </Button>
        </form>

        <p className="mt-8 text-center font-body text-[14px] text-muted">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-cobalt hover:text-cobalt-dark">
            Entrar
          </Link>
        </p>
      </motion.div>
    </BrandPanel>
  );
}
