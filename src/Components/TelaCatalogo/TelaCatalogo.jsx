import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./TelaCatalogo.module.css";
import { buscarDestinos, buscarHospedagens, buscarPacotes, buscarPromocoes, removerDestino, removerHospedagem, removerPacote, removerPromocao } from '../../service/api';

import Navbar from "./Navbar";
import HeroSearch from "./HeroSearch";
import CardGrid from "./CardGrid";
import Paginacao from "./Paginacao";
import ModalDestino from "./ModalDestino";
import ModalCadastro from "./ModalCadastro";
import ModalCarrinho from "./ModalCarrinho";

import { CarrinhoContext } from "./CarrinhoContext.jsx";

/* ===== DADOS MOCKADOS removidos — todos os dados vêm da API ===== */

const buscarPorCategoria = {
  destinos: buscarDestinos,
  hospedagens: buscarHospedagens,
  pacotes: buscarPacotes,
  "promoções": buscarPromocoes,
};

const removerPorModo = {
  destinos: removerDestino,
  hospedagens: removerHospedagem,
  pacotes: removerPacote,
  "promoções": removerPromocao,
};

const categoriaParaModo = {
  Destinos: "destinos",
  Hospedagens: "hospedagens",
  Pacotes: "pacotes",
  "Promoções": "promoções",
};

