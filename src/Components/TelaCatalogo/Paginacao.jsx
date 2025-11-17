import styles from "./TelaCatalogo.module.css";

export default function Paginacao({ paginaAtual, totalPaginas, setPaginaAtual }) {
  return (
    <div className={styles.paginacaoContainer}>
      <button 
        onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))} 
        disabled={paginaAtual === 1} 
        className={styles.botaoPaginacao}
      >
        « Anterior
      </button>
      
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <button 
          key={num} 
          onClick={() => setPaginaAtual(num)} 
          disabled={num === paginaAtual} 
          className={`${styles.botaoPaginacao} ${num === paginaAtual ? styles.botaoAtivo : ""}`}
        >
          {num}
        </button>
      ))}
      
      <button 
        onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))} 
        disabled={paginaAtual === totalPaginas} 
        className={styles.botaoPaginacao}
      >
        Próximo »
      </button>
    </div>
  );
}