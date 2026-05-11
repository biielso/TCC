import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Telacadastro.module.css';
import { cadastrarUsuario } from '../../service/api'; // 🌟 Importando a API

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // 🌟 Novo estado para a senha
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');

  const navigate = useNavigate();

  // 🌟 Transformamos a função em 'async' para poder esperar a resposta da API
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Montamos o "pacote" (JSON) exatamente com os nomes que o Java espera
// 1. Montamos o "pacote" (JSON)
    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipo: "CLIENTE", 
      nascimento: nascimento,
      // 👇 A MÁGICA ACONTECE AQUI: O .replace tira tudo que não for número!
      cpf: cpf.replace(/\D/g, ''), 
      cep: cep.replace(/\D/g, '')
    };

    try {
      // 2. Enviamos para o Java salvar no banco de dados
      const usuarioSalvo = await cadastrarUsuario(novoUsuario);
      
      // 3. Se deu tudo certo, redireciona para o login
      navigate('/login');
      
    } catch (erro) {
      // 4. Se o Java der erro (ex: email já existe, faltou dado), cai aqui
      console.error("Erro ao cadastrar na API:", erro);
      alert('Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
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

          {/* 🌟 NOVO CAMPO DE SENHA */}
          <div className={styles.campo}>
            <label htmlFor="senha">SENHA</label>
            <input
              type="password"
              id="senha"
              className={styles.barra}
              placeholder="Crie uma senha segura"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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