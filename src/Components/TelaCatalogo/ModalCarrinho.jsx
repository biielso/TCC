import { useContext } from "react";
import { CarrinhoContext } from "./CarrinhoContext.jsx";
import styles from "./ModalDestino.module.css";

export default function ModalCarrinho({ onClose }) {
  const { carrinho, remover, limpar } = useContext(CarrinhoContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        <h2>🛒 Carrinho</h2>

        {carrinho.length === 0 && <p>Seu carrinho está vazio.</p>}

        {carrinho.map((item, index) => (
          <div key={index} className={styles.itemCarrinho}>
            <b>{item.nome}</b> — {item.preco}
            <button 
              className={styles.addBtn}
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => remover(item.nome)}
            >
              Remover
            </button>
          </div>
        ))}

        {carrinho.length > 0 && (
          <button 
            className={styles.addBtn}
            style={{ background: "#444", marginTop: "20px" }}
            onClick={limpar}
          >
            Limpar Carrinho
          </button>
        )}
      </div>
    </div>
  );
}
