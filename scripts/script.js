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
const inputDescription = popupProfile.querySelector(".popup__input_field_description");
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
const popupImageDisplayCaption = popupImageDisplay.querySelector(".popup__caption");

const template = document.querySelector("#card").content;
const cards = document.querySelector(".cards");


// открытие окна профиля
buttonEdit.addEventListener("click", function () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
  closeByOut(popupProfile);
  closeByX(popupProfile);
});

// сохранение нового профиля и закрытие окна
formUserProfile.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
  addButtonInactive(formAddProfile);
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
    .addEventListener("click", (e) => cardNew.remove());  //е ---!!!!
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
  closeByOut(popupImageDisplay);
  closeByX(popupImageDisplay);
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
  closeByOut(imageAdd);
  closeByX(imageAdd);
});

// сохранение фото и закрытие окна
formAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  cards.prepend(createCard(inputPlace.value, inputLink.value));
  // listCards.unshift({ name: inputPlace.value, link: inputLink.value });
  closePopup(imageAdd);
  addButtonInactive(formAdd);
});

// закрытие всех всплывающих окон через Х
function closeByX(el){
  const buttonX = el.querySelector(".popup__close");
  buttonX.addEventListener("click", (e) => closePopup(e.target.closest(".popup")));
};



// закрытие окна через click out zone
function closeByOut(el){
  el.addEventListener("click", (e) => {
    if (e.target === el) {
      closePopup(el);
      clearInput(formData.errorClass, formData.inputErrorClass)
    }
  });
};

// закрытие окна через Esc
function closeByEsc(evt) {           
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

// класс +/-
function openPopup(el) {
  el.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc, { once: true })
}
function closePopup(el) {
  el.classList.remove("popup_opened");
  // document.removeEventListener('keydown', closeByEsc)
}

// фунция очистки ошибки при выходе из формы не через батон-сабмит
function clearInput(errorClass, inputErrorClass) {
  const errorInputLine = Array.from(document.getElementsByClassName(inputErrorClass));
  errorInputLine.forEach((el) => {
    el.form.reset();
    el.classList.remove(inputErrorClass);})

  const errorInputSubline = Array.from(document.getElementsByClassName(errorClass));
  errorInputSubline.forEach((el) => el.textContent = "")
}

function addButtonInactive(form){
  form.querySelector('.popup__button-save').classList.add('button_inactive');
}
