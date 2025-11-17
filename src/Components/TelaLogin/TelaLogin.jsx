import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import styles from './TelaLogin.module.css';

export default function TelaLogin() {
  const [emailOuCpf, setEmailOuCpf] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook do React Router para redirecionar

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita reload da página
    alert(`Entrando com:\nEmail/CPF: ${emailOuCpf}\nSenha: ${senha}`);
    // Aqui você pode colocar a lógica real de login (API, validação, etc)
  };

  const handleCadastroClick = (e) => {
    e.preventDefault(); // Evita que o link recarregue a página
    navigate('/cadastro'); // Redireciona para a rota de cadastro
  };

  return (
    <div className={styles.container}>
      <div className={styles.caixa}>
        <div className={styles.texto}>
          <h1>ZENYATLAS</h1>
          <p>Encontre seu <br /> equilíbrio em cada destino</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.campo}>
            <label htmlFor="email">E-MAIL OU CPF</label>
            <input
              type="text"
              id="email"
              className={styles.barra}
              placeholder="Digite seu e-mail ou CPF"
              value={emailOuCpf}
              onChange={(e) => setEmailOuCpf(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha">SENHA</label>
            <input
              type="password"
              id="senha"
              className={styles.barra}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.entrar}>Entrar</button>

          <p className={styles.link}>
            Ainda não tem conta?{' '}
            <a href="/cadastro" onClick={handleCadastroClick}>Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}
