import React, { useState, useEffect } from "react";
import styles from "./TelaCatalogo.module.css";

// Importar componentes
import Navbar from "./Navbar";
import HeroSearch from "./HeroSearch";
import CardGrid from "./CardGrid";
import Paginacao from "./Paginacao";

/* ===== DADOS DOS DESTINOS ===== */
const destinos = [
  { nome: "Praia do Forte", imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", descricao: "Areias brancas, águas cristalinas e uma vibe relaxante.", preco: "R$ 350,00" },
  { nome: "Machu Picchu", imagem: "https://th.bing.com/th/id/OIP.ZtMc5PVmpXCVrn7i7-5paQHaE8?w=241&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3", descricao: "Um dos destinos mais incríveis do mundo, repleto de história.", preco: "R$ 1.200,00" },
  { nome: "Paris", imagem: "https://tse2.mm.bing.net/th/id/OIP.Sw13f8OS0jUvNjCTN3ZJngHaEo?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "A cidade da luz e do romance, com a Torre Eiffel te esperando.", preco: "R$ 3.500,00" },
  { nome: "Grécia", imagem: "https://www.infoescola.com/wp-content/uploads/2018/09/atenas-719305414.jpg", descricao: "Ruínas antigas e águas cristalinas — um cenário inesquecível.", preco: "R$ 8.600,00" },
  { nome: "Singapura", imagem: "https://www.qantas.com/content/dam/travelinsider/images/travel-tips/here-s-what-not-to-do-in-singapore/iStock-590050726.jpg", descricao: "Cidade futurista e vibrante, com jardins suspensos e cultura única.", preco: "R$ 6.800,00" },
  { nome: "Ibiza", imagem: "https://tse1.mm.bing.net/th/id/OIP.zX_XLiUfl9AmM6Sx5NP3kgAAAA?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Praias paradisíacas e vida noturna eletrizante.", preco: "R$ 9.000,00" },
  { nome: "Veneza", imagem: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80", descricao: "Canais românticos e uma arquitetura inesquecível.", preco: "R$ 7.200,00" },
  { nome: "Dubai", imagem: "https://i.pinimg.com/originals/81/fb/19/81fb1935ab2d5a4e5ad2a8c3156201c9.jpg", descricao: "Luxo, inovação e desertos dourados — tudo em um só lugar.", preco: "R$ 12.000,00" },
  { nome: "Tóquio", imagem: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80", descricao: "Tradição e tecnologia convivendo em harmonia.", preco: "R$ 9.500,00" },
  { nome: "Nova York", imagem: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80", descricao: "A cidade que nunca dorme, cheia de cultura e vida urbana.", preco: "R$ 6.700,00" },
  { nome: "Cancún", imagem: "https://tse3.mm.bing.net/th/id/OIP.ymd1IkUXn36EIXKgbolYigHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Sol, mar azul-turquesa e diversão garantida.", preco: "R$ 5.800,00" },
  { nome: "Fernando de Noronha", imagem: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=270,height=180,dpr=1/tour_img/d9e93fed7e948de6919efcb3e1cda178e9aa424f3446a54c26ba99fc3be1c549.jpg", descricao: "O paraíso brasileiro com águas cristalinas e natureza exuberante.", preco: "R$ 4.200,00" },
  { nome: "Roma", imagem: "https://turismo.eurodicas.com.br/wp-content/uploads/2019/10/roma.jpg", descricao: "História viva e gastronomia irresistível.", preco: "R$ 8.000,00" },
  { nome: "Londres", imagem: "https://www.janeisatomas.com.br/wp-content/uploads/2016/08/londres.jpg", descricao: "Tradição britânica e cultura moderna.", preco: "R$ 7.400,00" },
  { nome: "Berlim", imagem: "https://www.cvc.com.br/dicas-de-viagem/wp-content/uploads/2021/06/Berlim.jpg", descricao: "História e inovação em uma só cidade.", preco: "R$ 6.100,00" },
  { nome: "Buenos Aires", imagem: "https://tse2.mm.bing.net/th/id/OIP.sQrtcYflobgOearytjPY4AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Charme latino, tango e boa gastronomia.", preco: "R$ 4.500,00" },
  { nome: "Toronto", imagem: "https://tse4.mm.bing.net/th/id/OIP.ruTuGger-_Zlfcd9g8i6SQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Cultura, diversidade e belas paisagens urbanas.", preco: "R$ 8.900,00" },
  { nome: "Bali", imagem: "https://tse2.mm.bing.net/th/id/OIP.gW7zbx73GrLjEuckNNtbMwHaEO?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Templos, praias e uma energia espiritual única.", preco: "R$ 7.800,00" },
  { nome: "Sydney", imagem: "https://www.civitatis.com/blog/wp-content/uploads/2018/01/vista-opera-house-sidney.jpg", descricao: "Um paraíso australiano com vida urbana e praias incríveis.", preco: "R$ 10.000,00" },
  { nome: "Cidade do Cabo", imagem: "https://www.infoescola.com/wp-content/uploads/2010/05/cidade-do-cabo_92510755.jpg", descricao: "Montanhas, mar e uma cultura vibrante.", preco: "R$ 6.300,00" },
];

/* ===== DADOS DAS HOSPEDAGENS ===== */
const hospedagens = [
  { nome: "Atlântico Prime Hotel", imagem: "https://media.staticontent.com/media/pictures/e699657e-d32d-41fc-a70a-77bec79b01b1/300x200", descricao: "Hotel moderno com vista deslumbrante para a cidade e serviços de luxo.", preco: "R$ 225,00" },
  { nome: "Avraham Holtels", imagem: "https://cf.bstatic.com/xdata/images/hotel/square600/755328153.webp?k=f4ec5ad7ab1ec905b5d8ed561fff3e88334a92a6124be1b29bdd8596f85cc844&o=", descricao: "Acomodações aconchegantes e atendimento personalizado em um ambiente tranquilo.", preco: "R$ 455,00" },
  { nome: "Too Hotel & Spa Paris", imagem: "https://www.grazia.fr/wp-content/uploads/grazia/2022/08/too-hotel-building-cjerome-galland-min-287x410.jpg", descricao: "Hospedagem elegante e sofisticada, com fácil acesso aos pontos turísticos.", preco: "R$ 1.307,00" },
  { nome: "Elia Ermou Athens Hotel", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/728744410.jpg?k=db7588b2a224d5bba12125217e89e815f09a505f4a19f9cfd4d0eb4c7c2c0595&o=", descricao: "Refúgio perfeito para relaxar, com spa, piscina e gastronomia requintada.", preco: "R$ 930,00" },
  { nome: "PARKROYAL COLLECTION Marina Bay, Singapore", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/605641216.jpg?k=2fd058ffe0b29f82fa6d0bab5996216aace62f35819f64b089f206a3b63efe89&o=", descricao: "Hotel boutique charmosa, localizada em bairro histórico e pitoresco.", preco: "R$ 2.721,00" },
  { nome: "The Standard, Ibiza", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/451951100.jpg?k=95225865018f3e88cfd74c088005a8630625f2f921841ab7fd87dcb898ec578e&o=", descricao: "Suítes espaçosas e confortáveis, ideal para famílias ou viagens a negócios.", preco: "R$ 1.202,00" },
  { nome: "Albergo Cavalletto & Doge Orseolo", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/59707209.jpg?k=944338f9bfd3754b310a3b2a77c06ae9df6f45899c88c91ea858bb8ab80f010b&o=", descricao: "Conforto e estilo em cada detalhe, com serviços exclusivos para os hóspedes.", preco: "R$ 777,00" },
  { nome: "Address Dubai Mall", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/397578213.jpg?k=426f8f088aae099e72b192409c5167baae32be8f5afd554a19f0cfe3b35c8e90&o=", descricao: "Localizado à beira-mar, oferece quartos com vista panorâmica e diversas atividades.", preco: "R$ 3.938,00" },
  { nome: "The Gate Hotel Tokyo by Hulic", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/219186638.jpg?k=2345e338a266b160d19f5adda9137b1761aab25ef558b1d8184da836358cadc1&o=", descricao: "Hotel aconchegante em meio à natureza, perfeito para quem busca paz e descanso.", preco: "R$ 2.296,00" },
  { nome: "Carnegie Hotel", imagem: "https://cf.bstatic.com/xdata/images/hotel/square240/527154443.webp?k=f81c037a12f9c43a4d6ca0ffb25b933d93245c657b139fd7afc57dd1d25ab1fd&o=", descricao: "Experiência única em um hotel de luxo com restaurante premiado e bar deslumbrante.", preco: "R$  2.138,00" },
  { nome: "Renaissance Cancún Resort & Marina", imagem: "https://cf.bstatic.com/xdata/images/hotel/square240/428269971.webp?k=d3a36081c55bfc96b0d2797a70b068598aacb5c127b8b793e7fe54016107fc15&o=", descricao: "Refúgio romântico com suíte privada, jacuzzi e um ambiente intimista.", preco: "R$ 1.415,00" },
  { nome: "Martinelli Residence", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/437653081.jpg?k=3ad443b9a23646c51fb2fcd385a5c6496e572f5903f65c86c620db6dc5e36b21&o=", descricao: "Um refúgio único onde o moderno encontra o místico, proporcionando uma experiência imersiva e inesquecível.", preco: "R$ 520,00" },
  { nome: "The Spanish Suite Via di Ripetta", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/122087573.jpg?k=c15f6b1e9013b98671251830d66ed0c12287539e6246017cf0ef64f9d3a7921c&o=", descricao: "Um espaço tranquilo, perfeito para quem busca harmonia e conexão com a natureza ao seu redor.", preco: "R$ 997,00" },
  { nome: "Notting Hill House", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/464042313.jpg?k=9336011829a361fc7133ca07c1a004f545e002ce0ea80e8aebba1c0c6765356c&o=", descricao: "Um ambiente elegante e imponente, ideal para quem busca luxo e uma sensação de grandiosidade.", preco: "R$ 1.694,00" },
  { nome: "Das Copnic Berlin", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/411214579.jpg?k=7480639801367840478c21e47ac2bd3f25855d8fc42e9b1003858648110d1238&o=", descricao: "Um destino sereno e acolhedor, onde a tranquilidade e a beleza natural se encontram em perfeita harmonia.", preco: "R$ 427,00" },
  { nome: "Carles Hotel", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/568497209.jpg?k=f60e896769bdb7915c40a45257bd5ee92ce8b1a01f314c531cb7076194bc7c5e&o=", descricao: "Um lugar onde o conforto e a paz são complementados por vistas deslumbrantes e um clima tropical acolhedor.", preco: "R$ 2.027,00" },
  { nome: "Plaza Suites On International Drive Near Universal Epic", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/116151914.jpg?k=a9d517f1a2689b2673f804b89b64f8f18dbe3a2e6d4f707b8889f2ae66d16d1e&o=", descricao: "Uma opção ideal para quem busca descanso e aventura em um cenário repleto de charme e sofisticação.", preco: "R$ 847,00" },
  { nome: "Gula Busa Guest House", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/728148520.jpg?k=9477a595ba937227173c5714ba24abc5245f372cfd8e0e021f54418932ec5127&o=", descricao: "Um hotel intimista, onde a tranquilidade do ambiente e a beleza do pôr do sol criam momentos inesquecíveis.", preco: "R$ 110,00" },
  { nome: "The Old Clare by Ode Hotels", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/558622488.jpg?k=895a64af58a910c25e93bdceb30ed1751eb999f41ff1f832cdae64833033ca8b&o=", descricao: "Um local de charme histórico e serenidade, perfeito para quem aprecia uma atmosfera refinada e relaxante..", preco: "R$ 1.374,00" },
  { nome: "Cape Heritage Hotel", imagem: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/287118687.jpg?k=cb97031a7089f17b8113d5f176a737ff1df9d27071c181f93ecefaf52a2ce5be&o=", descricao: "Um hotel sustentável, rodeado pela natureza, proporcionando uma experiência única de imersão ecológica e conforto.", preco: "R$ 1.040,00" },
];

/* ===== DADOS DOS PACOTES ===== */
const pacotes = [
  { nome: "São Paulo - Rio de Janeiro", imagem: "https://example.com/passagem1.jpg", descricao: "Voos diretos para o Rio.", preco: "R$ 299,00" },
  { nome: "Rio de Janeiro - Salvador", imagem: "https://example.com/passagem2.jpg", descricao: "Viaje de Rio para Salvador.", preco: "R$ 399,00" },
  { nome: "Brasília - São Paulo", imagem: "https://example.com/passagem3.jpg", descricao: "Voe direto de Brasília para São Paulo.", preco: "R$ 349,00" },
  { nome: "São Paulo - Porto Alegre", imagem: "https://example.com/passagem4.jpg", descricao: "Voos rápidos para Porto Alegre.", preco: "R$ 499,00" },
  { nome: "Salvador - Recife", imagem: "https://example.com/passagem5.jpg", descricao: "Explore as praias de Recife.", preco: "R$ 450,00" },
  { nome: "Curitiba - Florianópolis", imagem: "https://example.com/passagem6.jpg", descricao: "Curta as praias de Santa Catarina.", preco: "R$ 359,00" },
  { nome: "Fortaleza - Natal", imagem: "https://example.com/passagem7.jpg", descricao: "Voos baratos de Fortaleza para Natal.", preco: "R$ 389,00" },
];

/* ===== DADOS DAS PROMOÇÕES ===== */
const promocoes = [
  { nome: "Voo para Fortaleza", imagem: "https://images.ctfassets.net/bth3mlrehms2/7dEwJGfUcua5BnkckMXnXV/6a24637e2cb4b01f8d53c374bd8ae5b8/Fortaleza__Ceara___Brasilien_.jpg?w=1080&q=60&fm=webp", descricao: "Saindo de São Paulo - Ida e Volta. Oferta imperdível para curtir o litoral cearense!", preco: "R$ 1.023,00" },
  { nome: "Orlando + Nova York", imagem: "https://forbes.com.br/wp-content/uploads/2019/09/abre_lifestyle_Nova-York_200919_GettyImages-1024x683.jpg", descricao: "Dois destinos incríveis em uma só viagem! Ida e volta inclusa.", preco: "R$ 3.370,00" },
  { nome: "Ingressos para Walt Disney World Resort", imagem: "https://mediaim.expedia.com/localexpert/181079/5e003b9b-95c2-4b55-a8dc-aaf2d5f294a3.jpg", descricao: "Diversão garantida com reserva flexível e muita magia em Orlando.", preco: "R$ 791,00" },
  { nome: "Voos para Orlando", imagem: "https://tse4.mm.bing.net/th/id/OIP.IV7bMyBTATGyKpkPCCD5-wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Saindo de São Paulo - Ida e volta com ótimos preços e conforto.", preco: "R$ 2.499,00" },
  { nome: "Ingressos para Walt Disney World Resort", imagem: "https://mediaim.expedia.com/localexpert/181079/5e003b9b-95c2-4b55-a8dc-aaf2d5f294a3.jpg", descricao: "Diversão garantida com reserva flexível e muita magia em Orlando.", preco: "R$ 791,00" },
  { nome: "Voos para Orlando", imagem: "https://tse4.mm.bing.net/th/id/OIP.IV7bMyBTATGyKpkPCCD5-wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", descricao: "Ida e volta com ótimos preços e conforto.", preco: "R$ 1.509,00" },
];

/* ===== CONVERSOR DE PREÇO ===== */
function precoParaNumero(precoStr) {
  if (!precoStr) return 0;
  let limpo = precoStr.replace(/[^\d,]/g, "");
  if (limpo.includes(",")) {
    limpo = limpo.replace(",", ".");
  }
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

/* ===== COMPONENTE PRINCIPAL ===== */
export default function TelaCatalogo() {
  const itemsPerPage = 3;
  const [modoTela, setModoTela] = useState("destinos");
  const [destinosFiltrados, setDestinosFiltrados] = useState(destinos);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [destinoBusca, setDestinoBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [modoFoco, setModoFoco] = useState("catalogo");

  const listaAtual =
    modoTela === "destinos"
      ? destinos
      : modoTela === "hospedagens"
      ? hospedagens
      : modoTela === "pacotes"
      ? pacotes
      : modoTela === "promoções"
      ? promocoes
      : [];

  const totalPaginas = Math.ceil(destinosFiltrados.length / itemsPerPage);

  // Filtros
  useEffect(() => {
    const precoMinNum = precoMin ? Number(precoMin) : 0;
    const precoMaxNum = precoMax ? Number(precoMax) : Infinity;
    const filtrados = listaAtual.filter((d) => {
      const nomeLower = d.nome.toLowerCase();
      const precoNum = precoParaNumero(d.preco);
      const matchNome = nomeLower.includes(destinoBusca.toLowerCase());
      const matchPreco = precoNum >= precoMinNum && precoNum <= precoMaxNum;
      return matchNome && matchPreco;
    });
    setDestinosFiltrados(filtrados);
    setPaginaAtual(1);
  }, [destinoBusca, precoMin, precoMax, modoTela]);

  // Navegação por teclado
  useEffect(() => {
    const modos = ["destinos", "hospedagens", "pacotes", "promoções", "contato"];
    let indexCampo = 0;

    const handleKeyNavigation = (event) => {
      if (modoFoco === "catalogo") {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          const indexAtual = modos.indexOf(modoTela);
          if (event.key === "ArrowRight") {
            const proximo = (indexAtual + 1) % modos.length;
            setModoTela(modos[proximo]);
          } else {
            const anterior = (indexAtual - 1 + modos.length) % modos.length;
            setModoTela(modos[anterior]);
          }
          setPaginaAtual(1);
          return;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          setModoFoco("busca");
          document.getElementById("campo-nome")?.focus();
          indexCampo = 0;
          return;
        }
      }

      if (modoFoco === "busca") {
        const campos = [
          document.getElementById("campo-nome"),
          document.getElementById("campo-preco-min"),
          document.getElementById("campo-preco-max"),
          document.getElementById("botao-buscar"),
        ];

        if (event.key === "ArrowRight") {
          event.preventDefault();
          indexCampo = (indexCampo + 1) % campos.length;
          campos[indexCampo]?.focus();
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          indexCampo = (indexCampo - 1 + campos.length) % campos.length;
          campos[indexCampo]?.focus();
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          setModoFoco("catalogo");
          document.activeElement.blur();
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [modoTela, modoFoco]);

  const startIndex = (paginaAtual - 1) * itemsPerPage;
  const itensPagina = destinosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  function handleNavigate(to) {
    alert(`Navegar para: ${to}`);
  }

  return (
    <main className={`${styles.container} ${styles[modoTela]}`}>
      <Navbar modoTela={modoTela} setModoTela={setModoTela} />

      <HeroSearch
        modoTela={modoTela}
        destinoBusca={destinoBusca}
        setDestinoBusca={setDestinoBusca}
        precoMin={precoMin}
        setPrecoMin={setPrecoMin}
        precoMax={precoMax}
        setPrecoMax={setPrecoMax}
        setPaginaAtual={setPaginaAtual}
      />

      <CardGrid
        modoTela={modoTela}
        itensPagina={itensPagina}
        onNavigate={handleNavigate}
      />

      {modoTela !== "contato" && (
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          setPaginaAtual={setPaginaAtual}
        />
      )}
    </main>
  );
}