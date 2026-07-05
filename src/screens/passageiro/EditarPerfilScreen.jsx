import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Check } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import TextField from "../../components/TextField.jsx";
import Avatar from "../../components/Avatar.jsx";
import Button from "../../components/Button.jsx";
import { usuario } from "../../data/passageiros.js";
import { formatPhone } from "../../utils/masks.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EditarPerfilScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: usuario.nomeCompleto,
    email: "maria@email.com",
    telefone: "(71) 9 9888-7766",
  });
  const [erros, setErros] = useState({});
  const [salvo, setSalvo] = useState(false);

  function update(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    setSalvo(false);
  }

  function salvar(e) {
    e.preventDefault();
    const next = {};
    if (form.nome.trim().length < 3) next.nome = "Digite seu nome completo.";
    if (!EMAIL_RE.test(form.email)) next.email = "Digite um e-mail válido.";
    if (form.telefone.replace(/\D/g, "").length < 11) next.telefone = "Telefone incompleto.";
    setErros(next);
    if (Object.keys(next).length === 0) {
      setSalvo(true);
      setTimeout(() => navigate("/app/perfil"), 900);
    }
  }

  return (
    <MobileShell
      header={<AppHeader title="Editar perfil" onBack={() => navigate("/app/perfil")} />}
      footer={
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button type="submit" form="form-perfil" variant="primary" fullWidth>
            Salvar alterações
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center px-5 pt-6">
        <Avatar nome={form.nome} size="lg" tone="solid" className="h-20 w-20 text-[22px]" />
        <button
          type="button"
          className="mt-3 text-[14px] font-semibold text-cobalt hover:text-cobalt-dark"
        >
          Trocar foto
        </button>
      </div>

      <form id="form-perfil" onSubmit={salvar} noValidate className="flex flex-col gap-5 px-5 py-6">
        <TextField
          label="Nome completo"
          icon={User}
          value={form.nome}
          onChange={(e) => update("nome", e.target.value)}
          error={erros.nome}
        />
        <TextField
          label="E-mail"
          type="email"
          icon={Mail}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={erros.email}
        />
        <TextField
          label="Telefone"
          icon={Phone}
          inputMode="numeric"
          value={form.telefone}
          onChange={(e) => update("telefone", formatPhone(e.target.value))}
          error={erros.telefone}
        />

        <AnimatePresence>
          {salvo && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-success"
              role="status"
            >
              <Check size={16} strokeWidth={3} /> Alterações salvas
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </MobileShell>
  );
}
