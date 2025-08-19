// Arquivo: /assets/js/main.js
/* // COMO EDITAR:
   - Toggle do menu, scroll suave e banner LGPD abaixo.
   - Para cursos e módulos, edite o objeto COURSE_DATA.
   - Validação do formulário em handleContactForm().
*/

// Dados de cursos (exemplo: 2 cursos, 3 aulas cada)
const COURSE_DATA = {
  fundamentos: {
    title: "Fundamentos de Programação",
    description: "Lógica, variáveis, condicionais e laços com exemplos práticos.",
    materials: [
      { label: "Apostila (PDF)", url: "#" },
      { label: "Exercícios (Drive)", url: "#" }
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // substitua pelo ID real
    modules: [
      {
        title: "Introdução",
        lessons: [
          { title: "O que é programação?", url: "https://www.youtube.com/embed/ysz5S6PUM-U" },
          { title: "Ambiente e ferramentas", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
          { title: "Primeiro código", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      },
      {
        title: "Conceitos básicos",
        lessons: [
          { title: "Variáveis e tipos", url: "https://www.youtube.com/embed/ScMzIvxBSi4" },
          { title: "Condicionais", url: "https://www.youtube.com/embed/ysz5S6PUM-U" },
          { title: "Repetição (loops)", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" }
        ]
      },
      {
        title: "Prática",
        lessons: [
          { title: "Funções e organização", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Depuração", url: "https://www.youtube.com/embed/ScMzIvxBSi4" },
          { title: "Projeto final", url: "https://www.youtube.com/embed/ysz5S6PUM-U" }
        ]
      }
    ]
  },
  dados: {
    title: "Introdução a Dados",
    description: "Coleta, limpeza, análise e visualização de dados.",
    materials: [
      { label: "Checklist de dados (PDF)", url: "#" }
    ],
    video: "https://www.youtube.com/embed/ScMzIvxBSi4",
    modules: [
      {
        title: "Fundamentos",
        lessons: [
          { title: "O que é dado?", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
          { title: "Tipos de dados", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "Qualidade de dados", url: "https://www.youtube.com/embed/ScMzIvxBSi4" }
        ]
      },
      {
        title: "Processamento",
        lessons: [
          { title: "Coleta e limpeza", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
          { title: "Transformação", url: "https://www.youtube.com/embed/ysz5S6PUM-U" },
          { title: "Visualização", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
      },
      {
        title: "Aplicações",
        lessons: [
          { title: "Estudos de caso", url: "https://www.youtube.com/embed/ScMzIvxBSi4" },
          { title: "Ferramentas populares", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
          { title: "Próximos passos", url: "https://www.youtube.com/embed/ysz5S6PUM-U" }
        ]
      }
    ]
  }
};

// Util: pegar parâmetro da URL
function getParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Toggle menu mobile
function setupMobileMenu(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Smooth scroll para âncoras internas
function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.setAttribute('tabindex','-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });
}

// Banner LGPD simples
function setupCookieBanner(){
  const banner = document.querySelector('.cookie-banner');
  const btn = document.querySelector('[data-accept-cookies]');
  if(!banner || !btn) return;
  const KEY = 'lgpd_accept_22julho';
  const accepted = localStorage.getItem(KEY);
  if(!accepted){ banner.style.display = 'block'; }
  btn.addEventListener('click', () => {
    localStorage.setItem(KEY,'1');
    banner.style.display = 'none';
  });
}

// Curso: montar página a partir do ?curso=slug
function setupCoursePage(){
  const courseSlug = getParam('curso');
  if(!courseSlug) return;
  const data = COURSE_DATA[courseSlug];
  const titleEl = document.getElementById('course-title');
  const descEl = document.getElementById('course-desc');
  const videoWrap = document.getElementById('video-wrapper');
  const modulesEl = document.getElementById('modules');
  const materialsEl = document.getElementById('materials-list');

  if(!data){
    if(titleEl) titleEl.textContent = 'Curso não encontrado';
    return;
  }
  if(titleEl) titleEl.textContent = data.title;
  if(descEl) descEl.textContent = data.description;

  if(videoWrap){
    videoWrap.innerHTML = `<iframe src="${data.video}" title="Player do curso" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  }

  // Módulos -> Accordion
  if(modulesEl){
    modulesEl.innerHTML = '';
    data.modules.forEach((mod, i) => {
      const item = document.createElement('div');
      item.className = 'ac-item';
      // ID únicos para aria-controls
      const hid = `ac-h-${i}`;
      const pid = `ac-p-${i}`;
      item.innerHTML = `
        <button class="ac-header" id="${hid}" aria-controls="${pid}" aria-expanded="false">
          <span>${mod.title}</span>
          <span aria-hidden="true">+</span>
        </button>
        <div id="${pid}" class="ac-panel" role="region" aria-labelledby="${hid}"></div>
      `;
      const panel = item.querySelector('.ac-panel');
      // lessons
      mod.lessons.forEach(lesson => {
        const row = document.createElement('div');
        row.className = 'lesson';
        row.innerHTML = `<span>${lesson.title}</span><a class="btn btn-outline" href="${lesson.url}" target="_blank" rel="noopener">Assistir</a>`;
        panel.appendChild(row);
      });
      modulesEl.appendChild(item);
    });

    // Listeners do accordion
    modulesEl.querySelectorAll('.ac-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const isOpen = panel.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      btn.addEventListener('keydown', (e) => {
        // abrir com Enter ou Espaço
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          btn.click();
        }
      });
    });
  }

  // Materiais
  if(materialsEl){
    materialsEl.innerHTML = '';
    data.materials.forEach(m => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${m.url}" target="_blank" rel="noopener">${m.label}</a>`;
      materialsEl.appendChild(li);
    });
  }
}

// Validação simples do formulário + envio simulado
function handleContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const status = document.getElementById('form-status');
  function setError(input, msg){
    input.setAttribute('aria-invalid','true');
    input.parentElement.querySelector('.error').textContent = msg;
  }
  function clearError(input){
    input.removeAttribute('aria-invalid');
    input.parentElement.querySelector('.error').textContent = '';
  }
  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Remova esta linha se usar formsubmit.co
    status.textContent = '';

    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const assunto = form.querySelector('#assunto');
    const mensagem = form.querySelector('#mensagem');
    let ok = true;

    // validações
    if(!nome.value.trim()){ setError(nome,'Informe seu nome.'); ok=false } else clearError(nome);
    if(!email.value.trim() || !isEmail(email.value)){ setError(email,'E-mail inválido.'); ok=false } else clearError(email);
    if(!assunto.value.trim()){ setError(assunto,'Informe o assunto.'); ok=false } else clearError(assunto);
    if(!mensagem.value.trim()){ setError(mensagem,'Digite sua mensagem.'); ok=false } else clearError(mensagem);

    if(ok){
      // Simula envio
      setTimeout(() => {
        status.textContent = 'Mensagem enviada com sucesso!';
        form.reset();
      }, 400);
    }
  });
}

// Util: ano atual no footer
function setCurrentYear(){
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

// Destacar link ativo (fallback caso não tenha classe nos HTMLs)
function highlightActiveNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const target = a.getAttribute('href');
    if(target === here) a.classList.add('active');
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupSmoothScroll();
  setupCookieBanner();
  setupCoursePage();
  handleContactForm();
  setCurrentYear();
  highlightActiveNav();
});

        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if(panel){
          panel.classList.toggle('open');
        }
      });
      // Acessível via teclado (Enter/Espaço já funcionam em <button>)
    });
  }

  // Materiais
  if(materialsEl){
    materialsEl.innerHTML = '';
    data.materials.forEach(m => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${m.url}" target="_blank" rel="noopener">${m.label}</a>`;
      materialsEl.appendChild(li);
    });
  }
}

