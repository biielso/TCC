import React from "react";
import styles from "./TelaCatalogo.module.css";
import Mapa from "../Mapa/Mapa";

const HeroSearch = React.forwardRef(function HeroSearch(
  { 
    modoTela, 
    destinoBusca, 
    setDestinoBusca, 
    precoMin, 
    setPrecoMin, 
    precoMax, 
    setPrecoMax, 
    setPaginaAtual 
  },
  ref
) {

  const getTitulo = () => {
    const titulos = {
      destinos: "Destinos",
      hospedagens: "Hospedagens",
      pacotes: "Pacotes",
      promoções: "Promoções",
      contato: "Contato"
    };
    return titulos[modoTela] || "Catálogo";
  };

  const getSubtitulo = () => {
    const subtitulos = {
      contato: "Entre em contato conosco para mais informações",
      destinos: "Encontre passeios e atividades para suas viagens",
      hospedagens: "Encontre hospedagens perfeitas",
      pacotes: "Os melhores pacotes",
      promoções: "Melhores promoções"
    };
    return subtitulos[modoTela] || "";
  };

  const getPlaceholder = () => {
    const placeholders = {
      destinos: "Destino",
      hospedagens: "Hospedagem",
      pacotes: "Pacote",
      promoções: "Promoção"
    };
    return placeholders[modoTela] || "Buscar";
  };

  return (
    <section ref={ref} tabIndex={0} className={styles.heroSearch}>
      <div className={styles.heroPanel}>
        <div>
          <div className={styles.heroTitle}>
            {getTitulo()}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>
            {getSubtitulo()}
          </div>
        </div>
        
        {modoTela !== "contato" && (
          <div className={styles.heroInputs}>

            <input
              data-input
              className={styles.heroInput}
              placeholder={getPlaceholder()}
              value={destinoBusca}
              onChange={(e) => setDestinoBusca(e.target.value)}
            />

            <input
              data-input
              className={styles.heroInput}
              type="number"
              placeholder="Preço mínimo (R$)"
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value)}
            />

            <input
              data-input
              className={styles.heroInput}
              type="number"
              placeholder="Preço máximo (R$)"
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
            />

            <button
              data-input
              className={styles.heroBtn}
              onClick={() => setPaginaAtual(1)}
            >
              Buscar
            </button>
          </div>
        )}
        
        {/* Mapa de localizações com largura limitada e centralizado */}
        {/* <div style={{ maxWidth: '600px', margin: '20px auto' }}>
          <Mapa />
        </div> */}
      </div>
    </section>
  );
});

export default HeroSearch;
