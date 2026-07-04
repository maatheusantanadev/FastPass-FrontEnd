import { Routes, Route } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import SignupScreen from "./screens/SignupScreen.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/boas-vindas" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/cadastro" element={<SignupScreen />} />
    </Routes>
  );
}
