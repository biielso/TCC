import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Imports das telas existentes
import TelaLogin from "./Components/TelaLogin/TelaLogin";
import TelaCatalogo from "./Components/TelaCatalogo/TelaCatalogo";
import TelaCadastro from "./Components/TelaCadastro/TelaCadastro";
import TelaEntrada from "./Components/TelaEntrada/TelaEntrada";
import TelaPagamento from "./Components/TelaCatalogo/TelaPagamento";

// Importar o componente Mapa
import Mapa from "./Components/Mapa/Mapa";  // Certifique-se de que o caminho está correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona / para /entrada */}
        <Route path="/" element={<Navigate to="/entrada" replace />} />

        <Route path="/login" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/catalogo" element={<TelaCatalogo />} />
        <Route path="/entrada" element={<TelaEntrada />} />
        <Route path="/pagamento" element={<TelaPagamento />} />

        {/* Nova rota para o Mapa */}
        <Route path="/mapa" element={<Mapa />} />

        {/* Página 404 */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
