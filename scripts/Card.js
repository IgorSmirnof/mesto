export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElementNew = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElementNew;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._buttonLike = this._element.querySelector(".card__like");
    this._buttonDelete = this._element.querySelector(".card__basura");
    // console.log(this._buttonLike);
    this._setEventListeners();

    this._image.setAttribute("src", `${this._link}`);
    this._image.setAttribute("alt", `${this._name}`);
    this._element.querySelector(".card__place").textContent = `${this._name}`;
    return this._element;
  }

  // для лайков, удаления и клика по картинке - отдельные методы класса
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    this._buttonDelete.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("card__like_active");
  }
  _deleteCard() {
    this._element.remove();
  }
}


