import React from "react";
import styles from "./ModalDestino.module.css"; // opcional

export default function ModalDestino({ destino, onClose, onAdd }) {
    if (!destino) return null; // Se não tiver destino selecionado, não renderiza nada

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>X</button>

                <img src={destino.imagem} className={styles.img} />

                <h2>{destino.nome}</h2>
                <p>{destino.descricao}</p>

                <h3>Preço: R$ {destino.preco}</h3>

                <button className={styles.addBtn} onClick={() => onAdd(destino)}>
                    ➕ Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
}
