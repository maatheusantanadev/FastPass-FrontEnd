import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import CameraLayout from "../../components/CameraLayout.jsx";
import Avatar from "../../components/Avatar.jsx";
import Button from "../../components/Button.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import {
  listarPedidosMotorista,
  aprovarPedidoMotorista,
  reprovarPedidoMotorista,
} from "../../api/motorista.js";

// Uma foto em base64 vira <img>; se vier vazia (compra sem biometria
// cadastrada), mostra um espaço reservado.
function Foto({ src, legenda }) {
  return (
    <div className="flex-1">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-white/10">
        {src ? (
          <img src={src} alt={legenda} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[12px] text-white/40">
            Sem foto
          </div>
        )}
      </div>
      <p className="mt-1.5 text-center text-[11px] uppercase tracking-wide text-white/50">
        {legenda}
      </p>
    </div>
  );
}

export default function PedidosEmbarqueScreen() {
  const navigate = useNavigate();
  const { total, contagem, excursaoId, registrarEmbarque } = useOperacao();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [processandoId, setProcessandoId] = useState(null);

  const carregar = useCallback(async () => {
    if (!excursaoId) return;
    try {
      const lista = await listarPedidosMotorista(excursaoId);
      setPedidos(Array.isArray(lista) ? lista : []);
      setErro(null);
    } catch (err) {
      setErro(err.message || "Não foi possível carregar os pedidos.");
    } finally {
      setCarregando(false);
    }
  }, [excursaoId]);

  // Busca a lista ao entrar e a cada poucos segundos (novos pedidos chegam
  // a qualquer momento, enviados pelo app do passageiro).
  useEffect(() => {
    carregar();
    const intervalo = setInterval(carregar, 5000);
    return () => clearInterval(intervalo);
  }, [carregar]);

  async function aprovar(pedido) {
    setProcessandoId(pedido.id);
    try {
      const res = await aprovarPedidoMotorista(pedido.id);
      if (res?.compra) registrarEmbarque(res.compra, "facial");
      setPedidos((prev) => prev.filter((p) => p.id !== pedido.id));
    } catch (err) {
      setErro(err.message || "Não foi possível aprovar o pedido.");
    } finally {
      setProcessandoId(null);
    }
  }

  async function reprovar(pedido) {
    setProcessandoId(pedido.id);
    try {
      await reprovarPedidoMotorista(pedido.id);
      setPedidos((prev) => prev.filter((p) => p.id !== pedido.id));
    } catch (err) {
      setErro(err.message || "Não foi possível reprovar o pedido.");
    } finally {
      setProcessandoId(null);
    }
  }

  return (
    <CameraLayout
      modo="facial"
      embarcados={contagem.embarcados}
      total={total}
      legenda={
        carregando
          ? "Carregando pedidos…"
          : pedidos.length === 0
          ? "Nenhum pedido de embarque no momento"
          : `${pedidos.length} pedido(s) aguardando validação`
      }
    >
      <div className="flex w-full flex-1 flex-col gap-3 overflow-y-auto px-1 py-2">
        {erro && (
          <p className="rounded-xl bg-danger/20 px-3 py-2 text-center text-[13px] text-white">
            {erro}
          </p>
        )}

        {pedidos.map((pedido) => {
          const nome = pedido.compra?.user?.name ?? "Passageiro";
          const cpf = pedido.compra?.user?.cpf ?? "—";
          const processando = processandoId === pedido.id;
          return (
            <div key={pedido.id} className="rounded-2xl bg-white/5 p-3">
              <div className="flex items-center gap-2.5">
                <Avatar nome={nome} size="sm" className="bg-white/15 text-white" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium text-white">{nome}</p>
                  <p className="text-[12px] text-white/50">CPF {cpf}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-3">
                <Foto src={pedido.compra?.foto_referencia} legenda="Cadastrada" />
                <Foto src={pedido.foto_enviada} legenda="Enviada agora" />
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  variant="soft"
                  icon={X}
                  fullWidth
                  disabled={processando}
                  onClick={() => reprovar(pedido)}
                  className="!bg-white/10 !text-white hover:!bg-white/20"
                >
                  Reprovar
                </Button>
                <Button
                  variant="primary"
                  icon={Check}
                  fullWidth
                  disabled={processando}
                  onClick={() => aprovar(pedido)}
                >
                  {processando ? "Processando…" : "Aprovar"}
                </Button>
              </div>
            </div>
          );
        })}

        {!carregando && pedidos.length === 0 && !erro && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="max-w-[260px] text-[14px] leading-relaxed text-white/60">
              Assim que um passageiro solicitar o embarque pela selfie, o
              pedido aparece aqui para você comparar as fotos.
            </p>
            <button
              type="button"
              onClick={() => navigate("/operacao/qr")}
              className="text-[13px] font-medium text-white/70 underline underline-offset-4"
            >
              Ler QR Code em vez disso
            </button>
          </div>
        )}
      </div>
    </CameraLayout>
  );
}
