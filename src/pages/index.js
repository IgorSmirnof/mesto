import '../pages/index.css';
import { listCards, apiConfig } from "../utils/constants.js";
import { Api } from '../components/Api.js';
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";

import { buttonEdit, buttonAdd, validationValue, popupAvatar, buttonAvatar } from "../utils/selectors.js";

let userCurrentId;
const api = new Api(apiConfig);
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, data]) => {
      userCurrentId = user._id;
      console.log(user._id,data);
      userInfo.setUserInfo(user);
      userInfo.setUserAvatar(user);
      cardlist.rendererItems(data);
        }
      )
  .catch(
    (err) => console.log(err)
  );



// api.setUserInfoApi({ name:'CruchkInn', description: 'profiThrolle'})

//---------------test---------------------------
// api.deleteCardApi("6447fc88ab8188008587157b")
// api.sendLike("64478bdd2e0f4800274ee9d0");

const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".avatar"
});



const createCard = (data) => {
  const card = new Card({
    data: data, templateSelector: "#card",
    handleCardClick: () => imagePopup.open(data),   
    setLikeQty: () => api.sendLike(data._id),  
    
    setDislikeQty: () => api.setDislikeQty(data._id), 
    // deleteCard: () => api.deleteLike(data._id), 
    // .then((res) => console.log(res))
  });
  // console.log(data._id)    console.log(data)

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
  formValidators["form-profile"].resetValidation();
});

// ----добавлениe карточки--- popup_image_add
const newCardPopup = new PopupWithForm(".popup_image_add", {
  handlFormSubmit: ({ place, link }) => {
    // cardlist.addItem(createCard({ name: place, link: link }));
    api.addNewCards({name: place, link: link})
  },
});


const imagePopup = new PopupWithImage(".popup_picture");

buttonAdd.addEventListener("click", () => {
  formValidators["form-image"].resetValidation();
  newCardPopup.open();
  // imageAddValidator.disableButton();
});



//-----открытиe редактировапния аватарки
const newAvatar = new PopupWithForm(".popup_avatar", {
  handlFormSubmit: (data) => {
    api.setUserAvatar(data)
      .then((data) => { 
        userInfo.setUserAvatar(data);
        newAvatar.close();
      }
    )
  },
});

buttonAvatar.addEventListener("click", () => {
  formValidators["form-avatar"].resetValidation();
  newAvatar.open();
});


imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
newAvatar.setEventListeners();

// buttonEdit.addEventListener("click", () => {
//   userInfoPopup.setInputValues(userInfo.getUserInfo());
//   userInfoPopup.open();
//   formValidators["form-avatar"].resetValidation();
// });

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
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationValue);
formValidators['form-profile'].resetValidation()
formValidators['form-image'].resetValidation()
formValidators['form-avatar'].resetValidation()
