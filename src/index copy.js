
import { listCards, validationValue, datas } from "./components/constants.js";
import { Card } from "./components/Card.js";
// import { Popup } from "./Popup.js";
import { UserInfo } from "./components/UserInfo.js";
import { Popup } from "./components/Popup.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";

const formData = {
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const body = document.querySelector(".body-root");
const profile = document.querySelector(".profile");

const popupProfile = document.querySelector(".popup_profile");
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

const cards = document.querySelector(".cards");




// открытие окна профиля
// buttonEdit.addEventListener("click", function () {
//   // clearInput(popupProfile, formData.errorClass, formData.inputErrorClass);
//   profileValidator.clearInput(popupProfile);
//   inputName.value = profileName.textContent;
//   inputDescription.value = profileDescription.textContent;
//   openPopup(popupProfile);
//   profileValidator.resetValidation();
// });

// // сохранение нового профиля и закрытие окна
// function savePopupProfile() {
//   formUserProfile.addEventListener("submit", function (e) {
//     e.preventDefault();
//     profileName.textContent = inputName.value;
//     profileDescription.textContent = inputDescription.value;
//     // console.log('popupButtonSave ', profileValidator.addButtonInactive);
//     closePopup(popupProfile);
//     profileValidator.addButtonInactive();
//   });
// }
// savePopupProfile();



// function openPopupImage(name, link) {
// popupImageDisplayFull.src = link;
// popupImageDisplayFull.alt = name;
// popupImageDisplayCaption.textContent = name;
// openPopup(popupImageDisplay);
// }

// // наполняем страницу карточками из массива карт
// function collectCards(arr) {
//   arr.forEach(function (el) {
//     cards.append(createCard(el));
//   });
// }
// collectCards(listCards);

// открытие окна добавления фото
// buttonAdd.addEventListener("click", function (e) {
//   inputPlace.value = "";
//   inputLink.value = "";
//   openPopup(imageAdd);
//   imageAddValidator.resetValidation();
//   // clearInput(imageAdd, formData.errorClass, formData.inputErrorClass);
// });

// сохранение фото и закрытие окна
// function savePopupImage() {
//   formAdd.addEventListener("submit", function (e) {
//     e.preventDefault();
//     closePopup(imageAdd);
//     const newCardAdd = createCard({name:inputPlace.value, link:inputLink.value});
//     cards.prepend(newCardAdd);
//     imageAddValidator.addButtonInactive();
//   });
// }
// savePopupImage();

// закрытие всплывающих окон через Х
// function setCloseByClickButtonXListener(el) {
//   el.addEventListener("mousedown", runXListener);
// }
// function runXListener(event) {
//   if (event.target.classList.contains("popup__close")) {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// закрытие окна через click out zone
// function setCloseByClickOverlayListener(el) {
//   el.addEventListener("mousedown", runOverlayListener);
// }
// function runOverlayListener(event) {
//   if (event.target.classList.contains("popup_opened")) {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// закрытие окна через Esc
// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// класс +/-
// function openPopup(el) {
//   el.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEsc);
//   setCloseByClickButtonXListener(el);
//   setCloseByClickOverlayListener(el);
// }
// function closePopup(el) {
//   document.removeEventListener("keydown", closeByEsc);
//   el.removeEventListener("mousedown", runXListener);
//   el.removeEventListener("mousedown", runOverlayListener);
//   el.classList.remove("popup_opened");
// }


const profileValidator = new FormValidator(validationValue, popupProfile);
profileValidator.enableValidation();

const imageAddValidator = new FormValidator(validationValue, imageAdd);
imageAddValidator.enableValidation();








//------------------test Section Profile-----------------


const sectionProfile = new Section({items: listCards, renderer: (item)=>{
  sectionProfile.addItem(item)
}}, ".popup__container");
// sectionProfile.rendererItems();



//------------------end of test Section -----------------

//------------------test Popup-s -----------------

function createCard(item) {
  const card = new Card(item, '#card', () => {imagePopup.open(item.name, item.link)});
  // (data, templateSelector, handleCardClick)
  const cardElement = card.generateCard();
  return cardElement;
}
const imagePopup = new PopupWithImage(".popup_picture", ".popup__full", ".popup__caption");
createCard(listCards);

const cardlist = new Section({items: listCards, renderer: (listCards)=>{
  cardlist.addItem(createCard(listCards))
}}, ".cards");
// console.log (cardlist);
cardlist.rendererItems();

//
// вызываю EventListeners
imagePopup.setEventListeners();

// const cardlist = new Section({items: listCards, renderer: (listCards) => 
//   cardlist.addItem('.card')}, '.cards');
//   // cardlist.addItem(createCard(listCards))}, '.cards');
//   console.log (cardlist);
//   // ({ items, renderer }, containerSelector)


// function handlCardClick(data) {imagePopup.open(data)};
// const imagePopup = new PopupWithImage();
// const formPopup = new PopupWithForm(popupProfile, validationValue, popupProfile);

// createCard(listCards);
// const poupTest = new Popup(".popup_profile");
// poupTest.open();
// poupTest.setEventListeners();
// http://fdf


const userInfo = new UserInfo({selectorName: '.popup__input_field_name', selectorDescription: '.popup__input_field_description'});
// console.log (userInfo.getUserInfo());

// console.log(popupWithFormProfile)
const popupWithFormProfile = new PopupWithForm(".popup_profile", (data) => {userInfo.setUserInfo(data)});

// const popupWithFormImage = new PopupWithForm(".popup_image_add", validationValue);
// popupWithFormProfile.open();
popupWithFormProfile.setEventListeners();



// открытие окна профиля
  // inputName.textContent = profileName.textContent;
  // inputDescription.textContent = profileDescription.textContent;
buttonEdit.addEventListener("click", () => {
  // userInfo.setUserInfo('777', '999')
  // const userDataInputs = userInfo.setUserInfo(userInfo.getUserInfo());
  // console.log (userDataInputs);
  // popupWithFormProfile.setEventListeners();
  popupWithFormProfile.open();


  // getUserInfo(){

  // clearInput(popupProfile, formData.errorClass, formData.inputErrorClass);
  // profileValidator.clearInput(popupProfile);
  
  // openPopup(popupProfile);
  // profileValidator.resetValidation();
});








//---------------вариант с испрользованием поля name у формы----------------
//---------------интересный вариант тк name у каждой формы своё, нужно попробовать!----------
//---------------код рабочий--------------------

// Включение валидации
  // const formValidators = {};
  // const enableValidations = (validationValue) => {
  //   const formLists = Array.from(
  //     document.querySelectorAll(validationValue.formSelector)
  //   );
  //   formLists.forEach((formElement) => {
  //     const validator = new FormValidator(validationValue, formElement);
  //     // получаем данные из атрибута `name` у формы
  //     const formName = formElement.getAttribute("name");
  //     // вот тут в объект записываем под именем формы
  //     formValidators[formName] = validator;
  //     validator.enableValidation();
  //   });
  // };
  // enableValidations(validationValue);
  // console.log(formValidators['form-profile']);
  // console.log(formValidators['form-image']);

