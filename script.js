const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const form = document.querySelector(".contact__form");
const feedback = document.querySelector(".form__feedback");

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    const invalidField = requiredFields.find((field) => !field.value.trim());

    if (invalidField) {
      feedback.textContent = "Por favor, preencha todos os campos obrigatórios.";
      invalidField.focus();
      return;
    }

    feedback.textContent =
      "Obrigado! Recebemos seu interesse e retornaremos em breve.";
    form.reset();
  });
}
