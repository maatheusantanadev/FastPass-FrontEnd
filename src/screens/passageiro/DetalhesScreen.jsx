import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Bus, Clock, Users, Building2 } from "lucide-react";
import Scene from "../../components/Scene.jsx";
import Button from "../../components/Button.jsx";
import { usePedido } from "../../context/PedidoContext.jsx";
import { obterExcursao } from "../../api/excursoes.js";
import { excursaoDoBackend } from "../../api/adapters.js";
import { formatBRL } from "../../utils/format.js";

function Linha({ icon: Icon, label, valor }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-cobalt" />
      <div>
        <p className="text-[12px] uppercase tracking-wide text-muted">{label}</p>
        <p className="text-[15px] font-medium text-ink">{valor}</p>
      </div>
    </div>
  );
}

export default function DetalhesScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setExcursao } = usePedido();
  const [excursao, setExcursaoLocal] = useState(null);

  useEffect(() => {
    let vivo = true;
    obterExcursao(id)
      .then((e) => {
        if (vivo && e) setExcursaoLocal(excursaoDoBackend(e));
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [id]);

  function comprar() {
    setExcursao(excursao);
    navigate("/app/assentos");
  }

  if (!excursao) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-white text-muted sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="tap-target absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] flex items-center justify-center rounded-full bg-white/90 text-ink shadow-card"
        >
          <ChevronLeft size={22} />
        </button>
        <p className="text-[15px]">Carregando excursão…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:overflow-hidden sm:rounded-[34px] sm:shadow-phone">
      <div className="flex-1 overflow-y-auto">
        {/* hero */}
        <div className="relative h-60">
          <Scene variant={excursao.cena} />
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="tap-target absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] flex items-center justify-center rounded-full bg-white/90 text-ink shadow-card"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-cobalt-dark">
            {excursao.duracao}
          </span>
        </div>

        <div className="px-5 py-5">
          <h1 className="font-display text-[26px] font-medium leading-tight text-ink">
            {excursao.destino}
          </h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-muted">
            <Building2 size={14} strokeWidth={2} /> {excursao.empresa}
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
            {excursao.descricao}
          </p>

          <div className="mt-4 divide-y divide-line rounded-2xl border border-line px-4">
            <Linha icon={Bus} label="Saída" valor={excursao.saida} />
            <Linha icon={Clock} label="Retorno" valor={excursao.retorno} />
            <Linha
              icon={Users}
              label="Vagas"
              valor={`${excursao.vagas} de ${excursao.total} disponíveis`}
            />
          </div>
        </div>
      </div>

      {/* barra de compra */}
      <div className="flex items-center gap-4 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div>
          <p className="text-[12px] text-muted">a partir de</p>
          <p className="font-display text-[24px] font-semibold text-cobalt">
            {formatBRL(excursao.preco)}
          </p>
        </div>
        <Button variant="primary" className="flex-1" onClick={comprar}>
          Comprar passagem
        </Button>
      </div>
    </div>
  );
}