// 🌟 EXPLICAÇÃO 1: Ajuste na função de preço
function precoParaNumero(preco) {
  if (preco === undefined || preco === null) return 0;
  // Se o preço já vier como número do Java (ex: 350.50), retorna ele mesmo
  if (typeof preco === 'number') return preco; 
  
  let limpo = String(preco).replace(/[^\d,]/g, "");
  if (limpo.includes(",")) limpo = limpo.replace(",", ".");
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

export default function TelaCatalogo() {
  const itemsPerPage = 3;

  const [dadosPorModo, setDadosPorModo] = useState({ destinos: [], hospedagens: [], pacotes: [], "promoções": [] });

  const [modoTela, setModoTela] = useState("destinos");
  const [destinosFiltrados, setDestinosFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [destinoBusca, setDestinoBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const [destinoSelecionado, setDestinoSelecionado] = useState(null);
  const { adicionar, carrinho } = useContext(CarrinhoContext);
  const [cadastroAberto, setCadastroAberto] = useState(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  /* ====== REFS PARA NAVEGAÇÃO ====== */
  const navbarRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  const paginacaoRef = useRef(null);

  const [focoGrupo, setFocoGrupo] = useState(0);

  // Busca da API sempre que o modo mudar
  useEffect(() => {
    const buscar = buscarPorCategoria[modoTela];
    if (!buscar) return;
    buscar()
      .then(dados => setDadosPorModo(prev => ({ ...prev, [modoTela]: Array.isArray(dados) ? dados : [] })))
      .catch(erro => console.error("Erro na API:", erro));
  }, [modoTela]);

  // Quando um item é criado pelo modal, adiciona imediatamente na lista
  function handleItemCriado(categoria, item) {
    const modo = categoriaParaModo[categoria];
    if (modo) setDadosPorModo(prev => ({ ...prev, [modo]: [...prev[modo], item] }));
  }

  /* ===== LISTA ATUAL ===== */
  const listaAtual = dadosPorModo[modoTela] ?? [];

  const totalPaginas = Math.ceil(destinosFiltrados.length / itemsPerPage) || 1; // Evita divisão por zero

  /* ===== FILTRO ===== */
  useEffect(() => {
    const precoMinNum = precoMin ? Number(precoMin) : 0;
    const precoMaxNum = precoMax ? Number(precoMax) : Infinity;

    const filtrados = listaAtual.filter((d) => {
      // Usamos d.nome ou string vazia para evitar erro caso a API venha sem nome
      const nomeDestino = d.nome ? d.nome.toLowerCase() : ""; 
      const precoNum = precoParaNumero(d.preco);
      return (
        nomeDestino.includes(destinoBusca.toLowerCase()) &&
        precoNum >= precoMinNum &&
        precoNum <= precoMaxNum
      );
    });

    setDestinosFiltrados(filtrados);
    setPaginaAtual(1);
  }, [destinoBusca, precoMin, precoMax, modoTela, listaAtual]);

  const startIndex = (paginaAtual - 1) * itemsPerPage;
  const itensPagina = destinosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  /* ===== MODAL ===== */
  function abrirModal(item) {
    setDestinoSelecionado(item);
  }

  function fecharModal() {
    setDestinoSelecionado(null);
  }

  function adicionarAoCarrinho(item) {
    adicionar(item);
    fecharModal();
  }

  const [itemParaRemover, setItemParaRemover] = useState(null);

  const [boasVindas, setBoasVindas] = useState(() => localStorage.getItem('boasVindas') === 'true');
  const nomeUsuario = localStorage.getItem('nomeUsuario') || '';

  useEffect(() => {
    if (boasVindas) {
      localStorage.removeItem('boasVindas');
      const timer = setTimeout(() => setBoasVindas(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  async function handleRemover(item) {
    setItemParaRemover(item);
  }

  async function confirmarRemocao() {
    const fnRemover = removerPorModo[modoTela];
    if (!fnRemover) return;
    try {
      await fnRemover(itemParaRemover.id);
      setDadosPorModo(prev => ({
        ...prev,
        [modoTela]: prev[modoTela].filter(d => d.id !== itemParaRemover.id)
      }));
    } catch {
      alert("Erro ao remover. Tente novamente.");
    } finally {
      setItemParaRemover(null);
    }
  }

  /* ===== FOCO AUTOMÁTICO AO TROCAR GRUPO E NAVEGAÇÃO ===== */
  // (O código de foco automático e teclado continua exatamente igual ao seu, não mexi em nada aqui para não quebrar a acessibilidade)
  useEffect(() => {
    const grupos = [navbarRef, searchRef, gridRef, paginacaoRef];
    const alvo = grupos[focoGrupo]?.current;
    if (alvo) alvo.focus();
  }, [focoGrupo]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (destinoSelecionado) fecharModal();
        if (cadastroAberto) setCadastroAberto(false);
      }
      if (e.key === "ArrowUp") { setFocoGrupo((f) => Math.max(0, f - 1)); return; }
      if (e.key === "ArrowDown") { setFocoGrupo((f) => Math.min(3, f + 1)); return; }

      if (focoGrupo === 1) {
        const campos = searchRef.current?.querySelectorAll("[data-input]");
        if (!campos) return;
        let index = Array.from(campos).indexOf(document.activeElement);
        if (e.key === "ArrowRight" && index < campos.length - 1) { campos[index + 1].focus(); return; }
        if (e.key === "ArrowLeft" && index > 0) { campos[index - 1].focus(); return; }
      }

      if (focoGrupo === 2) {
        const cards = gridRef.current?.querySelectorAll("[data-card]");
        if (!cards) return;
        let index = Array.from(cards).indexOf(document.activeElement);
        if (e.key === "ArrowRight" && index < cards.length - 1) { cards[index + 1].focus(); return; }
        if (e.key === "ArrowLeft" && index > 0) { cards[index - 1].focus(); return; }
      }

      if (focoGrupo === 3) {
        if (e.key === "ArrowRight" && paginaAtual < totalPaginas) { setPaginaAtual((p) => p + 1); return; }
        if (e.key === "ArrowLeft" && paginaAtual > 1) { setPaginaAtual((p) => p - 1); return; }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);

  }, [focoGrupo, destinoSelecionado, cadastroAberto, paginaAtual, totalPaginas]);

  /* ===== JSX FINAL ===== */
  return (
    <main className={`${styles.container} ${styles[modoTela]}`}>

      {boasVindas && (
        <div className={styles.boasVindas}>
          🌍 Bem-vindo ao ZenyAtlas, <strong>{nomeUsuario}</strong>!
        </div>
      )}

      <Navbar
        ref={navbarRef}
        modoTela={modoTela}
        setModoTela={setModoTela}
        onAbrirCadastro={(tipo) => setCadastroAberto(tipo)}
      />

      <HeroSearch
        ref={searchRef}
        modoTela={modoTela}
        destinoBusca={destinoBusca}
        setDestinoBusca={setDestinoBusca}
        precoMin={precoMin}
        setPrecoMin={setPrecoMin}
        precoMax={precoMax}
        setPrecoMax={setPrecoMax}
        setPaginaAtual={setPaginaAtual}
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        totalCarrinho={carrinho.length}
      />

      <CardGrid
        ref={gridRef}
        modoTela={modoTela}
        itensPagina={itensPagina}
        onCardClick={abrirModal}
        onRemover={handleRemover}
      />

      {modoTela !== "contato" && (
        <Paginacao
          ref={paginacaoRef}
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          setPaginaAtual={setPaginaAtual}
        />
      )}

      <ModalDestino
        destino={destinoSelecionado}
        onClose={fecharModal}
        onAdd={adicionarAoCarrinho}
      />

      {itemParaRemover && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Tem certeza que deseja remover <strong>{itemParaRemover.nome}</strong> do catálogo?</p>
            <div className={styles.confirmBtns}>
              <button className={styles.confirmOk} onClick={confirmarRemocao}>Ok</button>
              <button className={styles.confirmCancelar} onClick={() => setItemParaRemover(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {carrinhoAberto && <ModalCarrinho onClose={() => setCarrinhoAberto(false)} />}

      {cadastroAberto && (
        <ModalCadastro tipo={cadastroAberto} onClose={() => setCadastroAberto(null)} onItemCriado={handleItemCriado} />
      )}
    </main>
  );
}