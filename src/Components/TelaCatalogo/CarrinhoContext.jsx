import { createContext, useState } from "react";


export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionar(item) {
    setCarrinho((prev) => [...prev, item]);
  }

  function remover(nome) {
    setCarrinho((prev) => {
      const index = prev.findIndex((i) => i.nome === nome);
      if (index === -1) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  }

  function limpar() {
    setCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionar, remover, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
