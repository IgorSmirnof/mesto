const validationValue = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  initialData
) => {
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
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationValue
    );
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
    buttonElement.disabled = false;
  }
}

function removeClassEl(el, classEl) {
  el.classList.remove(classEl);
}
function addClassEl(el, classEl) {
  el.classList.add(classEl);
}
