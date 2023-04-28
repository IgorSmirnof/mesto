// import { Popup } from "./Popup";
export class Card {
  constructor({ data, userId, templateSelector, handleCardClick, setLikeQty, setDislikeQty, handleDeleteCard }) {
    this._templateSelector = templateSelector; // селекор клише
    this._data = data; //  данныe о карточке
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick; // callback открытия попап с картинкой
    this._likeQty = data.likes.length;
    this._cardId = data._id;
    this.setLikeQty = setLikeQty;
    this.setDislikeQty = setDislikeQty;
    this.handleDeleteCard = handleDeleteCard;
    this.cardId = data._id;
    this._userIdOwner = data.owner._id;
    this.userId =  userId;
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
    this._place = this._element.querySelector(".card__place");
    this._image = this._element.querySelector(".card__image");
    this._buttonLike = this._element.querySelector(".card__like");
    this._buttonDelete = this._element.querySelector(".card__basura");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._place.textContent = this._name;

    this._setEventListeners();

    // устанавливаю лайки карточкам:
    this._element.querySelector(".card__like-qty").innerText = this._likeQty;

    // проверить моя ли карточка - нет -> удалить корзину
    if (this.userId !== this._userIdOwner) {
      // console.log(this.userId, this._userIdOwner)
      this._buttonDelete.remove();
    }
    return this._element;
  }

  // для лайков, удаления и клика по картинке - отдельные методы класса
  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    // this._buttonDelete.addEventListener("click", () => this._deleteCard());
    this._buttonDelete.addEventListener("click", () => this.handleDeleteCard(this, this.cardId));
    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  likedMyCard() {
    return this._dataLikes.some(like => like._id === this._userId)
  };
  renderLikes() {
    
  }
  _toggleLike() {
    this._buttonLike.classList.toggle("card__like_active");
    console.log(this._cardId);
    // if (likedMyCard) {
    //   this.setLikeQty(this._cardId);
    // } else {
    //   this.setDislikeQty(this._cardId);
    // }
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // setLikeQty() {
    
  // }
}
