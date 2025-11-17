import styles from "./TelaCatalogo.module.css";

export default function ContatoBox() {
  return (
    <div className={styles.contatoBox}>
      <div className={styles.contatoLogo}>
        <span role="img" aria-label="planeta">🌎</span>
        <span>Zenyatlas</span>
      </div>
      <div className={styles.contatoTelefone}>
        Telefone: <strong>4002-8922</strong>
      </div>
    </div>
  );
}