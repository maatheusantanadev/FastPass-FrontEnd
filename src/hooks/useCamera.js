import { useCallback, useEffect, useRef, useState } from "react";

// Acesso à câmera (getUserMedia) com captura de frame para base64.
//
// Degrada com elegância: se a câmera não estiver disponível ou for negada,
// `disponivel` fica false e as telas caem no modo simulado.
export function useCamera({ facingMode = "user" } = {}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [disponivel, setDisponivel] = useState(false);
  const [erro, setErro] = useState(null);

  const iniciar = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setErro("sem-camera");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setDisponivel(true);
      setErro(null);
      return true;
    } catch {
      setErro("negado");
      setDisponivel(false);
      return false;
    }
  }, [facingMode]);

  const parar = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setDisponivel(false);
  }, []);

  // Captura o frame atual como data URI JPEG (base64). null se indisponível.
  const capturar = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, []);

  useEffect(() => () => parar(), [parar]);

  return { videoRef, iniciar, parar, capturar, disponivel, erro };
}
