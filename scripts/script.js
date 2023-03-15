import { listCards } from "./listCards.js";

const formData = {
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const body = document.querySelector(".body-root");
const profile = document.querySelector(".profile");
const popups = body.querySelectorAll(".popup");

const popupProfile = document.querySelector(".popup_profile");
const formAddProfile = popupProfile.querySelector(".popup__container");
const inputName = popupProfile.querySelector(".popup__input_field_name");
const inputDescription = popupProfile.querySelector(
  ".popup__input_field_description"
);
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const formUserProfile = popupProfile.querySelector(".popup__container");

const imageAdd = body.querySelector(".popup_image_add");
const formAdd = imageAdd.querySelector(".popup__container");
const inputPlace = imageAdd.querySelector(".popup__input_field_place");
const inputLink = imageAdd.querySelector(".popup__input_field_link");

const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");

const popupImageDisplay = document.querySelector(".popup_picture");
const popupImageDisplayFull = popupImageDisplay.querySelector(".popup__full");
const popupImageDisplayCaption =
  popupImageDisplay.querySelector(".popup__caption");

const template = document.querySelector("#card").content;
const cards = document.querySelector(".cards");

// открытие окна профиля
buttonEdit.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
  clearInput(popupProfile, formData.errorClass, formData.inputErrorClass);
});

// сохранение нового профиля и закрытие окна
function savePopupProfile() {
  formUserProfile.addEventListener("submit", function (e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupProfile);
    addButtonInactive(formAddProfile);
  });
}
savePopupProfile();

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
    .addEventListener("click", () => cardNew.remove());
  cardNewLike.addEventListener("click", (e) =>
    e.target.classList.toggle("card__like_active")
  );
  cardNewImage.addEventListener("click", (e) => openPopupImage(e));
  return cardNew;
}

// подгружаем данные для отк картинки на весь экран
function openPopupImage(e) {
  popupImageDisplayFull.src = e.target.src;
  popupImageDisplayFull.alt = e.target.alt;
  popupImageDisplayCaption.textContent = e.target.alt;
  openPopup(popupImageDisplay);
}

// наполняем страницу карточками из массива карт
function collectCards(arr) {
  arr.forEach(function (el) {
    cards.append(createCard(el.name, el.link));
  });
}
collectCards(listCards);

// открытие окна добавления фото
buttonAdd.addEventListener("click", function (e) {
  openPopup(imageAdd);
  clearInput(imageAdd, formData.errorClass, formData.inputErrorClass);
});

// сохранение фото и закрытие окна
function savePopupImage() {
  formAdd.addEventListener("submit", function (e) {
    e.preventDefault();
    closePopup(imageAdd);
    cards.prepend(createCard(inputPlace.value, inputLink.value));
    // listCards.unshift({ name: inputPlace.value, link: inputLink.value });
    addButtonInactive(formAdd);
    inputPlace.value = "";
    inputLink.value = "";
  });
}
savePopupImage();

// закрытие всех всплывающих окон через Х
function setCloseByClickButtonXListener(el) {
  const buttonX = el.querySelector(".popup__close");
  buttonX.addEventListener(
    "click",
    (e) => closePopup(e.target.closest(".popup")),
    { once: true }
  );
}

// закрытие окна через click out zone
function setCloseByClickOverlayListener(el) {
  // el.addEventListener("click", (e) => {if (e.target === el) { closePopup(el); }});
  el.addEventListener("click", (e) => OverlayListener(e, el));
  el.removeEventListener("click", (e) => OverlayListener(e, el));
}

function OverlayListener(event, elem) {
  if (event.target === elem) {
    closePopup(elem);
  }
}

// закрытие окна через Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// класс +/-
function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc, { once: true });
  setCloseByClickOverlayListener(el);
  setCloseByClickButtonXListener(el);
}
function closePopup(el) {
  el.classList.remove("popup_opened");
}

// фунция очистки ошибки при выходе из формы не через батон-сабмит
function clearInput(elPopup, errorClass, inputErrorClass) {
  // const errorInputLine = Array.from(document.getElementsByClassName(inputErrorClass));
  const errorInputLine = Array.from(
    elPopup.getElementsByClassName(inputErrorClass)
  );

  errorInputLine.forEach((el) => {
    el.classList.remove(inputErrorClass);
  });

  const errorInputSubline = Array.from(
    elPopup.getElementsByClassName(errorClass)
  );
  errorInputSubline.forEach((el) => (el.textContent = ""));
}

function addButtonInactive(form) {
  const popupButtonSave = form.querySelector(".popup__button-save");
  popupButtonSave.classList.add("button_inactive");
  popupButtonSave.disabled = true;
}
