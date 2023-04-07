
import { listCards, validationValue } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
  // clearInput(popupProfile, formData.errorClass, formData.inputErrorClass);
  profileValidator.clearInput(popupProfile)
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
});

// сохранение нового профиля и закрытие окна
function savePopupProfile() {
  formUserProfile.addEventListener("submit", function (e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    console.log('popupButtonSave ', profileValidator.addButtonInactive);
    closePopup(popupProfile);

    profileValidator.addButtonInactive();
  });
}
savePopupProfile();


function createCard(item) {
  const card = new Card(item, '#card', openPopupImage);
  const cardElement = card.generateCard();
// console.log(openPopupImage);
  return cardElement;
}

// функция: создаем карточку и вешаем события - удаление карточки, лайки и отк картинки
// function createCard(name, link) {
//   const cardNew = template.querySelector(".card").cloneNode(true);
//   const cardNewImage = cardNew.querySelector(".card__image");
//   const cardNewLike = cardNew.querySelector(".card__like");
//   cardNewImage.src = `${link}`;
//   cardNewImage.alt = `${name}`;

//   cardNew.querySelector(".card__place").textContent = `${name}`;
//   cardNew
//     .querySelector(".card__basura")
//     .addEventListener("click", () => cardNew.remove());
//   cardNewLike.addEventListener("click", (e) =>
//     e.target.classList.toggle("card__like_active")
//   );
//   cardNewImage.addEventListener("click", (e) => openPopupImage(e));
//   return cardNew;
// }

// подгружаем данные для отк картинки на весь экран
// function openPopupImage(e) {
  
//     console.log(e)
//   popupImageDisplayFull.src = e.target.src;
//   popupImageDisplayFull.alt = e.target.alt;
//   popupImageDisplayCaption.textContent = e.target.alt;
//   openPopup(popupImageDisplay);
// }
function openPopupImage(name, link) {
popupImageDisplayFull.src = link;
popupImageDisplayFull.alt = name;
popupImageDisplayCaption.textContent = name;
openPopup(popupImageDisplay);
}

// наполняем страницу карточками из массива карт
function collectCards(arr) {
  arr.forEach(function (el) {
    cards.append(createCard(el));
  });
}
collectCards(listCards);

// открытие окна добавления фото
buttonAdd.addEventListener("click", function (e) {
  // inputPlace.value = "";
  // inputLink.value = "";
  openPopup(imageAdd);
  // clearInput(imageAdd, formData.errorClass, formData.inputErrorClass);
});

// сохранение фото и закрытие окна
function savePopupImage() {
  formAdd.addEventListener("submit", function (e) {
    e.preventDefault();
    closePopup(imageAdd);
    const newCardAdd = createCard({name:inputPlace.value, link:inputLink.value});
    cards.prepend(newCardAdd);
    cardValidator.addButtonInactive();
  });
}
savePopupImage();

// закрытие всплывающих окон через Х
function setCloseByClickButtonXListener(el) {
  el.addEventListener("mousedown", runXListener);
}
function runXListener(event) {
  if (event.target.classList.contains("popup__close")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// закрытие окна через click out zone
function setCloseByClickOverlayListener(el) {
  el.addEventListener("mousedown", runOverlayListener);
}
function runOverlayListener(event) {
  if (event.target.classList.contains("popup_opened")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
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
  document.addEventListener("keydown", closeByEsc);
  setCloseByClickButtonXListener(el);
  setCloseByClickOverlayListener(el);
}
function closePopup(el) {
  document.removeEventListener("keydown", closeByEsc);
  el.removeEventListener("mousedown", runXListener);
  el.removeEventListener("mousedown", runOverlayListener);
  el.classList.remove("popup_opened");
}

// фунция очистки ошибки при выходе из формы не через батон-сабмит
// function clearInput(elPopup, errorClass, inputErrorClass) {
//   const errorInputLine = Array.from(
//     elPopup.getElementsByClassName(inputErrorClass)
//   );

//   errorInputLine.forEach((el) => {
//     el.form.reset();
//     el.classList.remove(inputErrorClass);
//   });

//   const errorInputSubline = Array.from(
//     elPopup.getElementsByClassName(errorClass)
//   );
//   errorInputSubline.forEach((el) => (el.textContent = ""));
// }


// function addButtonInactive(form) {
//   const popupButtonSave = form.querySelector(".popup__button-save");
//   popupButtonSave.classList.add("button_inactive");
//   popupButtonSave.disabled = true;
// }

//-----------------------------------------
// const formList = Array.from(document.querySelectorAll(validationValue.formSelector));
// formList.forEach((formElement) => {
//   const formValidator = new FormValidator(validationValue, formElement);
//   formValidator.enableValidation();
// });



const profileValidator = new FormValidator(validationValue, popupProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationValue, imageAdd);
cardValidator.enableValidation();
