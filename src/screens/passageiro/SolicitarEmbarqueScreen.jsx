import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScanFrame from "../../components/ScanFrame.jsx";
import Button from "../../components/Button.jsx";
import { useCamera } from "../../hooks/useCamera.js";
import { solicitarEmbarque } from "../../api/embarque.js";

export default function SolicitarEmbarqueScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { videoRef, iniciar, parar, capturar, disponivel } = useCamera();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    iniciar();
    return () => parar();
  }, [iniciar, parar]);

  async function enviar() {
    if (enviando) return;

    const imagem = disponivel ? capturar() : null;
    if (!imagem) {
      setErro("Câmera não disponível neste dispositivo.");
      return;
    }

    setErro(null);
    setEnviando(true);
    try {
      await solicitarEmbarque(Number(id), imagem);
      parar();
      navigate(`/app/embarque/${id}/aguardando`);
    } catch (err) {
      setErro(err.message || "Não foi possível enviar o pedido de embarque.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-cobalt px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.75rem,env(safe-area-inset-bottom))] text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <span className="mt-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-badge">
        Pedido de embarque
      </span>

      <div className="flex flex-1 flex-col items-center justify-center">
        <ScanFrame variant="facial" scanning={enviando} onCapture={enviar} videoRef={videoRef} />

        <div className="mt-10 text-center">
          <h1 className="font-display text-[24px] font-medium">Tire uma selfie</h1>
          <p className="mx-auto mt-2 max-w-[290px] text-[14px] leading-relaxed text-white/70">
            {erro ??
              "O motorista vai comparar esta foto com a que você cadastrou e confirmar seu embarque."}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button variant="soft" fullWidth onClick={enviar} disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar pedido"}
        </Button>
        <button
          type="button"
          onClick={() => navigate(`/app/embarque/${id}`)}
          className="tap-target text-[14px] font-medium text-white/80 hover:text-white"
        >
          Usar outro método
        </button>
      </div>
    </div>
  );
}
