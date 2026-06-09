import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TelaPagamento.module.css";
import { CarrinhoContext } from "./CarrinhoContext.jsx";

export default function TelaPagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;
  const { adicionar } = useContext(CarrinhoContext);
  const [metodoPagamento, setMetodoPagamento] = useState("");

  if (!item) {
    return (
      <div className={styles.container}>
        <h2>Nenhum item selecionado</h2>
        <button onClick={() => navigate("/catalogo")}>Voltar ao Catálogo</button>
      </div>
    );
  }

  function handleConfirmar() {
    adicionar({ ...item, metodoPagamento });
    navigate("/catalogo");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Finalizar Pagamento</h1>

        <div className={styles.itemInfo}>
          <img src={item.imagem} alt={item.nome} className={styles.imagem} />
          <h2>{item.nome}</h2>
          <p>{item.descricao}</p>
          <h3 className={styles.preco}>{item.preco}</h3>
        </div>

        <div className={styles.metodosContainer}>
          <h3>Escolha o método de pagamento:</h3>
          <div className={styles.metodos}>
            {["Cartão de Crédito", "Cartão de Débito", "Pix"].map((metodo) => (
              <button
                key={metodo}
                className={`${styles.metodoBtn} ${metodoPagamento === metodo ? styles.ativo : ""}`}
                onClick={() => setMetodoPagamento(metodoPagamento === metodo ? "" : metodo)}
              >
                {metodo === "Pix" ? "📱" : "💳"} {metodo}
              </button>
            ))}
          </div>
        </div>

        {metodoPagamento && (
          <button className={styles.btnPagar} onClick={handleConfirmar}>
            Confirmar Pagamento
          </button>
        )}

        <button className={styles.btnVoltar} onClick={() => navigate("/catalogo")}>
          Voltar
        </button>
      </div>
    </div>
  );
}
