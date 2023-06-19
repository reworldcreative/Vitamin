import * as functions from "./modules/functions.js";

functions.isWebp();

$(document).ready(function () {
  $(".burger-button").click(function (event) {
    $(".burger-menu").toggleClass("active");
  });

  $(".burger-menu .close-button").click(function (event) {
    $(".burger-menu").toggleClass("active");
  });
});
