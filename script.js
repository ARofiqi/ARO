// ==========================================
// AHMAD ROFIQI PORTFOLIO - MAIN SCRIPT
// ==========================================

// 1. Header Hide on Scroll Down / Show on Scroll Up & Active Section Spy
let lastScroll = 0;
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const iconOpen = document.getElementById("hamburger-icon-open");
const iconClose = document.getElementById("hamburger-icon-close");

function setMobileMenuOpen(isOpen) {
  if (!hamburger || !navMenu) return;
  hamburger.setAttribute("aria-expanded", String(isOpen));
  navMenu.classList.toggle("hidden", !isOpen);
  if (iconOpen && iconClose) {
    iconOpen.classList.toggle("hidden", isOpen);
    iconClose.classList.toggle("hidden", !isOpen);
  }
}

if (hamburger && navMenu) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    setMobileMenuOpen(!isExpanded);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    if (isExpanded && !header.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  });
}

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const isMenuOpen = hamburger && hamburger.getAttribute("aria-expanded") === "true";

      if (!isMenuOpen && currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = "translate(0, -150%)";
      } else {
        header.style.transform = "translate(0, 0)";
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    },
    { passive: true }
  );
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        if (window.lenis) {
          window.lenis.scrollTo(targetId, { offset: -20 });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileMenuOpen(false);
      }
    }
  });
});

// Active Navigation State via IntersectionObserver
const navLinks = document.querySelectorAll(".nav-link");
const observedSections = document.querySelectorAll("section[id]");

if (navLinks.length > 0 && observedSections.length > 0 && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === activeId;
            link.classList.toggle("active", isMatch);
            if (isMatch) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );

  observedSections.forEach((sec) => sectionObserver.observe(sec));
}

// ==========================================
// 2. CERTIFICATE DRAWER DATA & LOGIC
// ==========================================

const certificatesData = {
  dicoding: {
    rarity: "★ VERIFIED CREDENTIAL",
    subtitle: "Studi Independen Bersertifikat • DBS Foundation × Dicoding",
    title: "Coding Camp powered by DBS Foundation",
    issuer: "Dicoding Indonesia × DBS Foundation",
    date: "Issued: 2025",
    id: "ID: DBS-DICODING-2025",
    image: "/assets/sertifikat/dbs.webp",
    verifyUrl: "https://www.dicoding.com",
    desc: "Program beasiswa dan Studi Independen intensif hasil kolaborasi DBS Foundation bersama Dicoding Indonesia. Kurikulum berfokus pada rekayasa perangkat lunak modern, pengembangan antarmuka web yang responsif dan aksesibel, pengelolaan state serta integrasi API, hingga penerapan clean code berstandar industri.",
    skills: [
      "HTML5 & Semantic Web",
      "Modern CSS & Responsive Layout",
      "JavaScript (ES6+)",
      "Front-End Web Architecture",
      "RESTful API Integration",
      "Web Accessibility (WCAG)",
      "Git & Collaborative Workflow"
    ],
    highlights: [
      "Menyelesaikan seluruh modul pembelajaran teknis dan evaluasi proyek akhir sesuai standar industri Dicoding.",
      "Merancang dan membangun aplikasi web interaktif dengan performa optimal serta tata letak responsif lintas perangkat.",
      "Menerapkan prinsip System Thinking, struktur kode modular, dan kolaborasi tim selama program berlangsung."
    ]
  }
};

const certBackdrop = document.getElementById("cert-drawer-backdrop");
const certPanel = document.getElementById("cert-drawer-panel");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const closeBottomBtn = document.getElementById("drawer-close-bottom-btn");
let lastFocusedElement = null;

