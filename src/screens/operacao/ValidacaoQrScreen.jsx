import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CameraLayout from "../../components/CameraLayout.jsx";
import ScanFrame from "../../components/ScanFrame.jsx";
import { useOperacao } from "../../context/OperacaoContext.jsx";
import { useCamera } from "../../hooks/useCamera.js";
import { embarcarPorQrCode } from "../../api/embarque.js";

export default function ValidacaoQrScreen() {
  const navigate = useNavigate();
  const { total, contagem, embarcar, registrarEmbarque } = useOperacao();
  const { videoRef, iniciar, parar, disponivel } = useCamera({
    facingMode: "environment",
  });
  const [lendo, setLendo] = useState(false);
  const lendoRef = useRef(false);
  const timer = useRef(null);

  async function processar(codigo) {
    if (lendoRef.current) return;
    lendoRef.current = true;
    setLendo(true);
    try {
      const res = await embarcarPorQrCode(codigo); // POST /embarque/qrcode
      if (res?.compra) registrarEmbarque(res.compra, "qr");
      else embarcar("qr");
      parar();
      navigate("/operacao/aprovado");
    } catch (err) {
      if (err.offline) {
        embarcar("qr");
        parar();
        navigate("/operacao/aprovado");
      } else {
        navigate("/operacao/nao-identificado");
      }
    } finally {
      lendoRef.current = false;
      setLendo(false);
    }
  }

  // Câmera + leitura real de QR (BarcodeDetector). Sem suporte, o toque simula.
  useEffect(() => {
    let ativo = true;
    iniciar().then((ok) => {
      if (!ativo || !ok || !("BarcodeDetector" in window)) return;
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      timer.current = setInterval(async () => {
        if (!ativo || lendoRef.current || !videoRef.current?.videoWidth) return;
        try {
          const codes = await detector.detect(videoRef.current);
          const codigo = codes?.[0]?.rawValue?.trim();
          if (codigo) processar(codigo);
        } catch {
          /* frame ilegível — ignora */
        }
      }, 400);
    });
    return () => {
      ativo = false;
      clearInterval(timer.current);
      parar();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback (sem câmera/scanner): o toque simula a leitura (demonstração).
  function simular() {
    if (lendoRef.current) return;
    lendoRef.current = true;
    setLendo(true);
    timer.current = setTimeout(() => {
      embarcar("qr");
      navigate("/operacao/aprovado");
    }, 1200);
  }

  return (
    <CameraLayout
      modo="qr"
      embarcados={contagem.embarcados}
      total={total}
      legenda={lendo ? "Lendo o código…" : "Aproxime o QR Code do passageiro"}
    >
      <ScanFrame
        variant="qr"
        scanning
        onCapture={disponivel ? undefined : simular}
        size={272}
        videoRef={videoRef}
      />
    </CameraLayout>
  );
}
