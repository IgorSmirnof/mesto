export class Card{
  constructor(data, templateSelector, handleCardClick){
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElementNew = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    this._image = cardElementNew.querySelector('.card__image');
    this._buttonLike = cardElementNew.querySelector('.card__like');
    this._buttonDelete = cardElementNew.querySelector('.card__basura');

    return cardElementNew;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._image.setAttribute('src', `${this._link}`);
    this._image.setAttribute('alt', `${this._name}`);
    this._element.querySelector('.card__place').textContent = `${this._name}`;

    return this._element;
  }
  _setEventListeners () {
    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle("card__like_active")
    })
    this._buttonDelete.addEventListener('click', () => {
      this._element.remove()
    })
    this._image.addEventListener('click', () => {
      
    // console.log(this)
      this._handleCardClick(this._name, this._link)
    });
  }
  // _handleCardClick() {
  //   this._image.setAttribute('src', `${this._link}`);
  //   this._image.setAttribute('alt', `${this._name}`);
  //   this._element.textContent = `${this._name}`;
  //   console.log(this)
    // openPopup(this._image);
  // }

}


