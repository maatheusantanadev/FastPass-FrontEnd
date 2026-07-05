import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "../../components/Scene.jsx";
import Button from "../../components/Button.jsx";

const slides = [
  {
    cena: "onibus",
    titulo: "Compre, cadastre e embarque",
    apoio: "Sua excursão da Bahia, do assento ao embarque, em um só app.",
  },
  {
    cena: "praia",
    titulo: "Escolha o destino e o assento",
    apoio: "Praia do Forte, Chapada, Morro de São Paulo — pague no Pix.",
  },
  {
    cena: "ilha",
    titulo: "Embarque em segundos",
    apoio: "Reconhecimento facial ou QR Code na porta do ônibus.",
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const isLast = step === slides.length - 1;
  const slide = slides[step];

  function avancar() {
    if (isLast) navigate("/boas-vindas");
    else setStep((s) => s + 1);
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:overflow-hidden sm:rounded-[34px] sm:shadow-phone">
      <div className="flex items-center justify-end px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => navigate("/boas-vindas")}
          className="tap-target px-2 text-[14px] font-medium text-muted hover:text-ink"
        >
          Pular
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-center text-center"
          >
            <div className="h-52 w-full overflow-hidden rounded-[28px]">
              <Scene variant={slide.cena} />
            </div>
            <h1 className="mt-9 font-display text-[27px] font-medium leading-tight text-ink">
              {slide.titulo}
            </h1>
            <p className="mt-3 max-w-[300px] font-body text-[15px] leading-relaxed text-muted">
              {slide.apoio}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-7 pb-[max(1.75rem,env(safe-area-inset-bottom))]">
        <div className="mb-6 flex items-center justify-center gap-2" aria-hidden="true">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-cobalt" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <Button variant="primary" fullWidth onClick={avancar}>
          {isLast ? "Começar" : "Avançar"}
        </Button>
      </div>
    </div>
  );
}
