import { gsap } from "gsap";

export const locationHover = () => {
  const locationList = document.querySelector(".location__list");
  const locationItems = document.querySelectorAll(".location__item");

  if (!locationList || !locationItems.length) return;

  const mediaQueryXL = window.matchMedia("(min-width: 1240px)");
  const mediaQueryLG = window.matchMedia("(min-width: 1024px)");

  const timelines = [];
  let preloaded = false;

  const preloadImages = () => {
    if (preloaded) return;
    preloaded = true;

    for (const item of locationItems) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = item.dataset.image;
      document.head.append(link);
    }
  };

  for (const item of locationItems) {
    const content = item.querySelector(".location__content");
    const title = item.querySelector(".location__title");
    const description = item.querySelector(".location__description");

    const tl = gsap.timeline({ paused: true });
    timelines.push({ tl, content, title, description });

    tl.to(content, { opacity: 0, duration: 0.5 })
      .to(content, {
        transform: "none",
        left: 0,
        bottom: 0,
        top: "auto",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        duration: 0,
      })
      .to(title, {
        whiteSpace: "unset",
        hyphens: "manual",
        color: "#ffaa05",
        duration: 0,
        marginBottom: () => (mediaQueryXL.matches ? "40px" : "24px"),
      })
      .to(description, { display: "block", duration: 0 })
      .to(content, { opacity: 1, duration: 0.5 });

    item.addEventListener("mouseenter", () => {
      if (!mediaQueryLG.matches) return;
      tl.play();
      gsap.to(locationList, {
        "--background-image": `url('${item.dataset.image}')`,
        "--opacity": 1,
        duration: 1,
      });
    });

    item.addEventListener("mouseleave", () => {
      if (!mediaQueryLG.matches) return;
      tl.reverse();
      gsap.to(locationList, { "--opacity": 0, duration: 1 });
    });
  }

  if (mediaQueryLG.matches) preloadImages();

  mediaQueryLG.addEventListener("change", (e) => {
    if (e.matches) {
      preloadImages();
      return;
    }

    for (const { tl, content, title, description } of timelines) {
      tl.pause(0); // сбрасываем и состояние таймлайна, и инлайн-стили
      gsap.set([content, title, description], { clearProps: "all" });
    }
  });
};
