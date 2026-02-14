const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

burger?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// Lightbox
const dlg = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function openLightbox(src, alt) {
  if (!dlg || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt || "";
  dlg.showModal();
}

document.querySelectorAll("img[data-full]").forEach(img => {
  img.addEventListener("click", () => openLightbox(img.getAttribute("data-full"), img.alt));
});

lbClose?.addEventListener("click", () => dlg.close());
dlg?.addEventListener("click", (e) => {
  const rect = lbImg.getBoundingClientRect();
  const inImage = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inImage) dlg.close();
});

// Contact form: open email client with pre-filled content
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = String(fd.get("name") || "");
  const phone = String(fd.get("phone") || "");
  const from = String(fd.get("email") || "");
  const msg = String(fd.get("message") || "");

  const subject = encodeURIComponent("Réhab 360 – Demande de devis (chemisage UV)");
  const body = encodeURIComponent(
    "Nom/Société: " + name + "\n" +
    "Téléphone: " + phone + "\n" +
    "Email: " + from + "\n\n" +
    "Détails:\n" + msg
  );

  window.location.href = "mailto:yaston.bourane@icloud.com?subject=" + subject + "&body=" + body;
  if (statusEl) statusEl.textContent = "Ouverture de votre messagerie…";
});
