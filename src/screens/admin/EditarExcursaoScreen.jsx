import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import DashboardShell from "../../components/DashboardShell.jsx";
import Button from "../../components/Button.jsx";
import { obterExcursao, atualizarExcursao } from "../../api/excursoes.js";

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

// ISO (UTC) → partes de data/hora locais para os inputs.
function partes(iso) {
  if (!iso) return { data: "", hora: "" };
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return {
    data: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`,
    hora: `${p(d.getHours())}:${p(d.getMinutes())}`,
  };
}

export default function EditarExcursaoScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let vivo = true;
    obterExcursao(id)
      .then((e) => {
        if (!vivo || !e) return;
        const s = partes(e.data_saida);
        const r = partes(e.data_retorno);
        setForm({
          destino: e.destino ?? "",
          categoria: e.categoria ?? "praia",
          cena: e.cena ?? "praia",
          empresa: e.empresa ?? "",
          dataSaida: s.data,
          horaSaida: s.hora,
          pontoPartida: e.ponto_partida ?? "",
          dataRetorno: r.data,
          horaRetorno: r.hora,
          pontoRetorno: e.ponto_retorno ?? "",
          preco: String(e.preco ?? ""),
          capacidade: String(e.vagas_total ?? ""),
          status: e.status ?? "aberta",
        });
      })
      .catch(() => setErros({ geral: "Não foi possível carregar a excursão." }));
    return () => {
      vivo = false;
    };
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function salvar(ev) {
    ev.preventDefault();
    const next = {};
    if (form.destino.trim().length < 3) next.destino = "Informe o destino.";
    if (!form.dataSaida) next.dataSaida = "Informe a data de saída.";
    if (!form.preco || Number(form.preco) <= 0) next.preco = "Informe o preço.";
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
      status: form.status,
    };

    setEnviando(true);
    try {
      await atualizarExcursao(id, payload);
      navigate(`/painel/excursoes/${id}`);
    } catch (err) {
      if (err.offline) {
        navigate(`/painel/excursoes/${id}`);
        return;
      }
      setErros({ geral: err.message || "Não foi possível salvar." });
    } finally {
      setEnviando(false);
    }
  }

  if (!form) {
    return (
      <DashboardShell title="Editar excursão" subtitle="Carregando…">
        <p className="text-[14px] text-muted">{erros.geral ?? "Carregando…"}</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Editar excursão"
      subtitle={form.destino}
      actions={
        <Button
          variant="soft"
          icon={ArrowLeft}
          className="px-4 py-2 text-[13px]"
          onClick={() => navigate(`/painel/excursoes/${id}`)}
        >
          Voltar
        </Button>
      }
    >
      <form onSubmit={salvar} noValidate className="max-w-2xl">
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Campo
              label="Destino"
              className="sm:col-span-2"
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
            <Campo label="Ponto de partida" className="sm:col-span-2" value={form.pontoPartida} onChange={set("pontoPartida")} />

            <Campo label="Data de retorno" type="date" value={form.dataRetorno} onChange={set("dataRetorno")} />
            <Campo label="Hora de retorno" type="time" value={form.horaRetorno} onChange={set("horaRetorno")} />
            <Campo label="Ponto de retorno" className="sm:col-span-2" value={form.pontoRetorno} onChange={set("pontoRetorno")} />

            <Campo label="Preço por pessoa (R$)" type="number" inputMode="numeric" value={form.preco} onChange={set("preco")} />
            <Campo label="Capacidade" type="number" inputMode="numeric" value={form.capacidade} onChange={set("capacidade")} />

            <Campo label="Empresa" value={form.empresa} onChange={set("empresa")} />
            <Campo label="Situação">
              <select value={form.status} onChange={set("status")} className={selectClass}>
                <option value="aberta">Aberta</option>
                <option value="encerrada">Encerrada</option>
                <option value="concluida">Concluída</option>
              </select>
            </Campo>
          </div>
          {(erros.dataSaida || erros.preco || erros.geral) && (
            <p className="mt-4 text-[13px] text-danger">
              {erros.dataSaida || erros.preco || erros.geral}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <Button
            variant="ghost"
            className="px-5 py-2.5 text-[14px]"
            onClick={() => navigate(`/painel/excursoes/${id}`)}
          >
            Cancelar
          </Button>
          <Button type="submit" variant="primary" icon={Check} className="px-5 py-2.5 text-[14px]" disabled={enviando}>
            {enviando ? "Salvando…" : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
