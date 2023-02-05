// console.log('this is show');
// console.log(popup);


let buttonEdit = document.querySelector('.profile__button-edit');
let buttonAdd = document.querySelector('.profile__button-add');
let buttonClose = document.querySelector('.popup__close');
let buttonSave = document.querySelector('.popup__button-save');
let popup = document.querySelector('.popup');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__discription');
let inputName = document.querySelector('.popup__name');
let inputDiscription = document.querySelector('.popup__discription');





// profileButtonEdit.addEventListener('click', buttonEdit )
// function buttonEdit(){
//   popup.classList.add('popup_opened');
// }


buttonEdit.addEventListener('click', () => popup.classList.add('popup_opened') );
buttonClose.addEventListener('click', () => popup.classList.remove('popup_opened') );

console.log(inputName.value);