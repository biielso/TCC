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


  const navigate = useNavigate();

  // 🌟 Transformamos a função em 'async' para poder esperar a resposta da API
  const handleSubmit = async (event) => {
    event.preventDefault();

    const hoje = new Date();
    const dataNasc = new Date(nascimento);
    const idade = hoje.getFullYear() - dataNasc.getFullYear();
    const aniversarioPassou = hoje >= new Date(hoje.getFullYear(), dataNasc.getMonth(), dataNasc.getDate());
    if (idade < 18 || (idade === 18 && !aniversarioPassou)) {
      alert('Você precisa ter pelo menos 18 anos para se cadastrar.');
      return;
    }

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipoUsuario: "CLIENTE",
      nascimento: nascimento,
      // 👇 A MÁGICA ACONTECE AQUI: O .replace tira tudo que não for número!
      cpf: cpf.replace(/\D/g, '')
    };

    try {
      const resposta = await cadastrarUsuario(novoUsuario);

      if (resposta.acess_token) {
        const payload = JSON.parse(atob(resposta.acess_token.split('.')[1]));
        localStorage.setItem('logado', 'true');
        localStorage.setItem('tipoUsuario', payload.role || '');
        localStorage.setItem('token', resposta.acess_token);
        navigate('/catalogo');
      } else {
        navigate('/login');
      }
    } catch (erro) {
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
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setCpf(v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4').replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3').replace(/(\d{3})(\d{1,3})/, '$1.$2'));
                }}
                required
              />
            </div>
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