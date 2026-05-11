import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TelaPagamento.module.css";
import { criarPedido } from "../../service/api"; // 🌟 Importando a função da API

export default function TelaPagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;
  const [metodoPagamento, setMetodoPagamento] = useState("");

  if (!item) {
    return (
      <div className={styles.container}>
        <h2>Nenhum item selecionado</h2>
        <button onClick={() => navigate("/catalogo")}>Voltar ao Catálogo</button>
      </div>
    );
  }

  // 🌟 Transformando a função em async para o fetch
  async function handlePagamento() {
    // 1. Montamos o pacote no formato exato que as Entidades do Java exigem
    const novoPedido = {
      metodoPagamento: metodoPagamento,
      usuario: { 
        id: 1 // ⚠️ ATENÇÃO: Deixando fixo como 1 por enquanto. O ideal no futuro é pegar do usuário logado!
      },
      destino: { 
        id: item.id // Pega o ID verdadeiro do destino que veio lá da TelaCatalogo
      }
    };

    try {
      // 2. Envia para o Spring Boot salvar no banco SQL Server
      await criarPedido(novoPedido);

      alert(`Pagamento realizado com sucesso via ${metodoPagamento}!\nSeu pedido foi registrado no sistema.`);
      navigate("/catalogo");

    } catch (erro) {
      console.error("Erro ao registrar o pedido na API:", erro);
      alert("Ocorreu um erro ao processar seu pedido. O banco de dados está rodando?");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Finalizar Pagamento</h1>
        
        <div className={styles.itemInfo}>
          <img src={item.imagem} alt={item.nome} className={styles.imagem} />
          <h2>{item.nome}</h2>
          <p>{item.descricao}</p>
          <h3 className={styles.preco}>{item.preco}</h3>
        </div>

        <div className={styles.metodosContainer}>
          <h3>Escolha o método de pagamento:</h3>
          
          <div className={styles.metodos}>
            <button
              className={`${styles.metodoBtn} ${metodoPagamento === "Cartão de Crédito" ? styles.ativo : ""}`}
              onClick={() => setMetodoPagamento("Cartão de Crédito")}
            >
              💳 Cartão de Crédito
            </button>
            
            <button
              className={`${styles.metodoBtn} ${metodoPagamento === "Cartão de Débito" ? styles.ativo : ""}`}
              onClick={() => setMetodoPagamento("Cartão de Débito")}
            >
              💳 Cartão de Débito
            </button>
            
            <button
              className={`${styles.metodoBtn} ${metodoPagamento === "Pix" ? styles.ativo : ""}`}
              onClick={() => setMetodoPagamento("Pix")}
            >
              📱 Pix
            </button>
          </div>
        </div>

        <div className={styles.acoes}>
          <button 
            className={styles.btnPagar} 
            onClick={handlePagamento}
            disabled={!metodoPagamento}
          >
            Confirmar Pagamento
          </button>
          <button 
            className={styles.btnVoltar} 
            onClick={() => navigate("/catalogo")}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}