import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PedidoProvider } from "./context/PedidoContext.jsx";
import { OperacaoProvider } from "./context/OperacaoContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PedidoProvider>
          <OperacaoProvider>
            <App />
          </OperacaoProvider>
        </PedidoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
