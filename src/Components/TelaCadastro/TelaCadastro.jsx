import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import styles from './Telacadastro.module.css';

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');

  const navigate = useNavigate(); // Hook do React Router

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Cadastro realizado:\nNome: ${nome}\nEmail: ${email}\nNascimento: ${nascimento}\nCPF: ${cpf}\nCEP: ${cep}`
    );

    // Aqui você pode integrar com uma API real de cadastro

    // Após o cadastro, você pode redirecionar o usuário automaticamente para o login:
    navigate('/login');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login'); // Redireciona para a tela de login
  };

  return (
    <div className={styles.container}>
      <div className={styles.caixa}>
        <div className={styles.texto}>
          <h1>ZENYATLAS</h1>
          <p>Crie sua conta e descubra o equilíbrio em cada destino</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.campo}>
            <label htmlFor="nome">NOME COMPLETO</label>
            <input
              type="text"
              id="nome"
              className={styles.barra}
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="email">E-MAIL</label>
            <input
              type="email"
              id="email"
              className={styles.barra}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles['campo-duplo']}>
            <div className={styles.campo}>
              <label htmlFor="nascimento">DATA DE NASCIMENTO</label>
              <input
                type="date"
                id="nascimento"
                className={styles.barra}
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                required
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                className={styles.barra}
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.campo}>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              className={styles.barra}
              placeholder="Digite seu CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.entrar}>
            Cadastrar
          </button>

          <p className={styles.link}>
            Já possui uma conta?{' '}
            <a href="/login" onClick={handleLoginClick}>
              Fazer login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
