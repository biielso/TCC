import styles from "./TelaCatalogo.module.css";

export default function HeroSecao({ 
  modoTela, 
  destinoBusca, 
  setDestinoBusca, 
  precoMin, 
  setPrecoMin, 
  precoMax, 
  setPrecoMax, 
  setPaginaAtual 
}) {
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
      hospedagens: "Encontre hospedagens perfeitas para sua estadia",
      pacotes: "Encontre os melhores pacotes para os melhores destinos",
      promoções: "Encontre as melhores promoções com preços incríveis"
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
    <section className={styles.heroSearch}>
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
              id="campo-nome"
              className={styles.heroInput}
              placeholder={getPlaceholder()}
              value={destinoBusca}
              onChange={(e) => setDestinoBusca(e.target.value)}
            />
            <input
              id="campo-preco-min"
              className={styles.heroInput}
              type="number"
              placeholder="Preço mínimo (R$)"
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value)}
            />
            <input
              id="campo-preco-max"
              className={styles.heroInput}
              type="number"
              placeholder="Preço máximo (R$)"
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
            />
<button
  id="botao-buscar"
  className={styles.heroBtn}
  onClick={() => setPaginaAtual(1)}
>
  Buscar
</button>

<button
  id="botao-adicionar"
  className={styles.heroBtnPlus}
  onClick={() => console.log("Botão + clicado")}
>
  +
</button>

          </div>
        )}
      </div>
    </section>
  );
}