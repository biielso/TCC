import React from "react";
import Card from "./Card";
import ContatoBox from "./ContatoBox";
import styles from "./TelaCatalogo.module.css";

const CardGrid = React.forwardRef(function CardGrid(
  { modoTela, itensPagina, onCardClick, onRemover },
  ref
) {
  return (
    <section ref={ref} tabIndex={0} className={styles.grid}>
      {modoTela === "contato" ? (
        <ContatoBox />
      ) : (
        itensPagina.map((item, idx) => (
          <div key={idx} data-card tabIndex={0}>
            <Card item={item} onCardClick={onCardClick} modoTela={modoTela} onRemover={onRemover} />
          </div>
        ))
      )}
    </section>
  );
});

export default CardGrid;
