import { gsap } from "gsap";

export const menuControl = () => {
  const navigationButton = document.querySelector(".navigation__button");
  const navigationList = document.querySelector(".navigation__list");
  const navigationItems = document.querySelectorAll(".navigation__item");

  if (!navigationButton || !navigationList) return;

  const offsetX = (i) => (i % 2 ? 500 : -500);
  const ACTIVE = "navigation__button_active";

  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    navigationList,
    { opacity: 0, display: "none" },
    { opacity: 1, display: "block" },
  );

  navigationItems.forEach((elem, i) => {
    tl.from(elem, { opacity: 0, x: offsetX(i), duration: 1 }, "-=1");
  });

  const openMenu = () => {
    navigationButton.classList.add(ACTIVE);
    tl.play();
  };

  const closeMenu = () => {
    tl.reverse();
  };

  tl.eventCallback("onReverseComplete", () => {
    navigationButton.classList.remove(ACTIVE);
  });

  navigationButton.addEventListener("click", () => {
    if (navigationButton.classList.contains(ACTIVE)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закрываем меню при переходе по ссылке (на page.html страница не перезагружается)
  navigationList.addEventListener("click", (e) => {
    if (
      e.target.closest(".navigation__link") &&
      navigationButton.classList.contains(ACTIVE)
    ) {
      closeMenu();
    }
  });

  const checkScreenSize = (e) => {
    if (e.matches) {
      tl.pause(0); // сначала сброс таймлайна, иначе он перезапишет стили ниже
      navigationButton.classList.remove(ACTIVE);
      gsap.set(navigationList, { opacity: 1, display: "flex" });
      gsap.set(navigationItems, { opacity: 1, x: 0 });
    } else {
      gsap.set(navigationList, { opacity: 0, display: "none" });
      navigationItems.forEach((elem, i) => {
        gsap.set(elem, { opacity: 0, x: offsetX(i) });
      });

      if (navigationButton.classList.contains(ACTIVE)) {
        tl.restart();
      }
    }
  };

  const mediaQuery = window.matchMedia("(min-width: 1240px)");

  mediaQuery.addEventListener("change", checkScreenSize);
  checkScreenSize(mediaQuery);
};
