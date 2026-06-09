// src/services/api.js

const URLz = "http://localhost:8080";

// Função para buscar os destinos (usada na TelaCatalogo)
export const buscarDestinos = async () => {
    const resposta = await fetch(`${URLz}/destinos`, {
        headers: authHeaders()
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

// Função para autenticar usuário (usada no TelaLogin)
export const loginUsuario = async (credenciais) => {
    const resposta = await fetch(`${URLz}/api/v1/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credenciais)
    });
    if (!resposta.ok) throw new Error("Credenciais inválidas");
    return resposta.json();
};

// Função para cadastrar usuário (usada na TelaCadastro)
export const cadastrarUsuario = async (novoUsuario) => {
    const resposta = await fetch(`${URLz}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario)
    });
    if (!resposta.ok) throw new Error("Erro ao cadastrar usuário");
    return resposta.json();
};

// Função para criar um novo pedido (usada na TelaPagamento)
export const criarPedido = async (novoPedido) => {
    const resposta = await fetch(`${URLz}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoPedido)
    });
    return resposta.json();
};

const authHeaders = () => {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

export const criarDestino = async (novoDestino) => {
    const resposta = await fetch(`${URLz}/destinos`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(novoDestino)
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const removerDestino = async (id) => {
    const resposta = await fetch(`${URLz}/destinos/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
};

export const removerHospedagem = async (id) => {
    const resposta = await fetch(`${URLz}/hospedagens/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
};

export const removerPacote = async (id) => {
    const resposta = await fetch(`${URLz}/pacotes/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
};

export const removerPromocao = async (id) => {
    const resposta = await fetch(`${URLz}/promocoes/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
};

export const buscarHospedagens = async () => {
    const resposta = await fetch(`${URLz}/hospedagens`, { headers: authHeaders() });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const criarHospedagem = async (dados) => {
    const resposta = await fetch(`${URLz}/hospedagens`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const buscarPacotes = async () => {
    const resposta = await fetch(`${URLz}/pacotes`, { headers: authHeaders() });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const criarPacote = async (dados) => {
    const resposta = await fetch(`${URLz}/pacotes`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const buscarPromocoes = async () => {
    const resposta = await fetch(`${URLz}/promocoes`, { headers: authHeaders() });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const criarPromocao = async (dados) => {
    const resposta = await fetch(`${URLz}/promocoes`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
};

export const buscarNomeUsuario = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.sub;
    const resposta = await fetch(`${URLz}/usuarios`, {
        headers: authHeaders()
    });
    if (!resposta.ok) return null;
    const usuarios = await resposta.json();
    const usuario = usuarios.find(u => u.email === email);
    return usuario ? usuario.nome : null;
};