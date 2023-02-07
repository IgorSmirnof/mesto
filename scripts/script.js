// console.log('js must go on');

const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const like = document.querySelectorAll(".card__like");

const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const inputData = popup.querySelectorAll(".popup__input");
const formSend = popup.querySelector(".popup__container");

const buttonEdit = profile.querySelector(".profile__button-edit");
const buttonClose = popup.querySelector(".popup__close");
const buttonSave = popup.querySelector(".popup__button-save");
const buttonAdd = profile.querySelector(".profile__button-add");

inputData[0].value = profileName.textContent;
inputData[1].value = profileDescription.textContent;

buttonEdit.addEventListener("click", () => popup.classList.add("popup_opened"));
buttonClose.addEventListener("click", () =>
  popup.classList.remove("popup_opened")
);

formSend.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputData[0].value;
  profileDescription.textContent = inputData[1].value;
  popup.classList.remove("popup_opened");
});

const elements = document.querySelector(".elements");
elements.addEventListener("click", function (event) {
  if (event.target.classList[0] == "card__like") {
    event.target.classList.toggle("card__like_active");
  }
});
