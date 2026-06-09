import { useNavigate } from "react-router-dom";
import styles from "./TelaCatalogo.module.css";

export default function Card({ item, onCardClick, modoTela, onRemover }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("tipoUsuario") === "ADMIN";

  function handlePagar(e) {
    e.stopPropagation();
    navigate("/pagamento", { state: { item } });
  }

  function handleRemover(e) {
    e.stopPropagation();
    if (onRemover) onRemover(item);
  }

  return (
    <article className={styles.card} onClick={() => onCardClick(item)}>
      {isAdmin && (
        <button className={styles.btnRemover} onClick={handleRemover} title="Remover do catálogo">
          🗑️ Remover
        </button>
      )}
      <img src={item.imagem} alt={item.nome} className={styles.imagem} />
      <div className={styles.cardBody}>
        <div>
          <div className={styles.cardTitle}>{item.nome}</div>
          <div className={styles.cardDesc}>{item.descricao}</div>
          {modoTela === "pacotes" && (
            <div className={styles.pacoteInfo}>
              <div>✈️ {item.aereo}</div>
              <div>☕ {item.hospedagem}</div>
              <div>📅 Saída: {item.saida}</div>
            </div>
          )}
          {modoTela === "promoções" && (
            <div className={styles.pacoteInfo}>
              <div>✈️ {item.aereo}</div>
              <div>📅 Saída: {item.saida}</div>
              <div>💳 {item.desconto}</div>
            </div>
          )}
          {modoTela === "destinos" && (
            <div className={styles.pacoteInfo}>
              <div>✈️ {item.aereo}</div>
              <div>📅 Saída: {item.saida}</div>
            </div>
          )}
          {modoTela === "hospedagens" && (
            <div className={styles.pacoteInfo}>
              <div>⭐ {item.allInclusive}</div>
              <div>🏊 {item.piscina}</div>
              <div>📅 Check-in: {item.checkin}</div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.preco}>{item.preco}</div>
          <button className={styles.btnPagar} onClick={handlePagar}>Pagar</button>
        </div>
      </div>
    </article>
  );
}
