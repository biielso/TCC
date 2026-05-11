import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TelaEntrada.module.css";

export default function Home() {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/catalogo");
  };

  return (
    <div className={styles.container}>
      <div className={styles.overlayTexture}></div>

      <div className={styles.content}>
        <h1 className={styles.logo}>ZenyAtlas</h1>
        <p className={styles.subtitle}>
          Encontre os melhores hotéis, passagens e promoções para uma
          experiência inesquecível.
        </p>

        <button 
          className={styles.enterButton}
          onClick={handleEnter}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}