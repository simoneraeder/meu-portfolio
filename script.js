/* ==========================================================================
   1. FUNÇÃO DE DIGITAÇÃO DINÂMICA PARA TÍTULOS
   ========================================================================== */
function animarTitulo(elemento) {
  if (!elemento) return;
  
  // Evita reanimar se já estiver rodando a animação
  if (elemento.dataset.animando === 'true') return;
  elemento.dataset.animando = 'true';

  // Salva o texto original se ainda não tiver salvo
  if (!elemento.dataset.textoOriginal) {
    elemento.dataset.textoOriginal = elemento.textContent;
  }

  const texto = elemento.dataset.textoOriginal;
  elemento.textContent = '';
  let index = 0;

  function digitar() {
    if (index < texto.length) {
      elemento.textContent += texto.charAt(index);
      index++;
      setTimeout(digitar, 60); // Velocidade da digitação
    } else {
      elemento.dataset.animando = 'false';
    }
  }

  digitar();
}

// Anima o título "Sobre Mim" assim que a página carrega
document.addEventListener('DOMContentLoaded', () => {
  const primeiroTitulo = document.querySelector('#sobre h2');
  if (primeiroTitulo) {
    animarTitulo(primeiroTitulo);
  }
});

/* ==========================================================================
   2. BOTÃO DE TEMA (CLARO / ESCURO)
   ========================================================================== */
const nav = document.querySelector('nav');
const btnTema = document.createElement('button');
btnTema.id = 'btn-tema';
btnTema.innerHTML = '🌙';
btnTema.title = 'Alternar Tema';

btnTema.style.background = 'transparent';
btnTema.style.border = '1px solid var(--border-color)';
btnTema.style.color = 'var(--text-primary)';
btnTema.style.padding = '0.4rem 0.8rem';
btnTema.style.borderRadius = 'var(--radius)';
btnTema.style.cursor = 'pointer';
btnTema.style.fontSize = '1rem';
btnTema.style.transition = 'var(--transition)';

if (nav) {
  nav.appendChild(btnTema);
}

let temaEscuro = true;

btnTema.addEventListener('click', () => {
  const root = document.documentElement;

  if (temaEscuro) {
    root.style.setProperty('--bg-primary', '#f8fafc');
    root.style.setProperty('--bg-secondary', '#ffffff');
    root.style.setProperty('--bg-card', '#f1f5f9');
    root.style.setProperty('--text-primary', '#0f172a');
    root.style.setProperty('--text-secondary', '#475569');
    root.style.setProperty('--border-color', '#cbd5e1');
    btnTema.innerHTML = '☀️';
    temaEscuro = false;
  } else {
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#1e293b');
    root.style.setProperty('--bg-card', '#334155');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#94a3b8');
    root.style.setProperty('--border-color', '#475569');
    btnTema.innerHTML = '🌙';
    temaEscuro = true;
  }
});

/* ==========================================================================
   3. DESTAQUE DO MENU E ANIMAÇÃO AO CLICAR NOS TÍTULOS
   ========================================================================== */
const secoes = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('nav ul li a');

function atualizarLinkAtivo(idSecao) {
  linksNav.forEach(link => {
    link.style.color = 'var(--text-secondary)';
    link.style.fontWeight = '500';

    if (link.getAttribute('href') === `#${idSecao}`) {
      link.style.color = 'var(--accent-color)';
      link.style.fontWeight = '700';
    }
  });
}

// Destaque automático ao rolar a página
window.addEventListener('scroll', () => {
  let secaoAtual = '';

  secoes.forEach(secao => {
    const topoSecao = secao.offsetTop;
    if (window.scrollY >= topoSecao - 200) {
      secaoAtual = secao.getAttribute('id');
    }
  });

  if (secaoAtual) {
    atualizarLinkAtivo(secaoAtual);
  }
});

// Ação ao clicar nos links do menu: Destaca o link e Anima o Título da Seção!
linksNav.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href').replace('#', '');
    atualizarLinkAtivo(targetId);

    // Encontra a seção clicada e ativa a animação do h2 correspondente
    const secaoAlvo = document.getElementById(targetId);
    if (secaoAlvo) {
      const titulo = secaoAlvo.querySelector('h2');
      if (titulo) {
        animarTitulo(titulo);
      }
    }
  });
});

/* ==========================================================================
   4. EFEITO VISUAL NOS CARDS DE PROJETOS
   ========================================================================== */
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
    card.style.borderColor = 'var(--accent-color)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.borderColor = 'var(--border-color)';
  });
});