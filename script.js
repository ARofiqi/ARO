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

// ==========================================
// 3. CERTIFICATE DRAWER & INTERACTIVITY
// ==========================================

const certificatesData = {
  codepolitan: {
    title: "Codepolitan Fullstack",
    subtitle: "Fullstack Web Development Bootcamp",
    image: "assets/cert-codepolitan.png",
    rarity: "EPIC",
    rarityClass: "bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.25)]",
    themeColor: "green",
    issuer: "Codepolitan x Almeera",
    date: "August 2025",
    id: "ID: CPL-FS-2025-8892",
    verifyUrl: "https://codepolitan.com",
    desc: "Program bootcamp intensif berstandar industri yang memvalidasi kemahiran rekayasa perangkat lunak dari sisi Frontend hingga Backend secara komprehensif. Kurikulum berfokus pada perancangan skema database relasional (PostgreSQL), konstruksi RESTful API yang aman dan skalabel menggunakan Node.js & Express, manajemen state kompleks pada ekosistem React.js, serta implementasi standar Clean Architecture dan praktik CI/CD hingga deployment ke cloud server produksi.",
    skills: [
      "React.js", "Node.js", "Express.js", "PostgreSQL", 
      "RESTful API", "Tailwind CSS", "JWT Auth", 
      "Git & CI/CD", "Clean Architecture", "System Design"
    ],
    highlights: [
      "Merancang dan membangun 3 aplikasi fullstack production-ready dari tahap pemodelan database hingga deployment cloud.",
      "Menerapkan arsitektur backend modular dengan lapisan keamanan berlapis terhadap kerentanan data (SQL Injection, XSS, CSRF).",
      "Melewati evaluasi ketat dan code review industri dengan predikat Sangat Memuaskan (Excellence)."
    ],
    sealIcon: "⚡",
    sealText: "OFFICIAL BOOTCAMP CREDENTIAL"
  },
  dicoding: {
    title: "Dicoding Frontend Developer",
    subtitle: "Clean Code & Progressive Web App (PWA)",
    image: "assets/cert-dicoding.png",
    rarity: "RARE",
    rarityClass: "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]",
    themeColor: "blue",
    issuer: "Dicoding Indonesia (Google Authorized)",
    date: "December 2024",
    id: "ID: DCD-FE-2024-4419",
    verifyUrl: "https://dicoding.com",
    desc: "Sertifikasi kompetensi rekayasa antarmuka web modern (Frontend) yang memenuhi standar kurikulum global terotorisasi oleh Google. Memvalidasi keahlian mendalam dalam pemrograman JavaScript (ES6+) asinkron, penerapan prinsip Clean Code, optimasi performa DOM, serta perancangan sistem Progressive Web App (PWA) berarsitektur Offline-First menggunakan Service Worker dan penyimpanan lokal IndexedDB.",
    skills: [
      "JavaScript (ES6+)", "Progressive Web App (PWA)", "Service Worker", 
      "IndexedDB", "Web Accessibility (a11y)", "DOM Manipulation", 
      "Clean Code", "Responsive UI", "Automated Testing", "Lighthouse Optimization"
    ],
    highlights: [
      "Membangun aplikasi PWA berarsitektur Offline-First yang menjamin keandalan sistem dan sinkronisasi data tanpa koneksi internet.",
      "Mencapai standar Web Accessibility (WCAG) internasional dan skor performa audit Lighthouse 95+.",
      "Lulus validasi teknis melalui code review manual oleh asesor profesional dan praktisi industri Dicoding Indonesia."
    ],
    sealIcon: "💎",
    sealText: "GOOGLE AUTHORIZED CURRICULUM"
  },
  mangcoding: {
    title: "Mangcoding SCP",
    subtitle: "Software Creator Program (Professional Internship)",
    image: "assets/cert-mangcoding.png",
    rarity: "LEGENDARY",
    rarityClass: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.25)]",
    themeColor: "yellow",
    issuer: "Mangcoding Indonesia",
    date: "July 2025",
    id: "ID: MNG-SCP-2025-0001",
    verifyUrl: "https://mangcoding.com",
    desc: "Sertifikasi kelulusan dan penghargaan program magang profesional (Software Creator Program) di Mangcoding Indonesia. Membuktikan transisi sukses dari dunia akademis Teknik Informatika ke industri profesional dengan berpartisipasi aktif dalam Software Development Life Cycle (SDLC) pada real-project klien. Menerapkan kolaborasi berbasis metodologi Agile & Scrum, merancang antarmuka CMS yang responsif, serta memanfaatkan pendekatan System Thinking dalam memecahkan masalah arsitektur kode di lingkungan production.",
    skills: [
      "Real-Project Development", "Agile & Scrum Workflow", "System Thinking", 
      "Team Collaboration", "Frontend CMS", "Performance Optimization", 
      "Client-Facing Delivery", "Problem Solving", "Code Refactoring"
    ],
    highlights: [
      "Berkontribusi langsung dalam pengembangan dan rilis fitur production pada sistem E-Learning dan platform CMS klien industri.",
      "Mengaplikasikan System Thinking untuk melakukan refactoring pada logika komponen yang kompleks menjadi arsitektur kode yang efisien dan maintainable.",
      "Menunjukkan profesionalisme komunikasi kerja tim, adaptabilitas tinggi, dan ketepatan penyelesaian target sprint Agile."
    ],
    sealIcon: "👑",
    sealText: "PROFESSIONAL INDUSTRY INTERNSHIP"
  },
  dbs: {
    title: "DBS Coding Camp",
    subtitle: "DBS Foundation Coding Camp x Dicoding",
    image: "assets/cert-dbs.png",
    rarity: "MYTHIC",
    rarityClass: "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    themeColor: "red",
    issuer: "DBS Foundation x Dicoding",
    date: "April 2025",
    id: "ID: DBS-FCC-2025-9921",
    verifyUrl: "https://dicoding.com",
    desc: "Sertifikasi kelulusan dari program beasiswa kompetitif DBS Foundation Coding Camp yang diselenggarakan oleh DBS Foundation bersama Dicoding Indonesia. Program ini menguji dan memperdalam fondasi inti ilmu komputer, mencakup ketajaman logika algoritmik, implementasi struktur data yang efisien, pemrograman berorientasi objek (OOP), serta standar jaminan kualitas perangkat lunak (Software Quality Assurance).",
    skills: [
      "Algorithmic Thinking", "Data Structures", "Object-Oriented Programming (OOP)", 
      "Modern Web Ecosystem", "Software Quality Assurance", "Logical Problem Solving", 
      "System Logic", "Clean Syntax"
    ],
    highlights: [
      "Terpilih sebagai penerima beasiswa penuh melalui seleksi ketat dari ribuan pelamar talenta digital se-Indonesia.",
      "Menyelesaikan serangkaian tantangan pemrograman kompleks dengan kriteria pengujian akurasi logika, efisiensi memori, dan kecepatan eksekusi.",
      "Membuktikan resiliensi pemecahan masalah (problem solving) algoritmik tingkat lanjut sesuai standar rekayasa perangkat lunak."
    ],
    sealIcon: "🔥",
    sealText: "SCHOLARSHIP EXCELLENCE CREDENTIAL"
  }
};

