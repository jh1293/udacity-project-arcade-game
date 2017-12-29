import Resources from './resources.js';

let resources = new Resources();

class Actor {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
    this.spriterImage = null;
  }

  get width() {
    return this.spriterImage.width;
  }

  get height() {
    return this.spriterImage.height;
  }

  get spriter() {
    return this.spriterImage;
  }

  set spriter(resURL) {
    this.spriterImage = resources.load(resURL);
  }

  update(delta) {

  }

  render(context) {
    context.drawImage(this.spriterImage, this.pos.x, this.pos.y, this.spriterImage.width, this.spriterImage.height);
  }
}

class Player extends Actor {
  constructor() {
    super();
    this.dest = {
      x: 0,
      y: 0
    };
    this.interval = 0.05
    this.isMoving = false;
  }

  update(delta) {
    if (this.pos.x <= 0) {
      this.dest.x = 1;
    }
    if (this.pos.x >= 502 - this.width) {
      this.dest.x = 502 - this.width - 1;
    }
    if (this.pos.y <= (-31)) {
      this.dest.y = (-30);
    }
    if (this.pos.y >= 652 - this.height) {
      this.dest.y = 652 - this.height - 30;
    }
    this.pos.x += (this.dest.x - this.pos.x) / this.interval * delta;
    this.pos.y += (this.dest.y - this.pos.y) / this.interval * delta;
  }

  events(evt) {
    if (this.isMoving != true) {
      switch (evt) {
        case "ArrowUp":
          this.dest.y = this.pos.y - 80;
          break;
        case "ArrowDown":
          this.dest.y = this.pos.y + 80;
          break;
        case "ArrowLeft":
          this.dest.x = this.pos.x - 100;
          break;
        case "ArrowRight":
          this.dest.x = this.pos.x + 100;
          break;
      }
      this.isMoving = true;
      setTimeout(() => {this.isMoving = false;}, this.interval * 4000);
    }
  }
}

class Enemy extends Actor {
  constructor() {
    super();
    this.v = 100;
    this.r = Math.floor(Math.random() * 5) + 1;
  }

  update(delta) {
    this.pos.x += this.v * this.r * delta;
    if (this.pos.x > 502) {
      this.pos.x = ((Math.random() * 3) + 1) * (-100);
      this.r = Math.floor(Math.random() * 5) + 1;
    }
  }
}

export { Actor, Player, Enemy };
