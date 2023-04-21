import { listCards, validationValue, datas } from "./components/constants.js";
import { Card } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { Popup } from "./components/Popup.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";

import '../src/pages/index.css';

const formData = {
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const body = document.querySelector(".body-root");
const profile = document.querySelector(".profile");

const popupProfile = document.querySelector(".popup_profile");
const inputName = popupProfile.querySelector(".name");
const inputDescription = popupProfile.querySelector(".description");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const formUserProfile = popupProfile.querySelector(".popup__container");

const imageAdd = body.querySelector(".popup_image_add");
const formAdd = imageAdd.querySelector(".popup__container");
const inputPlace = imageAdd.querySelector(".place");
const inputLink = imageAdd.querySelector(".link");

const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");

const popupImageDisplay = document.querySelector(".popup_picture");
const popupImageDisplayFull = popupImageDisplay.querySelector(".popup__full");
const popupImageDisplayCaption =
  popupImageDisplay.querySelector(".popup__caption");

const cards = document.querySelector(".cards");

const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});
console.log(userInfo)

const profileValidator = new FormValidator(validationValue, popupProfile);
profileValidator.enableValidation();

const imageAddValidator = new FormValidator(validationValue, imageAdd);
imageAddValidator.enableValidation();

const createCard = (data) => {
  const card = new Card(data, "#card", () => {
    imagePopup.open(data);
  });
  return card.generateCard();
};

const cardlist = new Section(
  {
    renderer: (listCards) => {
      cardlist.addItem(createCard(listCards));
    },
  },
  ".cards"
);
cardlist.rendererItems(listCards);

// изм userInfo
// const userInfoPopup = new PopupWithForm(".popup_profile", {
//   handlFormSubmit: (data) => {
//     userInfo.setUserInfo(data);
//   },
// });
const userInfoPopup = new PopupWithForm(".popup_profile", {
  handlFormSubmit: ({ name, description }) => {
    userInfo.setUserInfo({ name: name, description:description });
  },
});

//-----открытиe редактировапния профиля
buttonEdit.addEventListener("click", () => {
  userInfoPopup.setInputValues(userInfo.getUserInfo());
  userInfoPopup.open();
});

// ----добавлениe карточки--- popup_image_add
const newCardPopup = new PopupWithForm(".popup_image_add", {
  handlFormSubmit: ({ place, link }) => {
    cardlist.addItem(createCard({ name: place, link: link }));
  },
});

const imagePopup = new PopupWithImage(".popup_picture");
imagePopup.setEventListeners();
userInfoPopup.setEventListeners();

buttonAdd.addEventListener("click", () => {
  newCardPopup.open();
  console.log("open");
  imageAddValidator.addButtonInactive();
});
newCardPopup.setEventListeners();

