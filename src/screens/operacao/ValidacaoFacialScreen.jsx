import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraLayout from "../../components/CameraLayout.jsx";
import ScanFrame from "../../components/ScanFrame.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ValidacaoFacialScreen() {
  const navigate = useNavigate();
  const { total, contagem, embarcar } = useOperacao();
  const [lendo, setLendo] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function simularLeitura() {
    if (lendo) return;
    setLendo(true);
    timer.current = setTimeout(() => {
      const p = embarcar("facial");
      navigate("/operacao/aprovado", { replace: false });
      setLendo(false);
      if (!p) return;
    }, 1600);
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
      <ScanFrame variant="facial" scanning onCapture={simularLeitura} size={272} />
    </CameraLayout>
  );
}
