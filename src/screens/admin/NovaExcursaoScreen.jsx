import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import Button from "../../components/Button.jsx";

function Campo({ label, className = "", children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink/80">{label}</span>
      {children ?? (
        <input
          className="h-[46px] w-full rounded-[12px] border border-line bg-cobalt-tint/40 px-3.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-cobalt focus:bg-white focus:outline-none"
          {...props}
        />
      )}
    </label>
  );
}

export default function NovaExcursaoScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destino: "",
    categoria: "praia",
    data: "",
    saida: "",
    retorno: "",
    preco: "",
    capacidade: "33",
    empresa: "Bahia Sol Turismo",
  });
  const [erros, setErros] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function publicar(e) {
    e.preventDefault();
    const next = {};
    if (form.destino.trim().length < 3) next.destino = "Informe o destino.";
    if (!form.data.trim()) next.data = "Informe a data.";
    if (!form.preco || Number(form.preco) <= 0) next.preco = "Informe o preço.";
    setErros(next);
    if (Object.keys(next).length === 0) navigate("/painel/excursoes");
  }

  return (
    <DashboardShell
      title="Nova excursão"
      subtitle="Cadastro de viagem"
      actions={
        <Button
          variant="soft"
          icon={ArrowLeft}
          className="px-4 py-2 text-[13px]"
          onClick={() => navigate("/painel/excursoes")}
        >
          Voltar
        </Button>
      }
    >
      <form onSubmit={publicar} noValidate className="max-w-2xl">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Campo
              label="Destino"
              className="sm:col-span-2"
              placeholder="Ex.: Praia do Forte"
              value={form.destino}
              onChange={set("destino")}
            />
            {erros.destino && (
              <p className="-mt-3 text-[13px] text-danger sm:col-span-2">{erros.destino}</p>
            )}

            <Campo label="Categoria">
              <select
                value={form.categoria}
                onChange={set("categoria")}
                className="h-[46px] w-full rounded-[12px] border border-line bg-cobalt-tint/40 px-3.5 text-[15px] text-ink focus:border-cobalt focus:bg-white focus:outline-none"
              >
                <option value="praia">Praia</option>
                <option value="aventura">Aventura</option>
              </select>
            </Campo>
            <Campo label="Data" placeholder="Ex.: 19 ago, sáb" value={form.data} onChange={set("data")} />

            <Campo label="Saída" placeholder="06:30 · Terminal da França" value={form.saida} onChange={set("saida")} />
            <Campo label="Retorno" placeholder="19:00 · destino" value={form.retorno} onChange={set("retorno")} />

            <Campo
              label="Preço por pessoa (R$)"
              type="number"
              inputMode="numeric"
              placeholder="180"
              value={form.preco}
              onChange={set("preco")}
            />
            <Campo
              label="Capacidade"
              type="number"
              inputMode="numeric"
              value={form.capacidade}
              onChange={set("capacidade")}
            />

            <Campo label="Empresa" className="sm:col-span-2" value={form.empresa} onChange={set("empresa")} />
          </div>
          {(erros.data || erros.preco) && (
            <p className="mt-4 text-[13px] text-danger">
              {erros.data || erros.preco}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button
            variant="ghost"
            className="px-5 py-2.5 text-[14px]"
            onClick={() => navigate("/painel/excursoes")}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={Check} className="px-5 py-2.5 text-[14px]">
            Publicar excursão
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
