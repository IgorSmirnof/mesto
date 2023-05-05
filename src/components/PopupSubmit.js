import { Popup } from "./Popup.js";

export class PopupSubmit extends Popup {
  constructor(selectorPopup, { handleSubmit }) {
    super(selectorPopup);
    this._handleSubmit = handleSubmit;
    this._buttonSubmit = this._popup.querySelector(".popup__button-save");
  }

  // открытия Popup и получения данных о карточке
  open(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  // Preloader //  .renderPreloader(true/false, 'Удаление ...');
  renderPreloader(isLoading, displayText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    } else {
      this._buttonSubmit.textContent = this.defaulText;
    }
  }

  // ждатель клика
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", () => {
      // console.log('ждатель клика ', this.card);
      this._handleSubmit(this.id, this.card);
    });
  }
}

