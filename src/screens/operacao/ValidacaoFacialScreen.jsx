import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraLayout from "../../components/CameraLayout.jsx";
import ScanFrame from "../../components/ScanFrame.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { useCamera } from "../../hooks/useCamera.js";
import { embarcarPorFacial } from "../../api/embarque.js";

export default function ValidacaoFacialScreen() {
  const navigate = useNavigate();
  const { total, contagem, embarcar, registrarEmbarque, excursaoId } = useOperacao();
  const { videoRef, iniciar, parar, capturar, disponivel } = useCamera({
    facingMode: "environment",
  });
  const [lendo, setLendo] = useState(false);
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
    setLendo(true);

    const imagem = disponivel ? capturar() : null;

    // Sem câmera ou sem excursão real selecionada: modo simulado.
    if (!imagem || !excursaoId) {
      timer.current = setTimeout(() => {
        embarcar("facial");
        setLendo(false);
        navigate("/operacao/aprovado");
      }, 1600);
      return;
    }

    try {
      const res = await embarcarPorFacial(excursaoId, imagem); // POST /embarque/facial
      if (res?.compra) registrarEmbarque(res.compra, "facial");
      else embarcar("facial");
      parar();
      navigate("/operacao/aprovado");
    } catch (err) {
      if (err.offline) {
        embarcar("facial");
        navigate("/operacao/aprovado");
      } else {
        // Passageiro não reconhecido (404) ou outro erro.
        navigate("/operacao/nao-identificado");
      }
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
        lendo
          ? "Lendo o rosto do passageiro…"
          : "Aponte a câmera para o rosto do passageiro"
      }
      rodape={
        <button
          type="button"
          onClick={() => navigate("/operacao/nao-identificado")}
          className="mt-4 text-[13px] font-medium text-white/50 underline underline-offset-4"
        >
          simular falha
        </button>
      }
    >
      <ScanFrame variant="facial" scanning onCapture={ler} size={272} videoRef={videoRef} />
    </CameraLayout>
  );
}
