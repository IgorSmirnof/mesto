import "../pages/index.css";
import { apiConfig } from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupSubmit } from "../components/PopupSubmit.js";

import {
  buttonEdit,
  buttonAdd,
  validationValue,
  buttonAvatar,
} from "../utils/selectors.js";

let userCurrentId;
const api = new Api(apiConfig);
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, data]) => {
    userCurrentId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    cardlist.rendererItems(data, userCurrentId);
  })
  .catch((err) => console.log(err));

const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".avatar",
});

const createCard = (data, user) => {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: "#card",
    handleCardClick: () => {
      imagePopup.open(data);
    },

    handleDeleteCard: (cardID, cardElement) => {
      popupFormDelete.open(cardID, cardElement);
    },

    setLikeQty: (cardID) => {
      api
        .sendLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((err) => console.log(err));
    },
    setDislikeQty: (cardID) => {
      api
        .deleteLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((err) => console.log(err));
    },
  });

  return card.generateCard();
};

const cardlist = new Section(
  {
    renderer: (listCards, userId) => {
      cardlist.addItem(createCard(listCards, userId));
    },
  },
  ".cards"
);

// удаление карточки  ------------------------------------------------------------
const popupFormDelete = new PopupSubmit(".popup_delete", {
  handleSubmit: (id, card) => {
    popupFormDelete.renderPreloader(true, "Удаление ...");
    api
      .deleteCardApi(id)
      .then(() => {
        card.deleteCard();
        // console.log(id, card); //          <-------------<<
        popupFormDelete.close();
      })
      .catch((err) => console.log("error delete card :" + err))
      .finally(() => {
        popupFormDelete.renderPreloader(false);
      });
  },
});

// изм userInfo
const userInfoPopup = new PopupWithForm(".popup_profile", {
  handlFormSubmit: (data) => {
    // newCardPopup.renderPreloader(true, "Сохранение ...");
    return api
      .setUserInfoApi(data)    
      .then(() => userInfo.setUserInfo(data))   // *  <--------------<< 
      .catch((err) => console.log(err))
      .finally(() => newCardPopup.renderPreloader(false));
  },
});

//-----открытиe редактирования профиля
buttonEdit.addEventListener("click", () => {
  formValidators["form-profile"].resetValidation();
  userInfoPopup.setInputValues(userInfo.getUserInfo());
  userInfoPopup.open();
});

// ----добавлениe карточки--- popup_image_add
const newCardPopup = new PopupWithForm(".popup_image_add", {
  handlFormSubmit: ({ place, link }) => {
    // newCardPopup.renderPreloader(true, "Сохранение ...");

    return api
      .addNewCards({ name: place, link: link })
      .then((newCard) => {
        cardlist.addItemPrepend(createCard(newCard, userCurrentId));
      })
      .catch((err) => console.log("добавлениe карточки :", err))
      .finally(() => newCardPopup.renderPreloader(false));
  },
});

const imagePopup = new PopupWithImage(".popup_picture");

buttonAdd.addEventListener("click", () => {
  formValidators["form-image"].resetValidation();
  newCardPopup.open();
});

//-----открытиe редактировапния аватарки
const newAvatar = new PopupWithForm(".popup_avatar", {
  handlFormSubmit: (data) => {
    // newCardPopup.renderPreloader(true, "Сохранение ...");
    return api
      .setUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => console.log(err));
  },
});

buttonAvatar.addEventListener("click", () => {
  formValidators["form-avatar"].resetValidation();
  newAvatar.open();
});

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
popupFormDelete.setEventListeners();
newAvatar.setEventListeners();

const formValidators = {};

// Включение валидации
const enableValidation = (validationValue) => {
  const formList = Array.from(
    document.querySelectorAll(validationValue.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationValue, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationValue);
formValidators["form-profile"].resetValidation();
formValidators["form-image"].resetValidation();
formValidators["form-avatar"].resetValidation();
