import Card from "./Card";
import ContatoBox from "./ContatoBox";
import styles from "./TelaCatalogo.module.css";

export default function CardGrid({ modoTela, itensPagina, onNavigate }) {
  return (
    <section className={styles.grid}>
      {modoTela === "contato" ? (
        <ContatoBox />
      ) : (
        itensPagina.map((item, idx) => (
          <Card key={idx} item={item} onNavigate={onNavigate} />
        ))
      )}
    </section>
  );
}