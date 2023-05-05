import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handlFormSubmit }) {
    super(popupSelector);
    this._handlFormSubmit = handlFormSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._buttonSubmit = this._popup.querySelector(".popup__button-save");
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  // --наполнениe формы input переданными данными
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._form.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     this._handlFormSubmit(this._getInputValues());
  //     this.close();
  //   });
  // }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", () => {
      const initialText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = "Сохранение ...";
      this._handlFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._buttonSubmit.textContent = initialText;
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  // Preloader //  .renderPreloader(true/false, 'Удаление ...');
  renderPreloader(isLoading, displayText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    }
    // else {
    //   this._buttonSubmit.textContent = this.defaulText;
    // }
  }
}
