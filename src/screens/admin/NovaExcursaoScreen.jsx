import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import Button from "../../components/Button.jsx";
import { criarExcursao } from "../../api/excursoes.js";

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

const selectClass =
  "h-[46px] w-full rounded-[12px] border border-line bg-cobalt-tint/40 px-3.5 text-[15px] text-ink focus:border-cobalt focus:bg-white focus:outline-none";

export default function NovaExcursaoScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    destino: "",
    categoria: "praia",
    cena: "praia",
    empresa: "Bahia Sol Turismo",
    dataSaida: "",
    horaSaida: "06:30",
    pontoPartida: "Terminal da França",
    dataRetorno: "",
    horaRetorno: "19:00",
    pontoRetorno: "",
    preco: "",
    capacidade: "33",
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function publicar(e) {
    e.preventDefault();
    const next = {};
    if (form.destino.trim().length < 3) next.destino = "Informe o destino.";
    if (!form.dataSaida) next.dataSaida = "Informe a data de saída.";
    if (!form.preco || Number(form.preco) <= 0) next.preco = "Informe o preço.";
    if (!form.capacidade || Number(form.capacidade) <= 0)
      next.capacidade = "Informe a capacidade.";
    setErros(next);
    if (Object.keys(next).length > 0) return;

    const payload = {
      titulo: form.destino.trim(),
      destino: form.destino.trim(),
      categoria: form.categoria,
      cena: form.cena,
      empresa: form.empresa.trim() || null,
      ponto_partida: form.pontoPartida.trim() || null,
      ponto_retorno: form.pontoRetorno.trim() || null,
      data_saida: `${form.dataSaida}T${form.horaSaida || "06:00"}`,
      data_retorno: form.dataRetorno
        ? `${form.dataRetorno}T${form.horaRetorno || "18:00"}`
        : null,
      preco: Number(form.preco),
      vagas_total: Number(form.capacidade),
    };

    setEnviando(true);
    try {
      await criarExcursao(payload);
      navigate("/painel/excursoes");
    } catch (err) {
      if (err.offline) {
        navigate("/painel/excursoes"); // modo demonstração
        return;
      }
      setErros({ geral: err.message || "Não foi possível publicar a excursão." });
    } finally {
      setEnviando(false);
    }
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
              <select value={form.categoria} onChange={set("categoria")} className={selectClass}>
                <option value="praia">Praia</option>
                <option value="aventura">Aventura</option>
              </select>
            </Campo>
            <Campo label="Cena (ilustração)">
              <select value={form.cena} onChange={set("cena")} className={selectClass}>
                <option value="praia">Praia</option>
                <option value="montanha">Montanha</option>
                <option value="ilha">Ilha</option>
              </select>
            </Campo>

            <Campo label="Data de saída" type="date" value={form.dataSaida} onChange={set("dataSaida")} />
            <Campo label="Hora de saída" type="time" value={form.horaSaida} onChange={set("horaSaida")} />
            <Campo
              label="Ponto de partida"
              className="sm:col-span-2"
              placeholder="Ex.: Terminal da França"
              value={form.pontoPartida}
              onChange={set("pontoPartida")}
            />

            <Campo label="Data de retorno" type="date" value={form.dataRetorno} onChange={set("dataRetorno")} />
            <Campo label="Hora de retorno" type="time" value={form.horaRetorno} onChange={set("horaRetorno")} />
            <Campo
              label="Ponto de retorno"
              className="sm:col-span-2"
              placeholder="Ex.: Praia do Forte"
              value={form.pontoRetorno}
              onChange={set("pontoRetorno")}
            />

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
          {(erros.dataSaida || erros.preco || erros.capacidade || erros.geral) && (
            <p className="mt-4 text-[13px] text-danger">
              {erros.dataSaida || erros.preco || erros.capacidade || erros.geral}
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
          <Button
            type="submit"
            variant="primary"
            icon={Check}
            className="px-5 py-2.5 text-[14px]"
            disabled={enviando}
          >
            {enviando ? "Publicando…" : "Publicar excursão"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
