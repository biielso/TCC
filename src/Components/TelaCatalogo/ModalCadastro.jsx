import { useState } from "react";
import styles from "./ModalCadastro.module.css";
import { cadastrarUsuario } from "../../service/api";

const categorias = ["Destinos", "Hospedagens", "Pacotes", "Promoções"];

const placeholders = {
  Destinos: "Ex: Praia do Forte",
  Hospedagens: "Ex: Hotel Atlântico",
  Pacotes: "Ex: São Paulo - Rio de Janeiro",
  Promoções: "Ex: Voo para Fortaleza",
};

export default function ModalCadastro({ onClose, tipo }) {
  // --- estado destinos ---
  const [categoria, setCategoria] = useState("Destinos");
  const [form, setForm] = useState({ nome: "", descricao: "", preco: "", imagem: "" });
  const [itens, setItens] = useState({ Destinos: [], Hospedagens: [], Pacotes: [], Promoções: [] });

  // --- estado funcionário ---
  const [formFunc, setFormFunc] = useState({ nome: "", email: "", senha: "", tipo: "FUNCIONARIO" });
  const [mensagemFunc, setMensagemFunc] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setItens((prev) => ({ ...prev, [categoria]: [...prev[categoria], { ...form }] }));
    setForm({ nome: "", descricao: "", preco: "", imagem: "" });
  }

  async function handleSubmitFunc(e) {
    e.preventDefault();
    try {
      await cadastrarUsuario({ nome: formFunc.nome, email: formFunc.email, senha: formFunc.senha, tipoUsuario: formFunc.tipo, nascimento: "2000-01-01", cpf: "00000000000" });
      setMensagemFunc("Funcionário cadastrado com sucesso!");
      setFormFunc({ nome: "", email: "", senha: "", tipo: "FUNCIONARIO" });
    } catch {
      setMensagemFunc("Erro ao cadastrar. Verifique os dados.");
    }
  }

  const listaAtual = itens[categoria];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.painel} onClick={(e) => e.stopPropagation()}>

        <div className={styles.header}>
          <div>
            <div className={styles.headerLogo}>ZENYATLAS</div>
            <div className={styles.headerSub}>
              {tipo === "funcionario" ? "Cadastro de Funcionário" : "Painel do Funcionário"}
            </div>
          </div>
          <button className={styles.sairBtn} onClick={onClose}>Sair</button>
        </div>

        <div className={styles.body}>

          {tipo === "funcionario" ? (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Novo Funcionário</h2>
              <form onSubmit={handleSubmitFunc} className={styles.form}>
                <label className={styles.label}>Nome</label>
                <input className={styles.input} placeholder="Nome completo" value={formFunc.nome}
                  onChange={(e) => setFormFunc({ ...formFunc, nome: e.target.value })} required />

                <label className={styles.label}>E-mail</label>
                <input type="email" className={styles.input} placeholder="email@exemplo.com" value={formFunc.email}
                  onChange={(e) => setFormFunc({ ...formFunc, email: e.target.value })} required />

                <label className={styles.label}>Senha</label>
                <input type="password" className={styles.input} placeholder="Crie uma senha" value={formFunc.senha}
                  onChange={(e) => setFormFunc({ ...formFunc, senha: e.target.value })} required />

                <label className={styles.label}>Tipo</label>
                <select className={styles.input} value={formFunc.tipo}
                  onChange={(e) => setFormFunc({ ...formFunc, tipo: e.target.value })}>
                  <option value="FUNCIONARIO">Funcionário</option>
                  <option value="ADMIN">Admin</option>
                </select>

                {mensagemFunc && (
                  <p style={{ color: mensagemFunc.includes("sucesso") ? "green" : "red", fontSize: 13 }}>
                    {mensagemFunc}
                  </p>
                )}
                <button type="submit" className={styles.addBtn}>Cadastrar</button>
              </form>
            </div>
          ) : (
            <>
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Adicionar Produto</h2>
                <div className={styles.abas}>
                  {categorias.map((cat) => (
                    <button key={cat}
                      className={`${styles.aba} ${categoria === cat ? styles.abaAtiva : ""}`}
                      onClick={() => setCategoria(cat)} type="button">
                      {cat}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label className={styles.label}>Nome</label>
                  <input name="nome" className={styles.input} placeholder={placeholders[categoria]}
                    value={form.nome} onChange={handleChange} required />

                  <label className={styles.label}>Descrição</label>
                  <textarea name="descricao" className={styles.textarea} placeholder="Descreva o produto"
                    value={form.descricao} onChange={handleChange} required rows={4} />

                  <label className={styles.label}>Preço</label>
                  <input name="preco" className={styles.input} placeholder="R$ 299,00"
                    value={form.preco} onChange={handleChange} required />

                  <label className={styles.label}>URL da Imagem</label>
                  <input name="imagem" className={styles.input} placeholder="https://exemplo.com/imagem.jpg"
                    value={form.imagem} onChange={handleChange} required />

                  <button type="submit" className={styles.addBtn}>Adicionar</button>
                </form>
              </div>

              <div className={styles.card}>
                <h2 className={styles.cardTitle}>{categoria} ({listaAtual.length})</h2>
                {listaAtual.length === 0 ? (
                  <p className={styles.vazio}>Nenhum produto cadastrado nesta categoria</p>
                ) : (
                  <div className={styles.lista}>
                    {listaAtual.map((item, i) => (
                      <div key={i} className={styles.itemLista}>
                        {item.imagem && <img src={item.imagem} alt={item.nome} className={styles.itemImg} />}
                        <div>
                          <strong>{item.nome}</strong>
                          <p>{item.descricao}</p>
                          <span className={styles.itemPreco}>{item.preco}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
