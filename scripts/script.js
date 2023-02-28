import { listCards } from "./listCards.js";
const formValues = {
  name: "Введите имя",
  description: "Вид деятельности",
  fieldName: "Название",
  fieldLink: "Ссылка на картинку",
};
const body = document.querySelector(".body-root");
const main = document.querySelector(".main");

const profile = document.querySelector(".profile");

// открытие окна профиля
const popupProfile = document.querySelector(".popup_profile");
const inputName = popupProfile.querySelector(".popup__input_field_name");
const inputDescription = popupProfile.querySelector(
  ".popup__input_field_description"
);
const buttonEdit = profile.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", function () {
  inputName.value = "";
  inputDescription.value = "";
  inputName.placeholder = formValues.name;
  inputDescription.placeholder = formValues.description;
  openPopup(popupProfile);
});

// сохранение нового профиля и закрытие окна
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const formSend = popupProfile.querySelector(".popup__container");
formSend.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
});

// функция: создаем карточку и вешаем события - удаление карточки, лайки и отк картинки
function createCard(name, link) {
  const cardNew = template.querySelector(".card").cloneNode(true);
  const cardNewImage = cardNew.querySelector(".card__image");
  const cardNewLike = cardNew.querySelector(".card__like");
  cardNewImage.src = `${link}`;
  cardNewImage.alt = `${name}`;

  cardNew.querySelector(".card__place").textContent = `${name}`;
  cardNew
    .querySelector(".card__basura")
    .addEventListener("click", (e) => cardNew.remove());
  cardNewLike.addEventListener("click", (e) =>
    e.target.classList.toggle("card__like_active")
  );
  cardNewImage.addEventListener("click", (e) => openPopupImage(e));
  return cardNew;
}

// подгружаем данные для отк картинки на весь экран
const popupImageDisplay = document.querySelector(".popup_picture");
const popupImageDisplayFull = popupImageDisplay.querySelector(".popup__full");
const popupImageDisplayCaption =
  popupImageDisplay.querySelector(".popup__caption");
function openPopupImage(e) {
  popupImageDisplayFull.src = e.target.src;
  popupImageDisplayFull.alt = e.target.alt;
  popupImageDisplayCaption.textContent = e.target.alt;
  openPopup(popupImageDisplay);
}

// наполняем страницу карточками из массива карт
const template = document.querySelector("#card").content;
const cards = document.querySelector(".cards");
function collectCards(arr) {
  arr.forEach(function (el) {
    cards.append(createCard(el.name, el.link));
  });
}
collectCards(listCards);

// открытие окна добавления фото
const buttonAdd = profile.querySelector(".profile__button-add");
const imageAdd = body.querySelector(".popup_image_add");
const inputPlace = imageAdd.querySelector(".popup__input_field_place");
const inputLink = imageAdd.querySelector(".popup__input_field_link");
buttonAdd.addEventListener("click", function () {
  inputPlace.placeholder = "Название";
  inputLink.placeholder = "Ссылка на картинку";
  openPopup(imageAdd);
});

// сохранение фото и закрытие окна
const formAdd = imageAdd.querySelector(".popup__container");
formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  cards.prepend(createCard(inputPlace.value, inputLink.value));
  listCards.unshift({ name: inputPlace.value, link: inputLink.value });
  closePopup(imageAdd);
  inputPlace.value = "";
  inputLink.value = "";
});

// закрытие всех всплывающих окон через Х
body.addEventListener("click", function (e) {
  if (e.target.classList.contains("popup__close")) {
    closePopup(e.target.closest(".popup"));
  }
});

// класс +/-
function openPopup(el) {
  el.classList.add("popup_opened");
}
function closePopup(el) {
  el.classList.remove("popup_opened");
}

// закрытие окна через click out zone
const popup = body.querySelectorAll(".popup");
popup.forEach(function (el) {
  document.addEventListener("click", (e) => {
    if (e.target === el) {
      closePopup(el);
    }
  });
  // закрытие окна через Esc
  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      closePopup(el);
    }
  });
});
