// =========================
// HAMBURGER MENU (ONLY)
// =========================
(function () {
  const menuBtn   = document.querySelector("#menuBtn, .menu-btn");
const menuPanel = document.querySelector("#menuPanel, .menu-panel");
const menuClose = document.querySelector("#menuClose, .menu-close");
const backdrop  = document.querySelector("#menuBackdrop, .menu-backdrop");


  if (!menuBtn || !menuPanel || !menuBackdrop || !menuClose) return;

  function openMenu() {
  if (!menuPanel || !backdrop) return;

  backdrop.hidden = false;
  menuPanel.classList.add("open");
  menuPanel.setAttribute("aria-hidden", "false");
  menuBtn?.setAttribute("aria-expanded", "true");

  requestAnimationFrame(() => backdrop.classList.add("open"));
}


  function closeMenu() {
  if (!menuPanel || !backdrop) return;

  menuPanel.classList.remove("open");
  menuPanel.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");

  backdrop.classList.remove("open");
  setTimeout(() => { backdrop.hidden = true; }, 220);
}


  function toggleMenu() {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  }

  // Click botón
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Click X
  menuClose.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  // Click fuera (backdrop)
  menuBackdrop.addEventListener("click", closeMenu);

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Cerrar al elegir un link del menú
  menuPanel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Asegura estado inicial cerrado
  closeMenu();
})();
// ===============================
// Projects data (11 projects)
// ===============================
const PROJECTS = [
  {
    id: "p01",
    title: "Project 01 — Kitchen Renovation",
    desc: "Clean finishes, modern layout, detail-driven execution.",
    cover: "assets/img/projects/p01/01.jpg",
    images: [
      "assets/img/projects/p01/01.jpg",
      "assets/img/projects/p01/02.jpg",
      "assets/img/projects/p01/03.jpg",
    ],
  },
  {
    id: "p02",
    title: "Project 02 — Basement Remodel",
    desc: "Comfort upgrade with smart planning and durable materials.",
    cover: "assets/img/projects/p02/01.jpg",
    images: [
      "assets/img/projects/p02/01.jpg",
      "assets/img/projects/p02/02.jpg",
    ],
  },

  // DUPLICA este bloque hasta p11 y cambia rutas/títulos/descripción
  // ...
];

// Helper: querystring
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ===============================
// Render grid in projects.html
// ===============================
window.renderProjectsGrid = function renderProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p) => {
    return `
      <a class="project-card" href="project.html?id=${p.id}">
        <div class="project-card__img">
          <img src="${p.cover}" alt="${p.title}">
        </div>
        <div class="project-card__body">
          <div class="project-card__title">${p.title}</div>
          <div class="project-card__sub">${p.desc}</div>
          <div class="project-card__cta">VIEW GALLERY ↗</div>
        </div>
      </a>
    `;
  }).join("");
};

// ===============================
// Render detail in project.html
// ===============================
window.renderProjectDetail = function renderProjectDetail() {
  const titleEl = document.getElementById("projectTitle");
  const descEl = document.getElementById("projectDesc");
  const galleryEl = document.getElementById("projectGallery");
  if (!titleEl || !descEl || !galleryEl) return;

  const id = getQueryParam("id");
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];

  titleEl.textContent = project.title;
  descEl.textContent = project.desc;

  galleryEl.innerHTML = project.images.map((src, idx) => {
    return `
      <a class="shot" href="${src}" target="_blank" rel="noopener">
        <img src="${src}" alt="${project.title} photo ${idx + 1}">
      </a>
    `;
  }).join("");
};

