//import { apiConfig } from "../utils/constants.js";
export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers["authorization"];
  }
  // получить данные с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        // console.log(result[17].likes.length);
        // console.log(result);
        return result;
      });
  }

  // другие методы работы с API

  // 3. Редактирование профиля:

  //передать данные пользователя на сервер
  setUserInfoApi( data ) {
    fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: data.name,
        about: data.description,
      }),
    })
  }

  //получить данные пользователя с сервера
   getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then(res => this._checkResponse(res))
  }


  // .then((user) => { return user.json() }).then(((info) => { return console.log(info) }))
    // .then(((info) => { return console.log(info)}))

  //получить данные пользователя на сервер

  //добавление новой карточки на сервер
  addNewCards(data) {
    fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },body: JSON.stringify({ 
        name: data.name,
        link: data.link,
      }),
    })
  }


  //удаление карточки с сервера

  //передача лайка на сервер
  sendLike(dataId) {
    fetch(`${this._url}/cards/${dataId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    })
  }
  //удаление лайка на сервере
  deleteLike(dataId) {
    fetch(`${this._url}/cards/${dataId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
  }

  deleteCardApi(dataId) {
    fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
  }

  //------- смена автарки ------------
  setUserAvatar( data ) {
    fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        avatar: data.avatar
      }),
    })
  }
  //---------проверка /вывод ошибки----------
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Пердоньте Монсеньёр, темпранилья теплая! Ошибка: ${res.status}`);
  }
}

