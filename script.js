// ==========================================
// AHMAD ROFIQI PORTFOLIO - MAIN SCRIPT
// ==========================================

// 1. Header Hide on Scroll Down / Show on Scroll Up
let lastScroll = 0;
const header = document.getElementById("header");

if (header) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScroll && currentScroll > 80) {
      header.style.transform = "translate(0, -150%)";
    } else {
      header.style.transform = "translate(0, 0)";
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
}

// 2. Navigation Smooth Scrolling & Menu Handling
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu") || document.getElementById("nav-links");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
    if (!navMenu.classList.contains("hidden")) {
      navMenu.classList.add("flex", "flex-col", "gap-4");
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#") && targetId.length > 1) {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (window.lenis) {
          window.lenis.scrollTo(targetId);
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (navMenu && !navMenu.classList.contains("hidden")) {
          navMenu.classList.add("hidden");
        }
      }
    }
  });
});

// Highlight boxes click handler
document.querySelectorAll(".highlight").forEach((element) => {
  element.addEventListener("click", function () {
    const link = this.getAttribute("data-link");
    if (link) window.location.href = link;
  });
});

const certBackdrop = document.getElementById("cert-drawer-backdrop");
const certPanel = document.getElementById("cert-drawer-panel");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const closeBottomBtn = document.getElementById("drawer-close-bottom-btn");


function closeCertDrawer() {
  if (!certBackdrop || !certPanel) return;

  certBackdrop.classList.add("opacity-0", "pointer-events-none");
  certBackdrop.classList.remove("opacity-100", "pointer-events-auto");

  certPanel.classList.add("translate-x-full");
  certPanel.classList.remove("translate-x-0");

  // Restore background scroll
  if (window.lenis && typeof window.lenis.start === "function") {
    window.lenis.start();
  }
  document.body.style.overflow = "";
}

// Attach Event Listeners to Certificate Cards
document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-card");
  certCards.forEach((card) => {
    card.addEventListener("click", () => {
      const certId = card.getAttribute("data-cert-id");
      if (certId && certificatesData[certId]) {
        openCertDrawer(certId);
      }
    });
  });

  if (certBackdrop) certBackdrop.addEventListener("click", closeCertDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeCertDrawer);
  if (closeBottomBtn) closeBottomBtn.addEventListener("click", closeCertDrawer);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && certPanel && !certPanel.classList.contains("translate-x-full")) {
      closeCertDrawer();
    }
  });
});

// ==========================================
// 4. IMAGE LIGHTBOX
// ==========================================

const lightbox     = document.getElementById("img-lightbox");
const lightboxPanel = document.getElementById("lightbox-panel");
const lightboxImg  = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxDownload = document.getElementById("lightbox-download");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;

  // Set content
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  if (lightboxCaption) lightboxCaption.textContent = alt || "";
  if (lightboxDownload) lightboxDownload.href = src;

  // Show modal
  lightbox.classList.remove("opacity-0", "pointer-events-none");
  lightbox.classList.add("opacity-100", "pointer-events-auto");

  // Animate panel in
  if (lightboxPanel) {
    lightboxPanel.classList.remove("scale-90");
    lightboxPanel.classList.add("scale-100");
  }

  // Pause background scroll
  if (window.lenis && typeof window.lenis.stop === "function") window.lenis.stop();
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;

  // Animate panel out
  if (lightboxPanel) {
    lightboxPanel.classList.remove("scale-100");
    lightboxPanel.classList.add("scale-90");
  }

  lightbox.classList.add("opacity-0", "pointer-events-none");
  lightbox.classList.remove("opacity-100", "pointer-events-auto");

  // Restore background scroll (only if drawer is also closed)
  const drawerOpen = certPanel && !certPanel.classList.contains("translate-x-full");
  if (!drawerOpen) {
    if (window.lenis && typeof window.lenis.start === "function") window.lenis.start();
    document.body.style.overflow = "";
  }
}

// Close lightbox on Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.classList.contains("pointer-events-none")) {
    closeLightbox();
  }
});

// ==========================================
// 5. DRAG AND DROP BOARD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("tech-board");
  const draggables = document.querySelectorAll(".draggable-card");
  const gridSize = 40;

  draggables.forEach(card => {
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    card.addEventListener('pointerdown', (e) => {
      // Ignore right clicks or if clicking inside a button
      if (e.button !== 0) return;
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      
      // Get initial computed style top/left
      const style = window.getComputedStyle(card);
      initialLeft = parseInt(style.left, 10) || 0;
      initialTop = parseInt(style.top, 10) || 0;
      
      card.style.zIndex = 50;
      card.style.cursor = 'grabbing';
      card.setPointerCapture(e.pointerId);
      
      // Remove transition so it drags smoothly
      card.style.transition = 'none';
    });

    card.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;
      
      // Snap to grid
      newLeft = Math.round(newLeft / gridSize) * gridSize;
      newTop = Math.round(newTop / gridSize) * gridSize;
      
      // Boundary restrictions
      const rect = card.getBoundingClientRect();
      const boardRect = board.getBoundingClientRect();
      
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + rect.width > boardRect.width) newLeft = Math.floor((boardRect.width - rect.width) / gridSize) * gridSize;
      if (newTop + rect.height > boardRect.height) newTop = Math.floor((boardRect.height - rect.height) / gridSize) * gridSize;

      card.style.left = `${newLeft}px`;
      card.style.top = `${newTop}px`;
    });

    card.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      card.style.zIndex = 10;
      card.style.cursor = 'grab';
      card.releasePointerCapture(e.pointerId);
      card.style.transition = 'box-shadow 0.3s ease'; // Restore shadow transition
    });
  });
});

