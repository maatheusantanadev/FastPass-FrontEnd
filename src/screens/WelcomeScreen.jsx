import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Wordmark from "../components/Wordmark.jsx";
import BrandPanel from "../components/BrandPanel.jsx";
import Button from "../components/Button.jsx";

export default function WelcomeScreen() {
  return (
    <BrandPanel>
      <div className="flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center"
        >
          <Wordmark tone="dark" size="lg" />
          <p className="max-w-[280px] font-body text-[15px] leading-relaxed text-muted">
            Compra, cadastro e embarque em segundos — tudo no reconhecimento
            facial.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          <Button as={Link} to="/login" variant="primary" fullWidth>
            Entrar
          </Button>
          <Button as={Link} to="/cadastro" variant="soft" fullWidth>
            Criar conta
          </Button>
        </div>
      </div>
    </BrandPanel>
  );
}
