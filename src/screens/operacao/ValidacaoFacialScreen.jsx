import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraLayout from "../../components/CameraLayout.jsx";
import ScanFrame from "../../components/ScanFrame.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { useCamera } from "../../hooks/useCamera.js";
import { embarcarPorFacial } from "../../api/embarque.js";

export default function ValidacaoFacialScreen() {
  const navigate = useNavigate();
  const { total, contagem, registrarEmbarque, excursaoId } = useOperacao();
  const { videoRef, iniciar, parar, capturar, disponivel } = useCamera({
    facingMode: "environment",
  });
  const [lendo, setLendo] = useState(false);
  const [erro, setErro] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    iniciar();
    return () => {
      clearTimeout(timer.current);
      parar();
    };
  }, [iniciar, parar]);

  async function ler() {
    if (lendo) return;

    if (!excursaoId) {
      setErro("Nenhuma viagem selecionada. Volte e escolha a viagem em operação.");
      return;
    }

    const imagem = disponivel ? capturar() : null;
    if (!imagem) {
      setErro("Câmera não disponível neste dispositivo.");
      return;
    }

    setErro(null);
    setLendo(true);
    try {
      const res = await embarcarPorFacial(excursaoId, imagem); // POST /embarque/facial
      registrarEmbarque(res.compra, "facial");
      parar();
      navigate("/operacao/aprovado");
    } catch {
      // Passageiro não reconhecido (404) ou outro erro do backend.
      navigate("/operacao/nao-identificado");
    } finally {
      setLendo(false);
    }
  }

  return (
    <CameraLayout
      modo="facial"
      embarcados={contagem.embarcados}
      total={total}
      legenda={
        erro
          ? erro
          : lendo
          ? "Lendo o rosto do passageiro…"
          : "Aponte a câmera para o rosto do passageiro"
      }
      rodape={
        <button
          type="button"
          onClick={() => navigate("/operacao/nao-identificado")}
          className="mt-4 text-[13px] font-medium text-white/50 underline underline-offset-4"
        >
          usar outro método
        </button>
      }
    >
      <ScanFrame variant="facial" scanning onCapture={ler} size={272} videoRef={videoRef} />
    </CameraLayout>
  );
}
