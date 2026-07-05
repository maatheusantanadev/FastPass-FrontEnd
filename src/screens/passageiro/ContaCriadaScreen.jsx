import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SuccessCheck from "../../components/SuccessCheck.jsx";
import Button from "../../components/Button.jsx";

export default function ContaCriadaScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-white px-8 pb-[max(1.75rem,env(safe-area-inset-bottom))] text-center sm:mx-auto sm:my-6 sm:min-h-[calc(100dvh-3rem)] sm:max-h-[924px] sm:w-[430px] sm:rounded-[34px] sm:shadow-phone">
      <div className="flex flex-1 flex-col items-center justify-center">
        <SuccessCheck size={96} />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8 font-display text-[30px] font-medium text-ink"
        >
          Tudo pronto!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-3 max-w-[300px] font-body text-[15px] leading-relaxed text-muted"
        >
          Sua conta está ativa e o embarque configurado. Bora escolher seu
          próximo destino na Bahia.
        </motion.p>
      </div>

      <Button variant="primary" fullWidth onClick={() => navigate("/app/explorar")}>
        Explorar excursões
      </Button>
    </div>
  );
}
