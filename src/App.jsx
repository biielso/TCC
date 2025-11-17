import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Imports das telas existentes
import TelaLogin from "./Components/TelaLogin/TelaLogin";
import TelaCatalogo from "./Components/TelaCatalogo/TelaCatalogo";
import TelaCadastro from "./Components/TelaCadastro/TelaCadastro";

// Importar o componente Mapa
import Mapa from "./Components/Mapa/Mapa";  // Certifique-se de que o caminho está correto

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona / para /catalogo */}
        <Route path="/" element={<Navigate to="/catalogo" replace />} />

        <Route path="/login" element={<TelaLogin />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/catalogo" element={<TelaCatalogo />} />

        {/* Nova rota para o Mapa */}
        <Route path="/mapa" element={<Mapa />} />

        {/* Página 404 */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
