export function isWebp() {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector("html").classList.add("webp");
    } else {
      document.querySelector("html").classList.add("no-webp");
    }

    // let className = support === true ? 'webp' : 'no-webp';
    // document.documentElement.classList.add(className);
  });
}

////////
// const supportsWebP = () => {
//   return (
//     !![].map &&
//     document
//       .createElement("canvas")
//       .toDataURL("image/webp")
//       .indexOf("data:image/webp") === 0
//   );
// };

// const generatePictureHTML = (image) => {
//   const imagePath = image.getAttribute("src");

//   if (supportsWebP()) {
//     const webpPath = imagePath.replace(/\.(png|jpg)$/, ".webp");
//     const picture = document.createElement("picture");
//     const sourceWebP = document.createElement("source");
//     sourceWebP.setAttribute("srcset", webpPath);
//     sourceWebP.setAttribute("type", "image/webp");

//     const img = document.createElement("img");
//     img.setAttribute("src", imagePath);
//     img.setAttribute("alt", image.getAttribute("alt"));

//     picture.appendChild(sourceWebP);
//     picture.appendChild(img);

//     image.parentNode.replaceChild(picture, image);
//   }
// };

// export function changeImages() {
//   const images = document.querySelectorAll("img");
//   images.forEach((image) => {
//     generatePictureHTML(image);
//   });
// }
