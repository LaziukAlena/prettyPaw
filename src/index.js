import "./index.html";
import "normalize.css";
import "swiper/css/bundle";
import "./index.scss";

const videoBG = document.querySelector(".video-bg");

videoBG.innerHTML = ` 
<source src="video/video.webm" type="video/webm" />
<source src="video/video.mp4" type="video/mp4" />`;
