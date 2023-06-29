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

  if ($(".profileOrders .down-arrow").length > 0) {
    $(".profileOrders .down-arrow").click(function (event) {
      var panel = event.target.parentElement.nextElementSibling;
      this.classList.toggle("active");
      var computedStyle = window.getComputedStyle(panel);
      if (computedStyle.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  counter();
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
  var lazyloadxt = document.createElement("script");
  lazyloadxt.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyloadxt/1.1.0/jquery.lazyloadxt.min.js";

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

    if ($(".shopHero__slider").length > 0) {
      const shopHeroBanner = new Swiper(".shopHero__slider", {
        slidesPerView: 1.2,
        spaceBetween: 50,
        centeredSlides: true,

        breakpoints: {
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          1000: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          1500: {
            slidesPerView: 1.2,
            spaceBetween: 50,
          },
        },
        navigation: {
          nextEl: ".shopHero-Banner-button-next",
          prevEl: ".shopHero-Banner-button-prev",
        },
        pagination: {
          el: ".shopHero-Banner-pagination",
          clickable: true,
        },
      });
    }
  };

  document.body.appendChild(swiperScript);
  document.body.appendChild(lazyloadxt);
});

// var IscheckSize = false;
function checkSize() {
  // if ($(window).width() < 1000 && !IscheckSize)
  if ($(window).width() < 1000) {
    if ($(".footer__wrap").length > 0) {
      $(".footer__wrap")[0].append($(".footer__copyright")[0]);
      // IscheckSize = true;
    }
  }

  if ($(window).width() > 1000) {
    if ($(".footer__logo").length > 0) {
      $(".footer__logo")[0].append($(".footer__copyright")[0]);
      // IscheckSize = true;
    }
  }

  if ($(window).width() < 500) {
    if ($(".burger-menu__header").length > 0) {
      $(".burger-menu__header")[0].append($(".profile__img")[0]);
      // IscheckSize = true;
    }
    if ($(".productCard__autoship_text").length > 0) {
      $(".productCard__autoship_textFirst")[0].textContent = "Deliver every";
    }
  }

  if ($(window).width() > 500) {
    if ($(".header__buttons").length > 0) {
      $(".header__buttons")[0].prepend($(".profile__img")[0]);
      // IscheckSize = true;
    }

    if ($(".productCard__autoship_text").length > 0) {
      $(".productCard__autoship_textFirst")[0].textContent =
        "Autoship this item every";
    }
  }

  if ($(window).width() < 1300) {
    if ($(".shop__title")) {
      $(".shop__title").click(function (event) {
        var panel = $(".shop__navigation")[0];
        this.classList.toggle("active");
        var computedStyle = window.getComputedStyle(panel);
        if (computedStyle.display === "grid") {
          panel.style.display = "none";
        } else {
          panel.style.display = "grid";
        }
      });
    }
  }
}
checkSize();
$(window).resize(function () {
  checkSize();
});

// $(window).lazyLoadXT();
function counter() {
  if ($(".number-counter").length > 0) {
    $(".number-counter.minus-button").click(function () {
      var $input = $(this).parent().find(".productCard__number");
      var count = parseInt($input[0].textContent) - 1;
      count = count < 1 ? 1 : count;
      $input[0].textContent = count;
      return false;
    });
    $(".number-counter.plus-button").click(function () {
      var $input = $(this).parent().find(".productCard__number");
      $input[0].textContent = parseInt($input[0].textContent) + 1;
      return false;
    });
  }
}
