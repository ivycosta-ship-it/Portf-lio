const topo = document.getElementById("topo");
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const fecharLightbox = document.getElementById("fecharLightbox");

let ultimoScroll = 0;

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("aberto");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("aberto"));
});

window.addEventListener("scroll", () => {
  const atual = window.scrollY;
  if (atual > 80 && atual > ultimoScroll) {
    topo.classList.add("escondido");
    nav.classList.remove("aberto");
  } else {
    topo.classList.remove("escondido");
  }
  ultimoScroll = atual;
});

const secoes = document.querySelectorAll("section[id]");
const linksNav = nav.querySelectorAll("a");

const destacarLink = () => {
  const posicao = window.scrollY + 140;
  secoes.forEach((secao) => {
    const topoSecao = secao.offsetTop;
    const altura = secao.offsetHeight;
    const id = secao.getAttribute("id");
    const link = nav.querySelector(`a[href="#${id}"]`);
    if (!link) return;
    if (posicao >= topoSecao && posicao < topoSecao + altura) {
      linksNav.forEach((item) => item.classList.remove("ativo"));
      link.classList.add("ativo");
    }
  });
};

window.addEventListener("scroll", destacarLink);
destacarLink();

document.querySelectorAll("[data-lightbox]").forEach((imagem) => {
  imagem.addEventListener("click", () => {
    lightboxImg.src = imagem.src;
    lightboxImg.alt = imagem.alt;
    lightbox.classList.add("aberto");
  });
});

const fechar = () => {
  lightbox.classList.remove("aberto");
  lightboxImg.src = "";
};

fecharLightbox.addEventListener("click", fechar);
lightbox.addEventListener("click", (evento) => {
  if (evento.target === lightbox) fechar();
});
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fechar();
});
