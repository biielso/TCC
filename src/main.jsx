import './index.css';
import App from './App.jsx';
import { CarrinhoProvider } from "./Components/TelaCatalogo/CarrinhoContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById('root')).render(
  <CarrinhoProvider>
    <App/>
  </CarrinhoProvider>
);
