class FormValidator {
  constructor(value, formElement){
    this._value = value;
    this._formSelector = value.formSelector;
    this._inputSelector = value.inputSelector;
    this._submitButtonSelector = value.submitButtonSelector;
    this._inactiveButtonClass = value.inactiveButtonClass;
    this._inputErrorClass = value.inputErrorClass;
    this._errorClass = value.errorClass;
    this._formElement = formElement;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this._addClassEl(inputElement, this._inputErrorClass);
    errorElement.textContent = errorMessage;
    this._addClassEl(errorElement, this._errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this._removeClassEl(inputElement, this._inputErrorClass);
    this._removeClassEl(errorElement, this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, this._value );
    } else {
      this._hideInputError(formElement, inputElement, this._value);
    }
  };


  _setEventListeners = (formElement) => {
    const inputList = Array.from( formElement.querySelectorAll(this._inputSelector) );
    // console.log(inputList);
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement, this._value);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement, this._value);
      });
    });
  };



  enableValidation() {
    const formList = Array.from( document.querySelectorAll(this._formSelector));
      // console.log(this._formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, this._Value);
    });
    // console.log('end of fornVal');
  }



_hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._addClassEl(buttonElement, this._inactiveButtonClass);
    } else {
      this._removeClassEl(buttonElement, this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  _removeClassEl(el, classEl) {
    el.classList.remove(classEl);
  }
  _addClassEl(el, classEl) {
    el.classList.add(classEl);
  }
  

// фунция очистки ошибки при выходе из формы не через батон-сабмит
clearInput(elPopup) {
  const errorInputLine = Array.from(
    elPopup.getElementsByClassName(this._inputErrorClass)
  );

  errorInputLine.forEach((el) => {
    el.form.reset();
    el.classList.remove(this._inputErrorClass);
  });

  const errorInputSubline = Array.from(
    elPopup.getElementsByClassName(this._errorClass)
  );
  errorInputSubline.forEach((el) => (el.textContent = ""));
}

addButtonInactive() {
  const popupButtonSave = this._formElement.querySelector(this._submitButtonSelector);
  console.log('popupButtonSave ', popupButtonSave);
  popupButtonSave.classList.add(this._inactiveButtonClass);
  popupButtonSave.disabled = true;
}

}

export {FormValidator};