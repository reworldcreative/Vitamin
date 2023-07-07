import * as functions from "./modules/functions.js";

functions.isWebp();
// functions.changeImages();
var pathToServer = "https://vitamin-bd.onrender.com";
// local - "http://localhost:1337"
$(document).ready(function () {
  if ($(".burger-button").length > 0) {
    $(".burger-button").click(function (event) {
      $(".burger-menu").toggleClass("active");
      stopScroll();
    });
  }

  if ($(".burger-menu .close-button").length > 0) {
    $(".burger-menu .close-button").click(function (event) {
      $(".burger-menu").toggleClass("active");
      stopScroll();
    });
  }

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

  if ($(".cart__img").length > 0) {
    $(".cart__img").click(function (event) {
      $(".basket").toggleClass("active");
      stopScroll();
    });
  }

  if ($(".basket").length > 0) {
    $(".basket .close-cart").click(function (event) {
      $(".basket").toggleClass("active");
      stopScroll();
    });
  }

  if ($(".basket__order-button")) {
    $(".basket__order-button").click(function (event) {
      const basketItems = document.querySelectorAll(".basket .basket__item");

      const itemsData = [];

      basketItems.forEach((item) => {
        const imageSrc = item
          .querySelector(".basket__image")
          .getAttribute("src");
        const itemName = item.querySelector(".basket__item_name").textContent;
        const itemNumber = item.querySelector(
          ".productCard__number"
        ).textContent;
        const itemPriceNumber = item.querySelector(
          ".basket__item_priceNumber"
        ).textContent;
        const itemPriceSale = item.querySelector(
          ".basket__item_priceSale"
        ).textContent;

        const itemData = {
          image: imageSrc,
          name: itemName,
          number: itemNumber,
          priceNumber: itemPriceNumber,
          priceSale: itemPriceSale,
        };

        itemsData.push(itemData);
      });

      localStorage.setItem("basketItemsData", JSON.stringify(itemsData));
      window.location.href = "Checkout.html";
    });
  }

  var productString;
  var productObject;

  const productObjectString = localStorage.getItem("productObject");

  if (productObjectString !== null && productObjectString.length > 0) {
    productString = localStorage.getItem("productObject");
    productObject = JSON.parse(productString);

    if ($(".productCard").length > 0) {
      $(".productCard__image")[0].src = productObject.productImage;
      $(".productCard__class")[0].textContent = productObject.productClass;
      $(".productCard__name")[0].textContent = productObject.productName;
      $(".productCard__price_number")[0].textContent =
        productObject.productPrice;
      $(".packProduckItem__priceDiscount")[0].textContent =
        productObject.productPriceDiscount;

      if (productObject.productPriceDiscount.length > 0) {
        const startPrice = parseInt(
          $(".productCard__price_number")[0].textContent.replace("$", "")
        );
        const discountPrice = parseInt(
          $(".packProduckItem__priceDiscount")[0].textContent.replace("$", "")
        );
        var discountNumber = ((startPrice - discountPrice) / startPrice) * 100;
        $(".productCard__price_number")[0].classList.add("discount");
        $(".packProduckItem__priceDiscount")[0].style.display = "block";
        $(".packProduckItem__badge")[0].style.display = "block";
        $(".packProduckItem__badge")[0].textContent =
          "-" + discountNumber.toFixed(1) + "%";
      }
    }
  }

  if ($(".addButton").length > 0) {
    $(".addButton").click(function (event) {
      var itemPrice =
        parseFloat(
          $(this)
            .closest(".column__wrap")
            .find(".productCard__price_number")
            .text()
            .replace("$", "")
        ) *
        parseInt(
          $(this).closest(".column__wrap").find(".productCard__number").text()
        ).toFixed(2);
      var itemName = $(this)
        .closest(".column__wrap")
        .find(".productCard__name")
        .text();

      var itemName = $(this)
        .closest(".column__wrap")
        .find(".productCard__name")
        .text();

      var existingItem = $(".basket__list .basket__item").filter(function () {
        return $(this).find(".basket__item_name").text() === itemName;
      });

      var firstPriceDiscountElement = $(this)
        .closest(".column__wrap")
        .find(".packProduckItem__priceDiscount")
        .text()
        .replace("$", "");

      var firstPriceDiscountValue = parseFloat(firstPriceDiscountElement);
      firstPriceDiscountElement = isNaN(firstPriceDiscountValue)
        ? ""
        : "$" + firstPriceDiscountElement;

      if (existingItem.length > 0) {
        var numberElement = existingItem.find(".productCard__number");
        var currentNumber = parseInt(numberElement.text());
        numberElement.text(currentNumber + 1);
      } else {
        var newLi = $("<li>").addClass("basket__item").html(`
    <div class="basket__item_container">
        <div class="basket__imageWrap purple">
            <img class="basket__image" src="${
              $(this).closest(".row").find(".productCard__image")[0].src
            }" alt="vitamin" width="85px" height="92px">
        </div>

        <div style="width: 100%;">
            <div class="basket__item_top">
                <h2 class="basket__item_name">${$(this)
                  .closest(".column__wrap")
                  .find(".productCard__name")
                  .text()}</h2>
                <button class="close-button delete" aria-label="delete element">
                    <img src="img/icons/Close.svg" alt="Close icon" width="14" height="14" aria-hidden="true">
                </button>
            </div>

            <div class="basket__item_amount">
                <div class="productCard__counter">
                    <button class="productCard__counter_button number-counter minus-button">-</button>
                    <p class="productCard__number">${$(this)
                      .closest(".column__wrap")
                      .find(".productCard__number")
                      .text()}</p>
                    <button class="productCard__counter_button number-counter plus-button">+</button>
                </div>

                <div class="basket__item_price">
                <div class="visibility-hidden firstPrice">${$(this)
                  .closest(".column__wrap")
                  .find(".productCard__price_number")
                  .text()}
                  </div>
                  <div class="visibility-hidden firstPriceDiscount">${$(this)
                    .closest(".column__wrap")
                    .find(".packProduckItem__priceDiscount")
                    .text()}
                    </div>
                    <div class="basket__item_priceNumber">
                    ${"$" + itemPrice}</div>
                    <div class="basket__item_priceSale">${firstPriceDiscountElement}</div>
                </div>
            </div>

            <div class="basket__item_ship productCard__autoship">
                <input type="checkbox" class="basket__checkbox" name="Autoship" id="basket__Autoship3" value="Autoship">
                <label for="basket__Autoship3"></label>
                <p class="productCard__autoship_text">
                    <span class="productCard__autoship_textFirst">Autoship every</span>
                    <select class="days-ayto-delivery" name="days-ayto-delivery">
                        <option value="7">7</option>
                        <option value="14">14</option>
                        <option value="30" selected="">30</option>
                    </select>
                    days
                </p>
            </div>
        </div>
    </div>
`);

        if ($(".productCard__autoship_switch input")[0].checked) {
          newLi.find(".basket__checkbox").prop("checked", true);
        }

        newLi
          .find(".days-ayto-delivery")
          .val(
            $(this).closest(".column__wrap").find(".days-ayto-delivery").val()
          );

        if (
          $(this)
            .closest(".column__wrap")
            .find(".packProduckItem__priceDiscount")
            .text().length > 0
        ) {
          newLi.find(".basket__item_priceNumber")[0].classList.add("discount");
          newLi.find(".basket__item_priceSale")[0].style.display = "block";
        }

        $(".basket__list").append(newLi);
        checkBasketLength();
        basketDelete();
        // counter();
        saveBasketToStorage();
      }
    });
  }

  function basketDelete() {
    if ($(".basket").length > 0) {
      $(".basket__item_container .delete").click(function (event) {
        this.closest(".basket__item").remove();
        saveBasketToStorage();
        checkBasketLength();
      });
    }
  }

  var basketList = localStorage.getItem("basketList");
  if (
    basketList !== null &&
    basketList.length > 0 &&
    $(".basket .basket__list").length > 0
  ) {
    $(".basket .basket__list")[0].innerHTML = basketList;
  }

  function checkBasketLength() {
    if ($(".basket__list").length > 0) {
      if ($(".basket__list li").length <= 0) {
        $(".basket__empty")[0].style.display = "flex";
        $(".basket__bottom")[0].style.display = "none";
        $(".header .cart__img_alert")[0].style.display = "none";
      } else {
        $(".basket__empty")[0].style.display = "none";
        $(".basket__bottom")[0].style.display = "grid";
        $(".header .cart__img_alert")[0].style.display = "block";
        basketTotalPriceChange();
      }
    }
  }

  function stopScroll() {
    if (
      $(".burger-menu").hasClass("active") ||
      $(".basket").hasClass("active")
    ) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  }

  if ($(".Checkout__accordion .Checkout__money_name").length > 0) {
    $(".Checkout__accordion .Checkout__money_name").click(function (event) {
      this.classList.toggle("active");

      var panelList = $(".Checkout__list")[0];
      var computedStyleList = window.getComputedStyle(panelList);
      var panelMoney = $(".Checkout__money")[0];
      var computedStyleMoney = window.getComputedStyle(panelMoney);
      if (computedStyleList.display == "grid") {
        panelList.style.display = "none";
      } else {
        panelList.style.display = "grid";
      }
      if (computedStyleMoney.display == "grid") {
        panelMoney.style.display = "none";
      } else {
        panelMoney.style.display = "grid";
      }
    });
  }

  if ($(".Checkout").length > 0) {
    const basketItemsData = localStorage.getItem("basketItemsData");
    var totalPrice = 0;
    if (basketItemsData) {
      const itemsData = JSON.parse(basketItemsData);
      itemsData.forEach((itemData) => {
        const imageSrc = itemData.image;
        const itemName = itemData.name;
        const itemNumber = itemData.number;
        const itemPriceNumber = itemData.priceNumber;
        var itemPriceSale = itemData.priceSale;

        itemPriceSale = parseFloat(itemData.priceSale);
        itemPriceSale = isNaN(itemPriceSale) ? "" : itemPriceSale;

        var newLi = $("<li>").addClass("Checkout__product").html(`
                        <div class="Checkout__product_imageWrap pink">
                            <img src="${imageSrc}" alt="vitamin" width="49px" height="55px">
                        </div>
                        <p class="Checkout__product_name"><span class="Checkout__product_amount">${itemNumber}</span> x ${itemName}</p>

                        <div class="Checkout__price">
                            <p class="Checkout__price_number">${itemPriceNumber}</p>
                            <p class="Checkout__price_number sale">${itemPriceSale}</p>
                        </div>
                  
        `);

        if (itemPriceSale.length > 0) {
          newLi.find(".Checkout__price_number")[0].classList.add("discount");
          totalPrice += parseInt(itemPriceSale.replace("$", ""));
        } else {
          totalPrice += parseInt(itemPriceNumber.replace("$", ""));
        }
        $(".Checkout__list").append(newLi);
      });
    }
    $(".subtotalCountMoney")[0].textContent = totalPrice.toFixed(2);

    const discountCountMoney = parseInt(
      $(".discountCountMoney")[0].textContent.replace("$", "")
    );
    const shipingCountMoney = parseInt(
      $(".shipingCountMoney")[0].textContent.replace("$", "")
    );
    const totalOrderPrice = totalPrice + discountCountMoney + shipingCountMoney;

    $(".totalCountMoney")[0].textContent = totalOrderPrice.toFixed(2);
  }

  // counter();
  basketDelete();
  checkBasketLength();
  basketTotalPriceChange();

  if ($(".shop").length > 0) {
    $.ajax({
      url:
        pathToServer +
        "/api/products?populate=image&populate=class&populate=class.vitamins_color",
      method: "GET",
      data: {},
      headers: {
        "Cache-Control": "max-age=3600",
      },
      dataType: "json",
      success: function (response) {
        response.data.forEach(function (element) {
          createShopListElement(element);
        });
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  }
});

if ($(".product-sort").length > 0) {
  $(".product-sort").each(function () {
    $(this).click(function (event) {
      updateProductList(
        event.target.textContent,
        "/api/products?filters[class][name][$eqi]="
      );
    });
  });
}

if ($(".product-sale").length > 0) {
  $(".product-sale").each(function () {
    $(this).click(function (event) {
      updateProductList(
        event.target.textContent,
        "/api/products?filters[discountPrice][$notNull]=''"
      );
    });
  });
}

if ($(".createAccount").length > 0) {
  $(".createAccount").click(function (event) {
    event.preventDefault();

    var userData = {
      username: $("#SignUpFirstName").val(),
      LastName: $("#SignUpLastName").val(),
      email: $("#SignUpEmail").val(),
      password: $("#SignUpPassword").val(),
    };

    $.ajax({
      url: pathToServer + "/api/auth/local/register",
      method: "POST",
      data: userData,
      dataType: "json",
      success: function (response) {
        localStorage.setItem("jwt", response.jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.replace("profileOverview.html");
      },
      error: function (xhr, status, error) {
        console.log(error);
      },
    });
  });
}

if ($(".profileOverview__form").length > 0) {
  var jwt = localStorage.getItem("jwt");
  var userDataObject = JSON.parse(localStorage.getItem("user"));

  if (userDataObject) {
    $("#personalName")[0].value = userDataObject.username;
    $("#personalLastName")[0].value = userDataObject.LastName;
    $("#personaEmail")[0].value = userDataObject.email;
    $("#personalAddressLine1")[0].value = userDataObject.AddressLine1;
    $("#personalAddressLine2")[0].value = userDataObject.AddressLine2;
    $("#personaCity")[0].value = userDataObject.City;
    $("#personaState")[0].value = userDataObject.state;
    $("#personaZIP")[0].value = userDataObject.ZIP;
    $("#personaPhone")[0].value = userDataObject.PhoneNumber;
  }
  $("#profileOverview-SaveButton").click(function (event) {
    event.preventDefault();
    if (jwt) {
      var updateUserData = {
        username: $("#personalName").val(),
        email: $("#personaEmail").val(),
        LastName: $("#personalLastName").val(),
        AddressLine1: $("#personalAddressLine1").val(),
        AddressLine2: $("#personalAddressLine2").val(),
        City: $("#personaCity").val(),
        state: $("#personaState").val(),
        ZIP: $("#personaZIP").val(),
        PhoneNumber: $("#personaPhone").val(),
      };

      $.ajax({
        url: pathToServer + "/api/users/" + userDataObject.id,
        method: "PUT",
        data: updateUserData,
        dataType: "json",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        success: function (response) {
          localStorage.setItem("user", JSON.stringify(response));
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  });
}

var currentPagePath = window.location.pathname;
var isSignInPage = currentPagePath.includes("SignIn.html");

if (isSignInPage) {
  var jwt = localStorage.getItem("jwt");
  if (jwt) {
    window.location.replace("profileOverview.html");
  } else {
    if ($(".SignInBtn").length > 0) {
      $(".SignInBtn").click(function (event) {
        event.preventDefault();

        var userData = {
          identifier: $("#SignInEmail").val(),
          password: $("#SignInPassword").val(),
        };

        $.ajax({
          url: pathToServer + "/api/auth/local",
          method: "POST",
          data: userData,
          dataType: "json",
          success: function (response) {
            localStorage.setItem("jwt", response.jwt);
            localStorage.setItem("user", JSON.stringify(response.user));
            window.location.replace("profileOverview.html");
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
      });
    }
  }
}

if ($(".SignOut")[0]) {
  $(".SignOut").click(function (event) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    window.location.replace("SignIn.html");
  });
}

if ($("#Order")[0]) {
  $("#Order").click(function (event) {
    var productList = [];
    $(".Checkout__product").each(function () {
      var amount = parseInt($(this).find(".Checkout__product_amount").text());
      var discount = parseFloat(
        $(this).find(".Checkout__price_number.discount").text().replace("$", "")
      );
      var sale = parseFloat(
        $(this).find(".Checkout__price_number.sale").text().replace("$", "")
      );
      var name = $(this)
        .find(".Checkout__product_name")
        .text()
        .replace(/^\d+\s*x\s*/, "")
        .trim();
      var product = {
        name: name,
        amount: amount,
        price: {
          productPrice: discount,
          salePrice: sale,
        },
      };
      productList.push(product);
    });

    var orderData = {
      data: {
        address: {
          Name: $("#personalName").val(),
          LastName: $("#personalLastName").val(),
          Email: $("#personaEmail").val(),
          AddressLine1: $("#personalAddressLine1").val(),
          AddressLine2: $("#personalAddressLine2").val(),
          City: $("#personaCity").val(),
          State: $("#personaState").val(),
          ZIP: $("#personaZIP").val(),
          Phone: $("#personaPhone").val(),
        },
        products: productList,
      },
    };

    var inputs = $(".Checkout__form .profileOverview__input");
    var inputsErrors = $(".Checkout__form .input__error");
    var isValid = true;
    for (var i = 0; i < inputsErrors.length; i++) {
      inputsErrors[i].textContent = "";
      inputs[i].classList.remove("error");
    }

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        inputsErrors[i].textContent = "Required";
        inputs[i].classList.add("error");
        isValid = false;
      } else if (!new RegExp(inputs[i].pattern).test(inputs[i].value)) {
        inputsErrors[i].textContent = "enter valid data";
        inputs[i].classList.add("error");
        isValid = false;
      }
    }

    if (isValid) {
      $.ajax({
        url: pathToServer + "/api/orders",
        method: "POST",
        data: JSON.stringify(orderData),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
          localStorage.removeItem("basketItemsData");
          localStorage.removeItem("basketList");
          localStorage.removeItem("productObject");

          window.location.replace("Checkout_fin.html");
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  });
}

function updateProductList(sortBy, filter) {
  sortBy = sortBy.includes("&") ? sortBy.replace("&", "%26") : sortBy;
  // %26 екранування символу  &
  $.ajax({
    url:
      pathToServer +
      filter +
      sortBy +
      "&populate=image&populate=class&populate=class.vitamins_color",
    method: "GET",
    data: {},
    dataType: "json",
    headers: {
      "Cache-Control": "max-age=3600",
    },
    success: function (response) {
      $(".shop__list").empty();

      response.data.forEach(function (element) {
        createShopListElement(element);
      });
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function createShopListElement(element) {
  var productImage;
  var isWebpDocument = document.documentElement.className;
  if (isWebpDocument === "webp") {
    productImage =
      pathToServer + element.attributes.image.data[0].attributes.url;
  } else {
    productImage =
      pathToServer + element.attributes.image.data[1].attributes.url;
  }
  var discountPrice;
  if (element.attributes.discountPrice !== null) {
    discountPrice = element.attributes.discountPrice;
  } else {
    discountPrice = "";
  }

  var elementColor =
    element.attributes.class.data.attributes.vitamins_color.data.attributes
      .name;
  var shopItem = $("<article>").addClass("packProduckItem").html(`
<div class="packProduckItem__wrap">
    <div class="packProduckItem__badge ">
        -45%
    </div>
    <div class="packProduckItem__image">
        <img src="${productImage}" alt="vitamin's jar" width="186px" height="209px">
    </div>

    <div class="packProduckItem__container">
        <p class="packProduckItem__class" style="color: ${elementColor};">${
    element.attributes.class.data.attributes.name
  }</p>
        <p class="packProduckItem__name">${element.attributes.name}</p>
        <div class="packProduckItem__priceContainer">
            <p class="packProduckItem__price">${
              "$" + element.attributes.price
            }</p>
            <p class="packProduckItem__price packProduckItem__priceDiscount">${discountPrice}</p>
        </div>
    </div>
</div>
          
`);

  if (element.attributes.discountPrice !== null) {
    shopItem.find(".packProduckItem__price")[0].classList.add("discount");
  }
  $(".shop .shop__list").prepend(shopItem);
}

function packProduckItemClick() {
  if ($(".packProduckItem").length > 0) {
    $(".packProduckItem").click(function (event) {
      var productObject = {
        productImage: this.querySelectorAll(".packProduckItem__image img")[0]
          .src,
        productName: this.querySelectorAll(".packProduckItem__name")[0]
          .textContent,
        productClass: this.querySelectorAll(".packProduckItem__class")[0]
          .textContent,
        productPrice: this.querySelectorAll(".packProduckItem__price")[0]
          .textContent,
        productPriceDiscount: this.querySelectorAll(
          ".packProduckItem__priceDiscount"
        )[0].textContent,
      };
      var productObjectString = JSON.stringify(productObject);
      localStorage.setItem("productObject", productObjectString);
      window.location.href = "productCard.html";
    });
  }
}
$(document).on("click", ".packProduckItem", packProduckItemClick);
$(document).on("click", ".productCard__counter_button", counter);

function saveBasketToStorage() {
  localStorage.setItem("basketList", $(".basket__list")[0].innerHTML);
}

window.addEventListener("beforeunload", function (event) {
  saveBasketToStorage();
  // event.preventDefault();
});

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

    if ($(".Checkout__column_first").length > 0) {
      $(".Checkout__column_first")[0].append($(".Checkout__button")[0]);
    }
  }

  if ($(window).width() > 1000) {
    if ($(".footer__logo").length > 0) {
      $(".footer__logo")[0].append($(".footer__copyright")[0]);
      // IscheckSize = true;
    }

    if ($(".Checkout__column_second").length > 0) {
      $(".Checkout__column_second")[0].append($(".Checkout__button")[0]);
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

    if ($(".profile__navbar .profile__navigation").length > 0) {
      $(".burger-menu .burger-menu__navigation").html(
        $(".profile__navbar .profile__navigation").html()
      );
    }

    if ($(".shop .shop__navigation").length > 0) {
      $(".burger-menu .burger-menu__navigation").html(
        $(".shop .shop__navigation").html()
      );

      $(".burger-menu .burger-menu__navigation").prepend(
        `<li><a class="shop__link" href="#">All categories</a></li>`
      );

      $(".burger-menu .burger-menu__navigation").after(
        `<div class="burger-menu__ShopBottom">
        <p class="burger-menu__ShopBottom_title">Don’t know what vitamins your body needs?</p>
        <p class="burger-menu__ShopBottom_text">Answer a few simple questions and automatically
            get a personalazed list of vitamins in minutes</p>
        <a href="quiz.html" class="quiz-button @@class">
            Take the quiz
        </a>
    </div>`
      );
    }
  }

  if ($(window).width() > 500) {
    if ($(".header__buttons").length > 0) {
      $(".header__buttons")[0].prepend($(".profile__img")[0]);
      // IscheckSize = true;
    }

    if ($(".productCard .productCard__autoship_text").length > 0) {
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

  if ($(window).width() < 800) {
    if ($(".profilePayment__form .back-card .inputCard").length > 0) {
      $(".profilePayment__form .front-card .card-second")[0].append(
        $(".profilePayment__form .back-card .inputCard")[0]
      );
    }
  }

  if ($(window).width() > 800) {
    if ($(".profilePayment__form .card-second .inputCard-cvv").length > 0) {
      $(".profilePayment__form .back-card")[0].append(
        $(".profilePayment__form .card-second .inputCard-cvv")[0]
      );
    }
  }
}
checkSize();
$(window).resize(function () {
  checkSize();
});

function basketTotalPriceChange() {
  let totalPrice = 0;
  if ($(".basket")) {
    $(".basket__item_priceNumber").each(function () {
      const price = parseFloat($(this).text().replace("$", ""));
      // totalPrice += price;
      if (
        !isNaN(
          parseFloat(
            $(this)
              .next(".basket__item_priceSale")[0]
              .textContent.replace("$", "")
          )
        ) &&
        $(this).next(".basket__item_priceSale")[0].textContent.length > 0
      ) {
        totalPrice += parseFloat(
          $(this)
            .next(".basket__item_priceSale")[0]
            .textContent.replace("$", "")
        );
      } else {
        totalPrice += price;
      }
    });
    $(".basket__totalPrice").text("$" + totalPrice.toFixed(2));
  }
}

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

  if ($(".productCard__counter").length > 0) {
    $(".number-counter.minus-button").click(function () {
      uppdateItemPrice($(this));
      basketTotalPriceChange();
    });
    $(".number-counter.plus-button").click(function () {
      uppdateItemPrice($(this));
      basketTotalPriceChange();
    });
  }

  function uppdateItemPrice(element) {
    if ($(".basket")) {
      var ItemPrice = element
        .closest(".basket__item_amount")
        .find(".basket__item_price")[0];
      var firstPriceElement = $(ItemPrice).find(".firstPrice")[0];
      var firstPriceDiscountElement = $(ItemPrice).find(
        ".firstPriceDiscount"
      )[0];
      var productNumberElement = element
        .closest(".productCard__counter")
        .find(".productCard__number")[0];

      if (firstPriceElement && productNumberElement) {
        var price =
          parseFloat(
            $(ItemPrice).find(".firstPrice")[0].textContent.replace("$", "")
          ) *
          parseInt(
            element
              .closest(".productCard__counter")
              .find(".productCard__number")[0].textContent
          );

        $(ItemPrice).find(".basket__item_priceNumber")[0].textContent =
          "$" + price.toFixed(2);
      }

      if (firstPriceDiscountElement && productNumberElement) {
        var price =
          parseFloat(
            $(ItemPrice)
              .find(".firstPriceDiscount")[0]
              .textContent.replace("$", "")
          ) *
          parseInt(
            element
              .closest(".productCard__counter")
              .find(".productCard__number")[0].textContent
          );

        $(ItemPrice).find(".basket__item_priceSale")[0].textContent =
          "$" + price.toFixed(2);
      }
    }
  }
}

var signUpRadioWholesale;
if ($("#SignUp__radioWholesale").length > 0) {
  signUpRadioWholesale = $("#SignUp__radioWholesale")[0];
}
var signUpWholesale;
if ($(".SignUp__Wholesale").length > 0) {
  signUpWholesale = $(".SignUp__Wholesale")[0];
}

function toggleSignUpWholesale() {
  if (signUpRadioWholesale.checked) {
    signUpWholesale.style.display = "flex";
  } else {
    signUpWholesale.style.display = "none";
  }
}

if ($("#SignUp__radioWholesale").length > 0) {
  toggleSignUpWholesale();
}

if ($(".SignUp__radio").length > 0) {
  $(".SignUp__radio").each((index, element) => {
    $(element).on("change", toggleSignUpWholesale);
  });
}

var quzQuestions = [
  "What’s your first name?",
  "Do you smoke?",
  "What is your eating habits?",
  "How frequently do you consume alcoholic beverages?",
  "How frequently do you have cold/flu symptoms?",
  "Describe your stress level",
  "Have you ever been diagnosted with high blood glucose level?",
  "Tell us what you want to focus on",
  "What’s your email address?",
];

var currentQuestion = 0;
function changeQuestion() {
  $(".quiz #quiz__currentStep")[0].textContent = currentQuestion + 1;
  $(".quiz #quiz__totalStep")[0].textContent = quzQuestions.length;
  $(".quiz #quiz__question")[0].textContent = quzQuestions[currentQuestion];
  $(".quiz .quiz__questionContainer").css("display", "none");
  $(".quiz #quizQuestion" + (currentQuestion + 1)).css("display", "grid");
}

if ($(".quiz .quiz__button").length > 0) {
  $(".quiz .quiz__button").each((index, element) => {
    $(element).on("click", () => {
      currentQuestion++;
      if (currentQuestion > quzQuestions.length - 1) {
        window.location.href = "404.html";
      }
      changeQuestion();
    });
  });
}

if ($(".quiz .quiz__backLink").length > 0) {
  $(".quiz .quiz__backLink").on("click", () => {
    currentQuestion--;
    if (currentQuestion < 0) {
      window.location.href = "index.html";
    }
    changeQuestion();
  });
}

if ($(".quiz__radioLable").length > 0) {
  $(".quiz__radioLable").each((index, element) => {
    $(element).on("click", () => {
      currentQuestion++;
      changeQuestion();
    });
  });
}
