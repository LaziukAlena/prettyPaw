import "./index.html";
import "normalize.css";
import "swiper/css/bundle";
import "./index.scss";
import { slidersInit } from "./modules/sliders";
import { videoBackgroundInit } from "./modules/videoBackground";
import { menuControl } from "./modules/menuControl";

videoBackgroundInit();
menuControl();

slidersInit(".about__slider", {
  pagination: {
    el: ".about__slider-pagination",
  },
});

slidersInit(".career__slider", {
  pagination: {
    el: ".career__slider-pagination",
  },
  breakpoints: {
    768: {
      slidesPerView: "auto",
      spaceBetween: 20,
      pagination: false,
    },

    1024: {
      slidesPerView: "auto",
      spaceBetween: 26,
      pagination: false,
    },

    1240: {
      slidesPerView: "auto",
      spaceBetween: 30,
      pagination: false,
    },
  },
});
