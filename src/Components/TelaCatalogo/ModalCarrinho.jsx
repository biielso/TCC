import { useContext } from "react";
import { CarrinhoContext } from "./CarrinhoContext.jsx";
import styles from "./ModalCarrinho.module.css";

export default function ModalCarrinho({ onClose }) {
  const { carrinho, remover, limpar } = useContext(CarrinhoContext);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.painel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>🛒 Carrinho</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {carrinho.length === 0 ? (
          <p className={styles.vazio}>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className={styles.lista}>
              {carrinho.map((item, index) => (
                <div key={index} className={styles.item}>
                  {item.imagem && <img src={item.imagem} alt={item.nome} className={styles.imagem} />}
                  <div className={styles.info}>
                    <span className={styles.nome}>{item.nome}</span>
                    <span className={styles.preco}>{item.preco}</span>
                    <span className={styles.metodo}>💳 {item.metodoPagamento}</span>
                  </div>
                  <div className={styles.direita}>
                    <span className={styles.pendente}>⏳ Pendente</span>
                    <button className={styles.btnRemover} onClick={() => remover(item.nome)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.btnLimpar} onClick={limpar}>Limpar Carrinho</button>
          </>
        )}
      </div>
    </div>
  );
}
