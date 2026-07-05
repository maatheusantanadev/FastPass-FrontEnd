import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraLayout from "../../components/CameraLayout.jsx";
import ScanFrame from "../../components/ScanFrame.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";

export default function ValidacaoQrScreen() {
  const navigate = useNavigate();
  const { total, contagem, embarcar } = useOperacao();
  const [lendo, setLendo] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function simularLeitura() {
    if (lendo) return;
    setLendo(true);
    timer.current = setTimeout(() => {
      embarcar("qr");
      navigate("/operacao/aprovado");
      setLendo(false);
    }, 1300);
  }

  return (
    <CameraLayout
      modo="qr"
      embarcados={contagem.embarcados}
      total={total}
      legenda={
        lendo ? "Lendo o código…" : "Aproxime o QR Code do passageiro"
      }
    >
      <ScanFrame variant="qr" scanning onCapture={simularLeitura} size={272} />
    </CameraLayout>
  );
}
