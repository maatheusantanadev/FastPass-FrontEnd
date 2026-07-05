import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Auth / entrada
import SplashScreen from "./screens/SplashScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";
import RecuperarSenhaScreen from "./screens/RecuperarSenhaScreen.jsx";

// Passageiro — onboarding e pós-cadastro
import OnboardingScreen from "./screens/passageiro/OnboardingScreen.jsx";
import TermosScreen from "./screens/passageiro/TermosScreen.jsx";
import PermissoesScreen from "./screens/passageiro/PermissoesScreen.jsx";
import FaceIdScreen from "./screens/passageiro/FaceIdScreen.jsx";
import QrEmbarqueScreen from "./screens/passageiro/QrEmbarqueScreen.jsx";
import ContaCriadaScreen from "./screens/passageiro/ContaCriadaScreen.jsx";

// Passageiro — app principal
import ExplorarScreen from "./screens/passageiro/ExplorarScreen.jsx";
import DetalhesScreen from "./screens/passageiro/DetalhesScreen.jsx";
import AssentosScreen from "./screens/passageiro/AssentosScreen.jsx";
import PasseiosScreen from "./screens/passageiro/PasseiosScreen.jsx";
import ResumoScreen from "./screens/passageiro/ResumoScreen.jsx";
import PagamentoScreen from "./screens/passageiro/PagamentoScreen.jsx";
import ConfirmacaoScreen from "./screens/passageiro/ConfirmacaoScreen.jsx";
import ViagensScreen from "./screens/passageiro/ViagensScreen.jsx";
import AvisosScreen from "./screens/passageiro/AvisosScreen.jsx";
import PerfilScreen from "./screens/passageiro/PerfilScreen.jsx";
import EmbarqueScreen from "./screens/passageiro/EmbarqueScreen.jsx";
import RastreamentoScreen from "./screens/passageiro/RastreamentoScreen.jsx";
import AvaliacaoScreen from "./screens/passageiro/AvaliacaoScreen.jsx";

// Operação / Motorista
import OperacaoScreen from "./screens/operacao/OperacaoScreen.jsx";
import ValidacaoFacialScreen from "./screens/operacao/ValidacaoFacialScreen.jsx";
import ValidacaoQrScreen from "./screens/operacao/ValidacaoQrScreen.jsx";
import ValidacaoAprovadoScreen from "./screens/operacao/ValidacaoAprovadoScreen.jsx";
import ValidacaoNaoIdentificadoScreen from "./screens/operacao/ValidacaoNaoIdentificadoScreen.jsx";
import ConferenciaManualScreen from "./screens/operacao/ConferenciaManualScreen.jsx";
import ListaEmbarqueScreen from "./screens/operacao/ListaEmbarqueScreen.jsx";
import EmbarqueConcluidoScreen from "./screens/operacao/EmbarqueConcluidoScreen.jsx";

// Admin / Painel
import VisaoGeralScreen from "./screens/admin/VisaoGeralScreen.jsx";
import ExcursoesScreen from "./screens/admin/ExcursoesScreen.jsx";
import ValidacaoTempoRealScreen from "./screens/admin/ValidacaoTempoRealScreen.jsx";
import RelatoriosScreen from "./screens/admin/RelatoriosScreen.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Entrada */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/boas-vindas" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cadastro" element={<SignupScreen />} />
        <Route path="/recuperar-senha" element={<RecuperarSenhaScreen />} />

        {/* Passageiro — pós-cadastro */}
        <Route path="/termos" element={<TermosScreen />} />
        <Route path="/permissoes" element={<PermissoesScreen />} />
        <Route path="/faceid" element={<FaceIdScreen />} />
        <Route path="/qr" element={<QrEmbarqueScreen />} />
        <Route path="/conta-criada" element={<ContaCriadaScreen />} />

        {/* Passageiro — app + checkout */}
        <Route path="/app/explorar" element={<ExplorarScreen />} />
        <Route path="/app/excursao/:id" element={<DetalhesScreen />} />
        <Route path="/app/assentos" element={<AssentosScreen />} />
        <Route path="/app/passeios" element={<PasseiosScreen />} />
        <Route path="/app/resumo" element={<ResumoScreen />} />
        <Route path="/app/pagamento" element={<PagamentoScreen />} />
        <Route path="/app/confirmacao" element={<ConfirmacaoScreen />} />
        <Route path="/app/viagens" element={<ViagensScreen />} />
        <Route path="/app/avisos" element={<AvisosScreen />} />
        <Route path="/app/perfil" element={<PerfilScreen />} />
        <Route path="/app/embarque" element={<EmbarqueScreen />} />
        <Route path="/app/rastreamento" element={<RastreamentoScreen />} />
        <Route path="/app/avaliacao" element={<AvaliacaoScreen />} />

        {/* Operação / Motorista */}
        <Route path="/operacao" element={<OperacaoScreen />} />
        <Route path="/operacao/facial" element={<ValidacaoFacialScreen />} />
        <Route path="/operacao/qr" element={<ValidacaoQrScreen />} />
        <Route path="/operacao/aprovado" element={<ValidacaoAprovadoScreen />} />
        <Route path="/operacao/nao-identificado" element={<ValidacaoNaoIdentificadoScreen />} />
        <Route path="/operacao/manual" element={<ConferenciaManualScreen />} />
        <Route path="/operacao/lista" element={<ListaEmbarqueScreen />} />
        <Route path="/operacao/fim" element={<EmbarqueConcluidoScreen />} />

        {/* Admin / Painel */}
        <Route path="/painel" element={<VisaoGeralScreen />} />
        <Route path="/painel/excursoes" element={<ExcursoesScreen />} />
        <Route path="/painel/validacao" element={<ValidacaoTempoRealScreen />} />
        <Route path="/painel/relatorios" element={<RelatoriosScreen />} />
      </Routes>
    </AnimatePresence>
  );
}
