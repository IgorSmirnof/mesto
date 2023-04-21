export class UserInfo{
  constructor({name, description}) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    console.log(this._name)
    console.log(this._description)
  }


  getUserInfo(){
    console.log (this._name.textContent, this._description.textContent)
    return { 
      name: this._name.textContent, 
      description: this._description.textContent
    };
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._description.textContent = data.description;
    // if (data.name) {
    //   this._name.textContent = this._data.name
    // }

    // if (data.about) {
    //   this._about.textContent = this._data.about
    // }
  }
}