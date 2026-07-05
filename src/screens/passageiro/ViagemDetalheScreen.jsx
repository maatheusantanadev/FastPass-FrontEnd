import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Bus, Armchair, MapPin } from "lucide-react";
import Scene from "../../components/Scene.jsx";
import Badge from "../../components/Badge.jsx";
import QRCode from "../../components/QRCode.jsx";
import Button from "../../components/Button.jsx";
import { viagens } from "../../data/viagens.js";
import { usuario } from "../../data/passageiros.js";
import { obterCompra } from "../../api/compras.js";
import { compraParaViagem } from "../../api/adapters.js";

const statusBadge = {
  confirmada: { tone: "success", label: "Confirmada" },
  aguardando: { tone: "warning", label: "Aguardando embarque" },
  concluida: { tone: "neutral", label: "Concluída" },
  cancelada: { tone: "neutral", label: "Cancelada" },
};

function todas() {
  return [...viagens.proximas, ...viagens.anteriores];
}

export default function ViagemDetalheScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [viagem, setViagem] = useState(
    () => todas().find((v) => v.id === id) ?? viagens.proximas[0]
  );

  // Busca o bilhete real; mantém o mock se o backend estiver offline.
  useEffect(() => {
    let vivo = true;
    obterCompra(id)
      .then((c) => {
        if (vivo && c) setViagem(compraParaViagem(c));
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [id]);

  const info = statusBadge[viagem.status] ?? statusBadge.confirmada;
  const proxima = viagem.status !== "concluida" && viagem.status !== "cancelada";
  const qrValue = viagem.codigoQr ?? `FASTPASS|${usuario.codigoEmbarque}|${viagem.id}`;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:overflow-hidden sm:rounded-[34px] sm:shadow-phone">
      <div className="flex-1 overflow-y-auto">
        {/* hero */}
        <div className="relative h-44">
          <Scene variant={viagem.cena} />
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="tap-target absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] flex items-center justify-center rounded-full bg-white/90 text-ink shadow-card"
          >
            <ChevronLeft size={22} />
          </button>
          <span className="absolute right-3 top-[max(0.9rem,env(safe-area-inset-top))]">
            <Badge tone={info.tone}>{info.label}</Badge>
          </span>
        </div>

        <div className="px-5 py-5">
          <h1 className="font-display text-[24px] font-medium leading-tight text-ink">
            {viagem.destino}
          </h1>

          <div className="mt-4 divide-y divide-line rounded-2xl border border-line px-4">
            <div className="flex items-center gap-3 py-3 text-[14px]">
              <Calendar size={17} className="text-cobalt" />
              <span className="text-muted">Data</span>
              <span className="ml-auto font-medium text-ink">{viagem.data}</span>
            </div>
            <div className="flex items-center gap-3 py-3 text-[14px]">
              <Bus size={17} className="text-cobalt" />
              <span className="text-muted">Saída</span>
              <span className="ml-auto text-right font-medium text-ink">
                {viagem.saida}
              </span>
            </div>
            <div className="flex items-center gap-3 py-3 text-[14px]">
              <Armchair size={17} className="text-cobalt" />
              <span className="text-muted">Assento</span>
              <span className="ml-auto font-medium text-ink">{viagem.assento}</span>
            </div>
            <div className="flex items-center gap-3 py-3 text-[14px]">
              <MapPin size={17} className="text-cobalt" />
              <span className="text-muted">Encontro</span>
              <span className="ml-auto text-right font-medium text-ink">
                20 min antes, no portão
              </span>
            </div>
          </div>

          {/* bilhete */}
          <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-cobalt-soft bg-cobalt-tint/30 py-6">
            <QRCode
              value={qrValue}
              size={172}
              label="Bilhete de embarque"
            />
          </div>
        </div>
      </div>

      {proxima && (
        <div className="border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant={viagem.status === "confirmada" ? "primary" : "soft"}
            fullWidth
            onClick={() => navigate("/app/embarque")}
          >
            Fazer embarque
          </Button>
        </div>
      )}
    </div>
  );
}
