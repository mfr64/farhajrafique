// ---------- data: real projects from resume ----------
const PROJECTS = [
 {
    domain: "alsheikhfurniture.com",
    name: "AlSheikh Furniture",
    desc: "Custom Furniture service — WooCommerce store with a custom quote & pricing flow.",
    url: "https://alsheikhfurniture.com/"
  },
  {
    domain: "dstdigitizing.com",
    name: "DST Digitizing",
    desc: "Embroidery digitizing service — WooCommerce store with a custom quote & pricing flow.",
    url: "https://dstdigitizing.com"
  },
  {
    domain: "dstdigitizing.net",
    name: "DST Digitizing (.net)",
    desc: "Sister site for the same embroidery digitizing business, with its own quote page.",
    url: "https://dstdigitizing.net"
  },
  {
    domain: "proficientdigitizing.com",
    name: "Proficient Digitizing",
    desc: "Digitizing services site built and customized on WordPress.",
    url: "https://proficientdigitizing.com"
  },
  {
    domain: "pinkslipexpress.com.au",
    name: "Pink Slip Express",
    desc: "Vehicle inspection / pink slip service site for the Australian market.",
    url: "https://pinkslipexpress.com.au"
  },
  {
    domain: "guelphcarpetcleaning.com",
    name: "Guelph Carpet Cleaning",
    desc: "Local service business site built for local search visibility in Guelph, Canada.",
    url: "https://guelphcarpetcleaning.com"
  },
  {
    domain: "kingcars.com.au",
    name: "King Cars",
    desc: "Automotive dealership site for the Australian market.",
    url: "https://kingcars.com.au"
  },
  {
    domain: "ftautohaus.com.au",
    name: "FT Autohaus",
    desc: "Auto dealership / workshop site with service and inventory sections.",
    url: "https://ftautohaus.com.au"
  }
];

// ---------- render work grid ----------
function renderProjects(){
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <div class="work-card reveal">
      <span class="work-card__domain">${p.domain}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a class="work-card__link" href="${p.url}" target="_blank" rel="noopener noreferrer">
        Visit site
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  `).join('');
  observeReveals();
}

// ---------- nav toggle ----------
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ---------- scroll reveal ----------
let revealObserver;
function observeReveals(){
  if (!revealObserver){
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
}

// ---------- contact form -> mailto ----------
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();

  const subject = encodeURIComponent(`Project inquiry from ${name || 'website visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
  window.location.href = `mailto:farhajrafique26@gmail.com?subject=${subject}&body=${body}`;

  showToast('Opening your email app…');
});

// ---------- toast ----------
const toast = document.getElementById('toast');
let toastTimer;
function showToast(text){
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

// ---------- footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- init ----------
renderProjects();
observeReveals();
