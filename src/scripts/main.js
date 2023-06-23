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
    "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js";

  swiperScript.onload = function () {
    if ($(".ChooseProducts__swiper").length > 0) {
      const ChooseProductsSwiper = new Swiper(".ChooseProducts__swiper", {
        // slidesPerView: 2,
        spaceBetween: 33,

        breakpoints: {
          300: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
          },
        },
      });
    }

    if ($(".reviews__swiper").length > 0) {
      const reviewsSwiper = new Swiper(".reviews__swiper", {
        // slidesPerView: 2,
        spaceBetween: 32,

        breakpoints: {
          300: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 3,
          },
        },
      });
    }
  };

  document.body.appendChild(swiperScript);
});

// var IscheckSize = false;
function checkSize() {
  // if ($(window).width() < 1000 && !IscheckSize)
  if ($(window).width() < 1000) {
    $(".footer__wrap")[0].append($(".footer__copyright")[0]);
    // IscheckSize = true;
  }

  if ($(window).width() > 1000) {
    $(".footer__logo")[0].append($(".footer__copyright")[0]);
    // IscheckSize = true;
  }

  if ($(window).width() < 500) {
    $(".burger-menu__header")[0].append($(".profile__img")[0]);
    // IscheckSize = true;
  }

  if ($(window).width() > 500) {
    $(".header__buttons")[0].prepend($(".profile__img")[0]);
    // IscheckSize = true;
  }
}
checkSize();
$(window).resize(function () {
  checkSize();
});
