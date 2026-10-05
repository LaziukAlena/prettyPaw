const ACTIVE = {
  navigation__link: "navigation__link_active",
  "page-nav__link": "page-nav__link_active",
};

const showSection = () => {
  const sections = document.querySelectorAll(".page");
  const links = document.querySelectorAll(".navigation__link, .page-nav__link");

  // На page.html без хэша показываем первую секцию, на index.html хэш пустой
  const hash = window.location.hash.slice(1) || sections[0]?.id || "";

  for (const section of sections) {
    section.style.display = section.id === hash ? "block" : "none";
  }

  for (const link of links) {
    const href = link.getAttribute("href") || "";
    const hashIndex = href.indexOf("#");
    const linkHash = hashIndex !== -1 ? href.slice(hashIndex + 1) : "";

    const baseClass = link.classList.contains("page-nav__link")
      ? "page-nav__link"
      : "navigation__link";

    link.classList.toggle(ACTIVE[baseClass], linkHash === hash);
  }
};

export const pageControlInit = () => {
  showSection(); // сразу, не ждём window.load
  window.addEventListener("hashchange", showSection);
};
