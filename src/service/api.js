// src/services/api.js

const URLz = "http://localhost:8080";

// Função para buscar os destinos (usada na TelaCatalogo)
export const buscarDestinos = async () => {
    const token = localStorage.getItem("token");
    const resposta = await fetch(`${URLz}/destinos`, {
        headers: { "Authorization": `Bearer ${token}` }
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
    const resposta = await fetch(`${URLz}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
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

// Função para cadastrar um novo destino (ideal para a Tela do Administrador)
export const criarDestino = async (novoDestino) => {
    const resposta = await fetch(`${URLz}/destinos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoDestino)
    });
    return resposta.json();
};