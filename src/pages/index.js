import '../pages/index.css';
import { listCards } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";

import { buttonEdit, buttonAdd, validationValue } from "../utils/selectors.js";


const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
});



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
const userInfoPopup = new PopupWithForm(".popup_profile", {
  handlFormSubmit: (data) => {
    userInfo.setUserInfo(data);
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
  // imageAddValidator.disableButton();
});
newCardPopup.setEventListeners();

// const profileValidator = new FormValidator(validationValue, popupProfile);
// profileValidator.enableValidation();

// const imageAddValidator = new FormValidator(validationValue, imageAdd);
// imageAddValidator.enableValidation();

const formValidators = {}

// Включение валидации
const enableValidation = (validationValue) => {
  const formList = Array.from(document.querySelectorAll(validationValue.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationValue, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationValue);
formValidators['form-profile'].resetValidation()
formValidators['form-image'].resetValidation()