function openCertDrawer(certId) {
  const data = certificatesData[certId];
  if (!data || !certBackdrop || !certPanel) return;

  lastFocusedElement = document.activeElement;

  const badgeEl = document.getElementById("drawer-rarity-badge");
  const subtitleEl = document.getElementById("drawer-cert-subtitle");
  const titleEl = document.getElementById("drawer-cert-title");
  const issuerEl = document.getElementById("drawer-cert-issuer");
  const dateEl = document.getElementById("drawer-cert-date");
  const idEl = document.getElementById("drawer-cert-id");
  const descEl = document.getElementById("drawer-cert-desc");
  const skillsEl = document.getElementById("drawer-cert-skills");
  const highlightsEl = document.getElementById("drawer-cert-highlights");
  const bannerEl = document.getElementById("drawer-cert-banner");
  const verifyBtn = document.getElementById("drawer-verify-btn");

  if (badgeEl) badgeEl.textContent = data.rarity;
  if (subtitleEl) subtitleEl.textContent = data.subtitle;
  if (titleEl) titleEl.textContent = data.title;
  if (issuerEl) {
    issuerEl.innerHTML = `<span class="text-green-400 font-bold">✓</span> ${data.issuer}`;
  }
  if (dateEl) dateEl.textContent = data.date;
  if (idEl) idEl.textContent = data.id;
  if (descEl) descEl.textContent = data.desc;

  if (bannerEl) {
    bannerEl.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover rounded-xl cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]" id="drawer-banner-img" />
      <button type="button" id="drawer-zoom-btn" class="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 backdrop-blur-md border border-white/15 transition-all cursor-pointer">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
        Perbesar Gambar
      </button>
    `;
    bannerEl.onclick = () => openLightbox(data.image, `${data.title} — ${data.issuer}`);
  }

  if (skillsEl) {
    skillsEl.innerHTML = data.skills
      .map(
        (skill) =>
          `<span class="px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700/80 text-gray-200 text-xs font-medium">${skill}</span>`
      )
      .join("");
  }

  if (highlightsEl) {
    highlightsEl.innerHTML = data.highlights
      .map(
        (item) => `
        <div class="flex items-start gap-3 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800/60">
          <span class="w-5 h-5 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
          <p class="text-xs md:text-sm text-gray-300 leading-relaxed">${item}</p>
        </div>
      `
      )
      .join("");
  }

  if (verifyBtn) {
    verifyBtn.href = data.verifyUrl || "#";
  }

  certBackdrop.classList.remove("opacity-0", "pointer-events-none");
  certBackdrop.classList.add("opacity-100", "pointer-events-auto");

  certPanel.classList.remove("translate-x-full");
  certPanel.classList.add("translate-x-0");
  certPanel.setAttribute("aria-hidden", "false");

  if (window.lenis && typeof window.lenis.stop === "function") {
    window.lenis.stop();
  }
  document.body.style.overflow = "hidden";

  if (closeDrawerBtn) {
    setTimeout(() => closeDrawerBtn.focus(), 100);
  }
}

function closeCertDrawer() {
  if (!certBackdrop || !certPanel) return;

  certBackdrop.classList.add("opacity-0", "pointer-events-none");
  certBackdrop.classList.remove("opacity-100", "pointer-events-auto");

  certPanel.classList.add("translate-x-full");
  certPanel.classList.remove("translate-x-0");
  certPanel.setAttribute("aria-hidden", "true");

  if (window.lenis && typeof window.lenis.start === "function") {
    window.lenis.start();
  }
  document.body.style.overflow = "";

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

// ==========================================
// 3. IMAGE LIGHTBOX (GALLERY & CERTIFICATES)
// ==========================================

const lightbox = document.getElementById("img-lightbox");
const lightboxPanel = document.getElementById("lightbox-panel");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxDownload = document.getElementById("lightbox-download");
let lightboxTriggerElement = null;

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;

  lightboxTriggerElement = document.activeElement;

  lightboxImg.src = src;
  lightboxImg.alt = alt || "Pratinjau gambar";
  if (lightboxCaption) lightboxCaption.textContent = alt || "";
  if (lightboxDownload) lightboxDownload.href = src;

  lightbox.classList.remove("opacity-0", "pointer-events-none");
  lightbox.classList.add("opacity-100", "pointer-events-auto");

  if (lightboxPanel) {
    lightboxPanel.classList.remove("scale-90");
    lightboxPanel.classList.add("scale-100");
  }

  if (window.lenis && typeof window.lenis.stop === "function") window.lenis.stop();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;

  if (lightboxPanel) {
    lightboxPanel.classList.remove("scale-100");
    lightboxPanel.classList.add("scale-90");
  }

  lightbox.classList.add("opacity-0", "pointer-events-none");
  lightbox.classList.remove("opacity-100", "pointer-events-auto");

  const drawerOpen = certPanel && !certPanel.classList.contains("translate-x-full");
  if (!drawerOpen) {
    if (window.lenis && typeof window.lenis.start === "function") window.lenis.start();
    document.body.style.overflow = "";
  }

  if (lightboxTriggerElement && typeof lightboxTriggerElement.focus === "function") {
    lightboxTriggerElement.focus();
  }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// ==========================================
// 4. DOM INITIALIZATION (EVENTS & DRAG BOARD)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Certificate Cards
  const certCards = document.querySelectorAll(".cert-card");
  certCards.forEach((card) => {
    const activateCard = () => {
      const certId = card.getAttribute("data-cert-id");
      if (certId && certificatesData[certId]) {
        openCertDrawer(certId);
      }
    };

    card.addEventListener("click", activateCard);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateCard();
      }
    });
  });

  if (certBackdrop) certBackdrop.addEventListener("click", closeCertDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeCertDrawer);
  if (closeBottomBtn) closeBottomBtn.addEventListener("click", closeCertDrawer);

  // Gallery Lightbox Items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    if (!img) return;

    const triggerGalleryLightbox = () => {
      const src = img.getAttribute("src");
      const caption = item.getAttribute("data-caption") || img.getAttribute("alt") || "Galeri Visual";
      openLightbox(src, caption);
    };

    item.addEventListener("click", triggerGalleryLightbox);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerGalleryLightbox();
      }
    });
  });

  // Global Escape key handler for Lightbox, Drawer, and Mobile Menu
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (lightbox && !lightbox.classList.contains("pointer-events-none")) {
      closeLightbox();
      return;
    }
    if (certPanel && !certPanel.classList.contains("translate-x-full")) {
      closeCertDrawer();
      return;
    }
    if (hamburger && hamburger.getAttribute("aria-expanded") === "true") {
      setMobileMenuOpen(false);
      hamburger.focus();
    }
  });

  // 5. Desktop Drag and Drop Tech Board with Reset Support
  const board = document.getElementById("tech-board");
  const draggables = document.querySelectorAll(".draggable-card");
  const resetBoardBtn = document.getElementById("reset-board-btn");
  const gridSize = 20;

  if (board && draggables.length > 0) {
    draggables.forEach((card) => {
      // Save initial desktop position for reset
      card.dataset.initLeft = card.style.left || "";
      card.dataset.initTop = card.style.top || "";

      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;

      card.addEventListener("pointerdown", (e) => {
        // Only enable dragging on desktop (>= 768px) and primary mouse button
        if (window.innerWidth < 768 || e.button !== 0) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const style = window.getComputedStyle(card);
        initialLeft = parseFloat(style.left) || 0;
        initialTop = parseFloat(style.top) || 0;

        card.style.zIndex = 40;
        card.style.cursor = "grabbing";
        card.style.transition = "none";
        card.setPointerCapture(e.pointerId);
      });

      card.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        const rect = card.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();

        const maxLeft = Math.max(0, boardRect.width - rect.width - 8);
        const maxTop = Math.max(0, boardRect.height - rect.height - 8);

        newLeft = Math.max(8, Math.min(newLeft, maxLeft));
        newTop = Math.max(8, Math.min(newTop, maxTop));

        card.style.left = `${newLeft}px`;
        card.style.top = `${newTop}px`;

        if (resetBoardBtn) {
          resetBoardBtn.classList.remove("hidden");
        }
      });

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        card.style.zIndex = 10;
        card.style.cursor = "grab";
        if (card.hasPointerCapture(e.pointerId)) {
          card.releasePointerCapture(e.pointerId);
        }

        // Gentle snap on drop
        const style = window.getComputedStyle(card);
        const snappedLeft = Math.round((parseFloat(style.left) || 0) / gridSize) * gridSize;
        const snappedTop = Math.round((parseFloat(style.top) || 0) / gridSize) * gridSize;
        card.style.transition = "left 0.2s ease, top 0.2s ease, box-shadow 0.3s ease";
        card.style.left = `${Math.max(16, snappedLeft)}px`;
        card.style.top = `${Math.max(16, snappedTop)}px`;
      };

      card.addEventListener("pointerup", endDrag);
      card.addEventListener("pointercancel", endDrag);
    });

    if (resetBoardBtn) {
      resetBoardBtn.addEventListener("click", () => {
        draggables.forEach((card) => {
          card.style.transition = "left 0.35s cubic-bezier(0.16, 1, 0.3, 1), top 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease";
          card.style.left = card.dataset.initLeft;
          card.style.top = card.dataset.initTop;
        });
        resetBoardBtn.classList.add("hidden");
      });
    }
  }
});