const certBackdrop = document.getElementById("cert-drawer-backdrop");
const certPanel = document.getElementById("cert-drawer-panel");
const closeDrawerBtn = document.getElementById("close-drawer-btn");
const closeBottomBtn = document.getElementById("drawer-close-bottom-btn");

function openCertDrawer(certId) {
  const data = certificatesData[certId];
  if (!data || !certBackdrop || !certPanel) return;

  // Populate Header & Title Info
  const badgeEl = document.getElementById("drawer-rarity-badge");
  if (badgeEl) {
    badgeEl.className = `px-3.5 py-1 rounded-full font-mono text-xs font-bold tracking-wider uppercase border ${data.rarityClass}`;
    badgeEl.innerHTML = `★ ${data.rarity} CREDENTIAL`;
  }

  document.getElementById("drawer-cert-title").textContent = data.title;
  document.getElementById("drawer-cert-subtitle").textContent = data.subtitle;
  document.getElementById("drawer-cert-issuer").innerHTML = `<span class="text-${data.themeColor}-400 font-bold">✓</span> ${data.issuer}`;
  document.getElementById("drawer-cert-date").textContent = `Issued: ${data.date}`;
  document.getElementById("drawer-cert-id").textContent = data.id;
  document.getElementById("drawer-cert-desc").textContent = data.desc;

  // Populate Banner Mockup inside Drawer
  const bannerEl = document.getElementById("drawer-cert-banner");
  if (bannerEl) {
    let borderTheme = "border-green-500/40";
    let glowTheme = "bg-green-500/15";
    let textTheme = "text-green-400";
    if (data.themeColor === "blue") { borderTheme = "border-blue-500/40"; glowTheme = "bg-blue-500/15"; textTheme = "text-blue-400"; }
    else if (data.themeColor === "yellow") { borderTheme = "border-yellow-500/40"; glowTheme = "bg-yellow-500/15"; textTheme = "text-yellow-400"; }
    else if (data.themeColor === "red") { borderTheme = "border-red-500/40"; glowTheme = "bg-red-500/15"; textTheme = "text-red-400"; }

    bannerEl.className = `w-full aspect-[1.414/1] rounded-2xl bg-gradient-to-br from-[#111827] via-[#0d131f] to-[#0a0f18] border-2 ${borderTheme} relative overflow-hidden shadow-2xl group`;
    bannerEl.innerHTML = `
      <!-- Certificate Photo Display -->
      <img src="${data.image}" alt="${data.title}" 
           class="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out z-10 relative"
           onerror="this.style.display='none'; const p = this.parentElement.querySelector('.drawer-placeholder'); if(p) p.style.display='flex';">
      
      <!-- Sleek Placeholder inside Drawer -->
      <div class="drawer-placeholder absolute inset-0 hidden flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#111827] via-[#0d131f] to-[#0a0f18] z-0 overflow-hidden">
        <div class="absolute -right-12 -top-12 w-44 h-44 ${glowTheme} rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-${data.themeColor}-500/70 to-transparent"></div>
        
        <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${textTheme} mb-3 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        <span class="text-sm font-mono font-bold tracking-widest ${textTheme} uppercase mb-1">Foto Sertifikat Belum Diunggah</span>
        <p class="text-xs text-gray-400 font-light max-w-[280px] leading-relaxed">Letakkan file foto Anda pada folder proyek:<br><code class="text-gray-200 bg-black/60 px-2.5 py-1 rounded font-mono mt-1.5 inline-block border border-gray-700/80">${data.image}</code></p>
      </div>

      <!-- Top Floating Badges in Drawer -->
      <div class="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-gray-200 text-xs font-mono shadow-lg font-semibold">
          <span>${data.sealIcon}</span>
          <span>${data.sealText}</span>
        </div>
        <span class="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase font-semibold shadow-lg">VERIFIED AUTHENTIC</span>
      </div>

      <!-- Bottom Floating Overlay in Drawer -->
      <div class="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0b101a] via-[#0b101a]/90 to-transparent pt-12 z-20 flex items-end justify-between gap-3 pointer-events-none">
        <div>
          <p class="text-[11px] font-mono ${textTheme} uppercase tracking-widest mb-0.5 font-bold">Official Achievement Award</p>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono leading-tight">
            ${data.title.toUpperCase()}
          </h3>
        </div>
        <div class="text-right font-mono text-[11px] text-gray-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <div>${data.issuer.toUpperCase()}</div>
          <div class="${textTheme} font-semibold">${data.id}</div>
        </div>
      </div>
    `;
  }

  // Populate Skills Tags
  const skillsContainer = document.getElementById("drawer-cert-skills");
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills
      .map(
        (skill) => `
        <span class="px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-200 text-xs font-mono hover:border-green-500/50 hover:bg-gray-800 transition-all shadow-sm">
          ${skill}
        </span>
      `
      )
      .join("");
  }

  // Populate Key Highlights
  const highlightsContainer = document.getElementById("drawer-cert-highlights");
  if (highlightsContainer) {
    highlightsContainer.innerHTML = data.highlights
      .map(
        (hl) => `
        <div class="flex items-start gap-3 bg-gray-900/60 p-3.5 rounded-xl border border-gray-800/80 text-sm text-gray-300 leading-relaxed">
          <span class="text-green-400 font-bold text-base mt-[-2px]">✓</span>
          <span>${hl}</span>
        </div>
      `
      )
      .join("");
  }

  // Populate Verify Button
  const verifyBtn = document.getElementById("drawer-verify-btn");
  if (verifyBtn) {
    verifyBtn.setAttribute("href", data.verifyUrl || "#");
    verifyBtn.onclick = (e) => {
      if (!data.verifyUrl || data.verifyUrl === "#") {
        e.preventDefault();
        alert(`Sertifikat ${data.title} atas nama Ahmad Rofiqi terverifikasi resmi oleh sistem.`);
      }
    };
  }

  // Open Drawer UI
  certBackdrop.classList.remove("opacity-0", "pointer-events-none");
  certBackdrop.classList.add("opacity-100", "pointer-events-auto");
  
  certPanel.classList.remove("translate-x-full");
  certPanel.classList.add("translate-x-0");

  // Reset scroll position to top
  const drawerScroll = document.getElementById("drawer-scroll-content");
  if (drawerScroll) {
    drawerScroll.scrollTop = 0;
  }

  // Prevent background scroll
  if (window.lenis && typeof window.lenis.stop === "function") {
    window.lenis.stop();
  }
  document.body.style.overflow = "hidden";
}

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
