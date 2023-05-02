// import { Popup } from "./Popup";
export class Card {
  constructor({
    data,
    userId,
    templateSelector,
    handleCardClick,
    setLikeQty,
    setDislikeQty,
    handleDeleteCard,
  }) {
    this._templateSelector = templateSelector; // селекор клише
    this._data = data; //  данныe о карточке
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick; // callback открытия попап с картинкой
    this._likes = data.likes;
    this._likeQty = data.likes.length;
    this._cardId = data._id;
    this.setLikeQty = setLikeQty;
    this.setDislikeQty = setDislikeQty;
    this._handleDeleteCard = handleDeleteCard;
    this._userIdOwner = data.owner._id;
    this.userId = userId;
  }

  _getTemplate() {
    const cardElementNew = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElementNew;
  }

  generateCard() {
    this.element = this._getTemplate();
    this._place = this.element.querySelector(".card__place");
    this._image = this.element.querySelector(".card__image");
    this._buttonLike = this.element.querySelector(".card__like");
    this._buttonDelete = this.element.querySelector(".card__basura");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._place.textContent = this._name;
    this._elementCardLikeQty = this.element.querySelector(".card__like-qty");
    this.renderLikes(this._data);
    this._setEventListeners();

    // устанавливаю лайки карточкам:
    this._elementCardLikeQty.innerText = this._likeQty;

    // проверить моя ли карточка - нет -> удалить корзину
    if (this.userId !== this._userIdOwner) {
      this._buttonDelete.remove();
    }
    return this.element;
  }

  // для лайков, удаления и клика по картинке - отдельные методы класса
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    // this._buttonDelete.addEventListener("click", () => this._deleteCard());
    this._buttonDelete.addEventListener("click", () =>
      this._handleDeleteCard(this, this._cardId)
    );
    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  //мои лайки
  isMylikeCard() {
    let myLikes = this._likes.some((elem) => elem._id === this.userId);
    return myLikes;
  }

  renderLikes() {
    if (this._likeQty === 0) {
      this._elementCardLikeQty.textContent = "0";
    } else {
      this._elementCardLikeQty.textContent = this._likeQty;
    }
    if (this.isMylikeCard()) {
      this._buttonLike.classList.add("card__like_active");
    } else {
      this._buttonLike.classList.remove("card__like_active");
    }
  }



  _toggleLike() {
    // this._buttonLike.classList.toggle("card__like_active");
    if (this.isMylikeCard()) {
      this.setDislikeQty(this._cardId);
    } else {
      this.setLikeQty(this._cardId);
    }
  }
  deleteCard() {
    this.element.remove();
    this.element = null;
  }
}
