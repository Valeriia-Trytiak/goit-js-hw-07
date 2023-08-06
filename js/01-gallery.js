import { galleryItems } from "./gallery-items.js";
// Change code below this line

/* 
1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
2. Реализация делегирования на ul.gallery и получение url большого изображения.
3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.*/

const galleryContainer = document.querySelector(".gallery");

// Создание разметки
function creatGalleryEl(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="I${description}"
          />
        </a>
      </li>
        `
    )
    .join("");
}

// Добавление в ДОМ
galleryContainer.insertAdjacentHTML("beforeend", creatGalleryEl(galleryItems));

// Делегирование получение ссылки на большое изображение
galleryContainer.addEventListener("click", onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  // Запрет на переход по ссылке
  evt.preventDefault();

  // Забираю значение data-sourse
  const oringinalImgSrc = evt.target.dataset.source;

  // Создаю модалку с новым размером изображения
  const instance = basicLightbox.create(
    `
      <div class="modal">
      <img src="${oringinalImgSrc}" width="1200">
      </div>
  `,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscapePress);
      },
    },
    {
      onClose: () => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
