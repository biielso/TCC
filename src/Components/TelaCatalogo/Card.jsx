import styles from "./TelaCatalogo.module.css";

export default function Card({ item, onNavigate }) {
  return (
    <article 
      className={styles.card} 
      onClick={() => onNavigate(item.nome)}
    >
      <img 
        src={item.imagem} 
        alt={item.nome} 
        className={styles.imagem} 
      />
      <div className={styles.cardBody}>
        <div>
          <div className={styles.cardTitle}>
            {item.nome}
          </div>
          <div className={styles.cardDesc}>
            {item.descricao}
          </div>
        </div>
        <div className={styles.preco}>
          {item.preco}
        </div>
      </div>
    </article>
  );
}