import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./TelaCatalogo.module.css";
import { buscarDestinos } from '../../service/api';

import Navbar from "./Navbar";
import HeroSearch from "./HeroSearch";
import CardGrid from "./CardGrid";
import Paginacao from "./Paginacao";
import ModalDestino from "./ModalDestino";
import ModalCadastro from "./ModalCadastro";

import { CarrinhoContext } from "./CarrinhoContext.jsx";

/* ===== DADOS MOCKADOS (FALSOS) ===== */
// Nota: Deixei a lista falsa de 'destinos' comentada aqui caso você precise dela no futuro como backup.
// const destinosFalsos = [ ... ]; 

const hospedagens = [
  { nome: "Atlântico Prime Hotel", imagem: "https://media.staticontent.com/media/pictures/e699657e-d32d-41fc-a70a-77bec79b01b1/300x200", descricao: "Hotel moderno com vista deslumbrante...", preco: "R$ 225,00", allInclusive: "All Inclusive", piscina: "Piscina", checkin: "18/02/2025" },
  // ... (os outros dados de hospedagem continuam normais)
];

const pacotes = [
  { nome: "São Paulo - Rio de Janeiro", imagem: "https://tse1.mm.bing.net/th/id/OIP.tMcfRxXU2gxjm6YqAWecywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Voos diretos para o Rio.", preco: "R$ 299,00", aereo: "Aéreo ida e volta", hospedagem: "Hospedagem com café da manhã", saida: "15/02/2025" },
  // ... (os outros pacotes continuam normais)
];

const promocoes = [
  { nome: "Voo para Fortaleza", imagem: "https://images.ctfassets.net/bth3mlrehms2/7dEwJGfUcua5BnkckMXnXV/6a24637e2cb4b01f8d53c374bd8ae5b8/Fortaleza__Ceara___Brasilien_.jpg?w=1080&q=60&fm=webp", descricao: "Saindo de São Paulo...", preco: "R$ 1.023,00", aereo: "Aéreo ida e volta", saida: "22/02/2025", desconto: "Desconto de 6% no pix" },
  // ... (as outras promoções continuam normais)
];

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

  // 🌟 EXPLICAÇÃO 2: Criamos um estado só para a API
  const [destinosDaAPI, setDestinosDaAPI] = useState([]);

  const [modoTela, setModoTela] = useState("destinos");
  
  // Inicia os filtrados como um array vazio, eles serão preenchidos pelo useEffect
  const [destinosFiltrados, setDestinosFiltrados] = useState([]); 
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [destinoBusca, setDestinoBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  const [destinoSelecionado, setDestinoSelecionado] = useState(null);
  const { adicionar } = useContext(CarrinhoContext);
  const [cadastroAberto, setCadastroAberto] = useState(null);

  /* ====== REFS PARA NAVEGAÇÃO ====== */
  const navbarRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  const paginacaoRef = useRef(null);

  const [focoGrupo, setFocoGrupo] = useState(0);

  // 🌟 EXPLICAÇÃO 3: Buscando os dados do Java
  useEffect(() => {
    buscarDestinos()
      .then(dados => {
        setDestinosDaAPI(Array.isArray(dados) ? dados : []);
      })
      .catch(erro => console.error("Erro na API de destinos:", erro));
  }, []);

  /* ===== LISTA ATUAL ===== */
  // 🌟 EXPLICAÇÃO 4: Substituindo os falsos pela API
  const listaAtual =
    modoTela === "destinos" ? destinosDaAPI :
    modoTela === "hospedagens" ? hospedagens :
    modoTela === "pacotes" ? pacotes :
    modoTela === "promoções" ? promocoes :
    [];

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
      />

      {/* AQUI É ONDE A MÁGICA VISUAL ACONTECE. Os dados filtrados da API vão para o Grid! */}
      <CardGrid
        ref={gridRef}
        modoTela={modoTela}
        itensPagina={itensPagina}
        onCardClick={abrirModal}
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

      {cadastroAberto && (
        <ModalCadastro tipo={cadastroAberto} onClose={() => setCadastroAberto(null)} />
      )}
    </main>
  );
}