// Validação simples do formulário + envio simulado
function handleContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const status = document.getElementById('form-status');

  function validateEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Remova esta linha para usar formsubmit.co
    let ok = true;
    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const assunto = form.querySelector('#assunto');
    const mensagem = form.querySelector('#mensagem');

    // Limpa erros
    form.querySelectorAll('.error').forEach(el => el.textContent = '');

    if(!nome.value.trim()){ ok = false; nome.nextElementSibling.textContent = 'Informe seu nome.'; }
    if(!validateEmail(email.value)){ ok = false; email.nextElementSibling.textContent = 'E-mail inválido.'; }
    if(!assunto.value.trim()){ ok = false; assunto.nextElementSibling.textContent = 'Informe o assunto.'; }
    if(!mensagem.value.trim()){ ok = false; mensagem.nextElementSibling.textContent = 'Escreva sua mensagem.'; }

    if(!ok){
      status.textContent = 'Verifique os campos destacados.';
      return;
    }

    // Simula envio
    status.textContent = 'Enviando...';
    setTimeout(() => {
      status.textContent = 'Mensagem enviada com sucesso!';
      form.reset();
    }, 600);
  });
}

// Ano corrente no footer
function setCurrentYear(){
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

// Ativar link atual no menu (fallback simples quando falta classe .active)
function highlightActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path){ a.classList.add('active'); }
  });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupSmoothScroll();
  setupCookieBanner();
  setupCoursePage();
  handleContactForm();
  setCurrentYear();
  highlightActiveNav();
});
