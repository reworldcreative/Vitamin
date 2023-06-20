import * as functions from "./modules/functions.js";

functions.isWebp();
// functions.changeImages();

$(document).ready(function () {
  $(".burger-button").click(function (event) {
    $(".burger-menu").toggleClass("active");
  });

  $(".burger-menu .close-button").click(function (event) {
    $(".burger-menu").toggleClass("active");
  });
});

// Завантаження стилів після першого відображення сторінки
function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

window.addEventListener("DOMContentLoaded", function () {
  loadCSS("https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css");
  loadCSS(
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
  );

  // var jqueryScript = document.createElement("script");
  // jqueryScript.src = "https://code.jquery.com/jquery-3.7.0.min.js";
  // jqueryScript.integrity =
  //   "sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=";
  // jqueryScript.crossOrigin = "anonymous";
  // document.body.appendChild(jqueryScript);

  var swiperScript = document.createElement("script");
  swiperScript.src =
    "https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js";
  document.body.appendChild(swiperScript);
});
