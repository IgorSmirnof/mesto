const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const elements = document.querySelector(".elements");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const buttonEdit = profile.querySelector(".profile__button-edit");
const formSend = popup.querySelector(".popup__container");
const buttonClose = popup.querySelector(".popup__close");
const inputName = popup.querySelector(".popup__input_name");
const inputDescription = popup.querySelector(".popup__input_description");

buttonEdit.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

buttonClose.addEventListener("click", () => popup.classList.remove("popup_opened"));

formSend.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove("popup_opened");
});

elements.addEventListener("click", function (event) {
  if (event.target.classList.contains("card__like")) {
    event.target.classList.toggle("card__like_active");
  }
});
