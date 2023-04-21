export class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }  
  
  rendererItems(items) {
    items.forEach(item => {
      return this._renderer(item);
      // console.log (item);
    });
  }

  // без items в конструкторе :
  // renderItems(items) {
  //   items.forEach((item) => {
  //     return this._renderer(item)
  //   })
  // }

  addItem = (element) => {
    // console.log(element)
    this._container.prepend(element);  // в начало
  }
  
}
