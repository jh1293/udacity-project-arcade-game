import Resources from './resources.js';

let resources = new Resources();

class GUI {
  constructor(posX, posY, width, height, className, id) {
    this.element = document.createElement('div');
    this.element.className = className;
    this.element.id = id;
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.style.position = 'absolute';
    this.element.style.visibility = 'hidden';
  }

  appendTo(id) {
    document.getElementById(id).appendChild(this.element)
  }

  hide(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `fadeout ${duration}s forwards`;
      setTimeout(() => {
        this.element.style.visibility = 'hidden';
      }, duration * 1000)
    }, delay * 1000);
  }

  show(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.visibility = 'visible';
      this.element.style.animation = `fadein ${duration}s forwards`;
    }, delay * 1000);

  }

  focus(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `focus ${duration}s forwards`;
    }, delay * 1000);
  }

  unfocus(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `unfocus ${duration}s forwards`;
    }, delay * 1000);
  }
}

class Viewport extends GUI {
  constructor(width, height, className, id) {
    super(null, null, width, height, className, id);
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
  }
}

class Canvas extends GUI {
  constructor(width, height, className, id) {
    super(null, null, width, height, className, id);
    this.element = document.createElement('canvas');
    this.element.width = width;
    this.element.height = height;
    this.element.innerHTML = 'It seems like your browser doesn\'t support HTML5.';
    this.element.style.position = 'absolute';
    this.element.style.zIndex = 0;
    this.element.style.visibility = 'hidden';
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }

  get context() {
    return this.element.getContext('2d');
  }
}

class Panel extends GUI {
  constructor(posX, posY, width, height, className, id) {
    super(posX, posY, width, height, className, id);
    this.element.style.zIndex = 100;
  }
}

class Button extends GUI {
  constructor(posX, posY, width, height, className, id, value) {
    super(posX, posY, width, height, className, id);
    this.element = document.createElement('button');
    this.element.className = className;
    this.element.id = id;
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.style.position = 'absolute';
    this.element.innerHTML = value;
    this.element.style.visibility = 'hidden';
  }
}

class Sprite extends GUI {
  constructor(posX, posY, width, height, className, id, src) {
    super(posX, posY, width, height, className, id);
    this.element = resources.load(src);
    this.element.className = className;
    this.element.id = id;
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.style.position = 'absolute';
  }
}

class Textbox extends GUI {
  constructor(posX, posY, width, height, className, id) {
    super(posX, posY, width, height, className, id);
    this.element.innerHTML = 'Choose Your Character';
  }

  text(text) {
    this.element.innerHTML = text;
  }
}

export { GUI, Viewport, Canvas, Panel, Button, Sprite, Textbox };
