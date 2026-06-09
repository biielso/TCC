import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModalDestino.module.css";

export default function ModalDestino({ destino, onClose }) {
    const navigate = useNavigate();
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({ ...destino });
    const podeEditar = ['ADMIN', 'FUNCIONARIO'].includes(localStorage.getItem('tipoUsuario'));

    if (!destino) return null;

    function handlePagar() {
        onClose();
        navigate("/pagamento", { state: { item: destino } });
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSalvar() {
        // TODO: conectar ao endpoint PUT/PATCH da API
        alert('Salvo localmente! Conecte ao endpoint da API para persistir.');
        setEditando(false);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>X</button>

                {editando ? (
                    <>
                        <h2 style={{ marginBottom: 12 }}>Editar</h2>
                        <div style={{ textAlign: 'left' }}>
                            {[['nome', 'Nome'], ['descricao', 'Descrição'], ['preco', 'Preço'], ['imagem', 'URL da Imagem']].map(([campo, label]) => (
                                <div key={campo} style={{ marginBottom: 10 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block' }}>{label}</label>
                                    <input
                                        name={campo}
                                        value={form[campo] || ''}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #d1d5db', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            <button className={styles.addBtn} onClick={handleSalvar}>💾 Salvar</button>
                            <button className={styles.addBtn} style={{ background: '#6b7280' }} onClick={() => setEditando(false)}>Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <img src={destino.imagem} className={styles.img} alt={destino.nome} />
                        <h2>{destino.nome}</h2>
                        <p>{destino.descricao}</p>
                        <h3>Preço: R$ {destino.preco}</h3>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center' }}>
                            <button className={styles.addBtn} onClick={handlePagar}>💳 Pagar</button>
                            {podeEditar && (
                                <button className={styles.addBtn} style={{ background: '#5b4fcf' }} onClick={() => setEditando(true)}>✏️ Editar</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
