import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mapa from "../Mapa/Mapa.jsx";
import styles from "./TelaCatalogo.module.css";

const abas = ["destinos", "hospedagens", "pacotes", "promoções", "contato"];

const Navbar = React.forwardRef(function Navbar(
  { modoTela, setModoTela, onAbrirCadastro },
  ref
) {
  const navigate = useNavigate();

  const [mapaAberto, setMapaAberto] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [logado, setLogado] = useState(localStorage.getItem('logado') === 'true');
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem('tipoUsuario'));

  function handleLogout() {
    localStorage.removeItem('logado');
    localStorage.removeItem('tipoUsuario');
    setLogado(false);
    setTipoUsuario(null);
    navigate('/entrada');
  }

  const itemsRef = useRef([]);

  /* Quando focar na navbar pelo grupo, focar o item ativo */
  useEffect(() => {
    const idx = abas.indexOf(modoTela);
    const alvo = itemsRef.current[idx];
    if (alvo) alvo.focus();
  }, [ref, modoTela]);

  /* Navegação por teclado */
  function handleKeyDown(e) {
    const idxAtual = abas.indexOf(modoTela);

    if (e.key === "ArrowRight") {
      const prox = (idxAtual + 1) % abas.length;
      setModoTela(abas[prox]);
      itemsRef.current[prox]?.focus();
      return;
    }

    if (e.key === "ArrowLeft") {
      const ant = (idxAtual - 1 + abas.length) % abas.length;
      setModoTela(abas[ant]);
      itemsRef.current[ant]?.focus();
      return;
    }

    if (e.key === "Enter") {
      // Simula clique da aba ativa
      setModoTela(modoTela);
      return;
    }
  }

  return (
    <>
      <nav
        ref={ref}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={styles.navbar}
      >
        <div className={styles.navLeft}>
          <button
            className={styles.mapaButton}
            onClick={() => setMapaAberto(true)}
          >
            🗺️ Mapa
          </button>
          {!logado ? (
            <button
              className={styles.navLogo}
              onClick={() => navigate("/login")}
            >
              Fazer Login 👤
            </button>
          ) : (
            <button
              className={styles.navLogo}
              onClick={handleLogout}
            >
              Sair 🚪
            </button>
          )}
        </div>

      <div className={styles.navLinks}>
        {abas.map((aba, index) => (
          <div
            key={aba}
            ref={(el) => (itemsRef.current[index] = el)}
            tabIndex={0}
            className={`${styles.navItem} ${
              modoTela === aba ? styles.navAtivo : ""
            }`}
            onClick={() => setModoTela(aba)}
          >
            {aba.charAt(0).toUpperCase() + aba.slice(1)}
          </div>
        ))}
      </div>

        {(tipoUsuario === 'ADMIN' || tipoUsuario === 'FUNCIONARIO') && (
          <div style={{ position: 'relative', visibility: modoTela === 'contato' ? 'hidden' : 'visible' }}>
            <button className={styles.cartButton} onClick={() => setDropdownAberto(v => !v)}>
              ➕ Cadastrar
            </button>
            {dropdownAberto && (
              <div style={{ position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid #d1d5db', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, minWidth: 160 }}>
                <button style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, color: '#374151' }}
                  onClick={() => { onAbrirCadastro(modoTela); setDropdownAberto(false); }}>
                  {{ destinos: '🗺️', hospedagens: '🏨', pacotes: '✈️', 'promoções': '🏷️' }[modoTela]} {modoTela.charAt(0).toUpperCase() + modoTela.slice(1)}
                </button>
                {tipoUsuario === 'ADMIN' && (
                  <button style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14, color: '#374151' }}
                    onClick={() => { onAbrirCadastro('funcionario'); setDropdownAberto(false); }}>
                    👤 Funcionário
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {mapaAberto && (
        <div className={styles.modalOverlay} onClick={() => setMapaAberto(false)}>
          <div className={styles.modalMapa} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setMapaAberto(false)}>
              ✕
            </button>
            <Mapa />
          </div>
        </div>
      )}
    </>
  );
});

export default Navbar;
