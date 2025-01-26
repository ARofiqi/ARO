let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const highlights = document.querySelectorAll(".highlight");

highlights.forEach((element) => {
  element.addEventListener("click", function () {
    const link = this.getAttribute("data-link");
    window.location.href = link;
  });
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("flex-col");
  navLinks.classList.toggle("gap-4");
});

// // Pilih parent container
// const medsos = document.getElementById("medsos");
// const socialLinks = document.querySelectorAll(".social-link");

// socialLinks.forEach((link) => {
//   link.addEventListener("mouseenter", () => {
//     const bgClass = link.getAttribute("data-bg");
//     medsos.className = `py-20 text-center ${bgClass} transition duration-300`;
//   });

//   link.addEventListener("mouseleave", () => {
//     medsos.className = "py-20 text-center bg-gray-100 transition duration-300";
//   });
// });
