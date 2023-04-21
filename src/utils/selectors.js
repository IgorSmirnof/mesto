export { popupProfile, imageAdd, buttonEdit, buttonAdd } ; 
const body = document.querySelector(".body-root");
const profile = document.querySelector(".profile");
const popupProfile = document.querySelector(".popup_profile");
const imageAdd = body.querySelector(".popup_image_add");
const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonAdd = profile.querySelector(".profile__button-add");

export const validationValue = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const datas = {
  templateSelector: "card",
  imagePopupImage: '.image-popup__image',
  textPopupImage: '.image-popup__title',
};
