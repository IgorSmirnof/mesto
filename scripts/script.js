// console.log('js must go on');

let buttonEdit = document.querySelector(".profile__button-edit");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__name");
let profileDiscription = document.querySelector(".profile__discription");
let inputName = document.querySelector(".popup__name");
let inputDiscription = document.querySelector(".popup__discription");
let formSend = document.querySelector(".popup__container");

let buttonClose = document.querySelector(".popup__close");
let buttonSave = document.querySelector(".popup__button-save");
let like = document.querySelectorAll(".card__like");
let buttonAdd = document.querySelector(".profile__button-add");

buttonEdit.addEventListener("click", () => popup.classList.add("popup_opened"));
buttonClose.addEventListener("click", () =>
  popup.classList.remove("popup_opened")
);
formSend.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDiscription.textContent = inputDiscription.value;
  popup.classList.remove("popup_opened");
});

let elements = document.querySelector(".elements");

elements.addEventListener("click", function (event) {
  if (event.target.classList[0] == "card__like") {
    event.target.classList.toggle("card__like_active");
  }
});
