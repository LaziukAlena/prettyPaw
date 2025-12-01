import { gsap } from "gsap/gsap-core";

export const menuControl = () => {
  const navigationButton = document.querySelector(".navigation__button");
  const navigationList = document.querySelector(".navigation__list");
  const navigationItems = document.querySelector(".navigation__item");

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    navigationList,
    {
      opacity: 0,
      display: "none",
    },
    { opacity: 1, display: "block" }
  );

  navigationItems.forEach((elem, i) => {
    const x = i % 2 ? 500 : -500;
    tl.from(elem, { opacity: 0, x: x, duration: 1 }, "-=1");
  });

  const openMenu = () => {
    navigationButton.classList.add("navigation__button_active");
    navigationList.style.display = "block";
  };

  const closeMenu = () => {
    navigationButton.classList.remove("navigation__button_active");
    navigationList.style.display = "";
  };

  navigationButton.addEventListener("click", () => {
    if (navigationButton.classList.contains("navigation__button_active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
};
