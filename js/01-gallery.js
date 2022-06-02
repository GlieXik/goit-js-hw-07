import { galleryItems } from "./gallery-items.js";

const refs = {
  galleryWrapper: document.querySelector(".gallery"),
};

const createMarkup = () => {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}" >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}""
            alt="${description}"
          />
        </a>
      </div>`
    )
    .join("");
};
refs.galleryWrapper.innerHTML = createMarkup();

function onClickImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const img = `
  <div class="modal">
    <img src="${event.target.dataset.source}">
  </div>`;
  const instance = basicLightbox
    .create(img, {
      onShow: (instance) => {
        document.onkeydown = function (evt) {
          var isEscape = false;
          if ("key" in evt) {
            isEscape = evt.key === "Escape" || evt.key === "Esc";
          }
          if (isEscape) {
            instance.close();
          }
        };
      },
    })
    .show();
}

refs.galleryWrapper.addEventListener("click", onClickImg);
