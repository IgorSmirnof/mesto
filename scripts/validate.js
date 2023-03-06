const validationValue = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  button: ".popup__close",
};

console.log(validationValue.inputErrorClass);

const showInputError = (formElement, inputElement, errorMessage, initialData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  addClassEl(inputElement, initialData.inputErrorClass);
  errorElement.textContent = errorMessage;
  addClassEl(errorElement, initialData.errorClass);
};

const hideInputError = (formElement, inputElement, initialData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  removeClassEl(inputElement, initialData.inputErrorClass);
  removeClassEl(errorElement, initialData.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationValue);
  } else {
    hideInputError(formElement, inputElement, validationValue);
  }
};

const setEventListeners = (formElement, initialData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(initialData.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    initialData.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationValue);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationValue);
    });
  });
};

function enableValidation(initialData) {
  const formList = Array.from(
    document.querySelectorAll(initialData.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationValue);
  });
}

enableValidation(validationValue);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, initialData) {
  if (hasInvalidInput(inputList)) {
    addClassEl(buttonElement, initialData.inactiveButtonClass);
  } else {
    removeClassEl(buttonElement, initialData.inactiveButtonClass);
  }
}

function removeClassEl(el, classEl) {
  el.classList.remove(classEl);
}
function addClassEl(el, classEl) {
  el.classList.add(classEl);
}

//-------очистка ошибок при закрытии попапа через Х------

// const button = document.querySelectorAll(validationValue.button);
// button.forEach((el) => el.addEventListener("click", clearInputs));

// // -------очистка ошибок при закрытии попапа через click out zone ----
// const popup = document.querySelectorAll(".popup");
// popup.forEach(function (el) {
//   document.addEventListener("click", (e) => {
//     if (e.target == el) {
//       clearInputs();
//     }
//   });
// });

// // -------очистка ошибок при закрытии попапа через Esc--------
// document.addEventListener("keydown", function (e) {
//   if (e.key == "Escape") {
//     clearInputs();
//   }
// });

// // фунция очистки ошибки при выходе из формы не через батон-сабмит
// function clearInputs() {
//   const errorScreen = Array.from(
//     document.getElementsByClassName(validationValue.errorClass)
//   );
//   errorScreen.forEach((el) => (el.innerHTML = ""));
//   const errorInputLine = Array.from(
//     document.getElementsByClassName(validationValue.inputErrorClass)
//   );
//   errorInputLine.forEach((el) =>
//     el.classList.remove(validationValue.inputErrorClass)
//   );
// }


// export {clearInput};
// //----------------поправить классы в функции-----
// function clearInput(errorClass, inputErrorClass) {
//   const errorClass1 = document.getElementsByClassName(errorClass);
//   errorClass1.innerHTML = "";
//   errorClass1.classList.remove(inputErrorClass);
//   // errorClass "form__input-error_active" пр ошибке по
//   // inputErrorClass "form__input_type_error"  при ошибке в инпуте красн
// }
