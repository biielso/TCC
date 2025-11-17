import { useNavigate } from "react-router-dom";
import styles from "./TelaCatalogo.module.css";

export default function Navbar({ modoTela, setModoTela }) {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.navLogo}
        onClick={() => navigate("/login")}
      >
        Fazer Login 👤
      </button>
      <div className={styles.navLinks}>
        <div 
          className={`${styles.navItem} ${modoTela === "destinos" ? styles.navAtivo : ""}`} 
          onClick={() => setModoTela("destinos")}
        >
          Destinos
        </div>
        <div 
          className={`${styles.navItem} ${modoTela === "hospedagens" ? styles.navAtivo : ""}`} 
          onClick={() => setModoTela("hospedagens")}
        >
          Hospedagens
        </div>
        <div 
          className={`${styles.navItem} ${modoTela === "pacotes" ? styles.navAtivo : ""}`} 
          onClick={() => setModoTela("pacotes")}
        >
          Pacotes
        </div>
        <div 
          className={`${styles.navItem} ${modoTela === "promoções" ? styles.navAtivo : ""}`} 
          onClick={() => setModoTela("promoções")}
        >
          Promoções
        </div>
        <div 
          className={`${styles.navItem} ${modoTela === "contato" ? styles.navAtivo : ""}`} 
          onClick={() => setModoTela("contato")}
        >
          Contato
        </div>
      </div>
    </nav>
  );
}