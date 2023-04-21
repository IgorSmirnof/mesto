import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handlFormSubmit }) {
    super(popupSelector);
    this._handlFormSubmit = handlFormSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputValues = Array.from( this._form.querySelectorAll(".popup__input"));
    this._formNew = Array.from(this._form.querySelectorAll(".popup__input"))
  }

  _getInputValues() {
    this._values = {};
    this._inputValues.forEach((input) => {
      this._values[input.name] = input.value;
      console.log(input.name);
    });
    console.log(this._values);
    return this._values;
  }

  // --наполнениe формы input переданными данными .bind(this)
  setInputValues = (data) => {
    this._inputValues.forEach((input, index) => {
      input.value = Object.values(data)[index];
    });
    


  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlFormSubmit(this._getInputValues());
      this.close();
    });
  }

  _close() {
    super.close();
    this._form.reset();
  }
}

// getInputValues:
// - взять инпуты из DOM
// - создать новый пустой объект values
// - пройтись по всем инпутам DOM и положить в values значения инпутов (value) по ключам name
// - вернуть объект values

// Потом нужно в setEventListeners в слушателе submit передать эти inputValues как аргументы для колбэка
