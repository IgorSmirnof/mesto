// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');


formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

// Слушатель события input
formInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода, 
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
}); 