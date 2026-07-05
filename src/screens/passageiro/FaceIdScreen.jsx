import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import ScanFrame from "../../components/ScanFrame.jsx";
import Button from "../../components/Button.jsx";
import { useCamera } from "../../hooks/useCamera.js";
import { registrarFacial } from "../../api/auth.js";

export default function FaceIdScreen() {
  const navigate = useNavigate();
  const { videoRef, iniciar, parar, capturar, disponivel } = useCamera();
  const [fase, setFase] = useState("idle"); // idle | scan | done
  const timer = useRef(null);

  useEffect(() => {
    iniciar();
    return () => {
      clearTimeout(timer.current);
      parar();
    };
  }, [iniciar, parar]);

  async function cadastrar() {
    if (fase !== "idle") return;
    setFase("scan");

    const imagem = disponivel ? capturar() : null;

    try {
      if (imagem) {
        await registrarFacial(imagem); // POST /auth/facial (via Laravel)
      } else {
        // Sem câmera: simula o tempo de leitura (modo demonstração).
        await new Promise((r) => (timer.current = setTimeout(r, 1600)));
      }
      parar();
      setFase("done");
    } catch (err) {
      // Backend offline: segue como cadastrado (demonstração).
      if (err.offline) {
        parar();
        setFase("done");
        return;
      }
      setFase("idle"); // erro real: permite tentar de novo
    }
  }

  useEffect(() => {
    if (fase === "done") {
      timer.current = setTimeout(() => navigate("/qr"), 1200);
    }
  }, [fase, navigate]);

  function pular() {
    parar();
    navigate("/qr");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-cobalt px-6 pt-[max(2rem,env(safe-area-inset-top))] pb-[max(1.75rem,env(safe-area-inset-bottom))] text-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <span className="mt-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-badge">
        Face ID
      </span>

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {fase === "done" ? (
            <motion.div
              key="done"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex h-[236px] w-[236px] flex-col items-center justify-center rounded-full bg-white/10"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success">
                <Check size={44} strokeWidth={3} className="text-white" />
              </span>
              <p className="mt-5 font-display text-[20px] font-medium">Rosto cadastrado</p>
            </motion.div>
          ) : (
            <motion.div key="scan" exit={{ opacity: 0 }}>
              <ScanFrame
                variant="facial"
                scanning={fase === "scan"}
                onCapture={fase === "idle" ? cadastrar : undefined}
                videoRef={videoRef}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 text-center">
          <h1 className="font-display text-[24px] font-medium">
            Cadastre seu rosto <span className="text-white/60">(opcional)</span>
          </h1>
          <p className="mx-auto mt-2 max-w-[290px] text-[14px] leading-relaxed text-white/70">
            {fase === "scan"
              ? "Mantenha o rosto centralizado…"
              : "Embarque sem tirar o celular do bolso. Você pode pular e usar o QR Code."}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button
          variant="soft"
          fullWidth
          onClick={cadastrar}
          disabled={fase !== "idle"}
        >
          {fase === "idle" ? "Concluir cadastro" : "Escaneando…"}
        </Button>
        <button
          type="button"
          onClick={pular}
          className="tap-target text-[14px] font-medium text-white/80 hover:text-white"
        >
          Pular e usar QR Code
        </button>
      </div>
    </div>
  );
}
