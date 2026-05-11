import React from "react";
import styles from "./TelaCatalogo.module.css";

const Paginacao = React.forwardRef(function Paginacao(
  { paginaAtual, totalPaginas, setPaginaAtual },
  ref
) {
  return (
    <div ref={ref} tabIndex={0} className={styles.paginacaoContainer}>
      <button 
        data-pagina
        onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))} 
        disabled={paginaAtual === 1} 
        className={styles.botaoPaginacao}
      >
        ‹
      </button>
      
      <button 
        data-pagina
        onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))} 
        disabled={paginaAtual === totalPaginas} 
        className={styles.botaoPaginacao}
      >
        ›
      </button>
    </div>
  );
});

export default Paginacao;
