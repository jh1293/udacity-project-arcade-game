import Resources from './resources.js';

let resources = new Resources();

class Actor {
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
    this.spriterImage = null;
    this.collision = {
      center: {
        x: 0,
        y: 0
      },
      radius: 0
    };
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
    this.interval = 0.05;
    this.isMoving = false;
  }

  update(delta) {



    // Handle input event
    if (this.isMoving != true) {
      switch (window.shared.events.key) {
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
      window.shared.events.key = null;
      this.isMoving = true;
      setTimeout(() => {this.isMoving = false;}, this.interval * 4000);
    }


    // Moveable area restriction
    // '10' at the end of each expression is a tolerance value.
    if (this.dest.x < 0 - 10) {
      this.dest.x = this.pos.x;
    }
    if (this.dest.x > 500 - this.width + 10) {
      this.dest.x = this.pos.x;
    }
    if (this.dest.y < (-30) - 10) {
      this.dest.y = this.pos.y;
    }
    if (this.dest.y > 650 - this.height + 10) {
      this.dest.y = this.pos.y;
    }



    // Condition to win
    if (this.pos.y < -28) {
      window.shared.events.game = 'win';
    }

    // if (window.shared.events.game === 'lose') {
    //   this.pos.x = this.dest.x = 200;
    //   this.pos.y = this.dest.y = 450;
    // }

    if (window.shared.events.game) {
      this.pos.x = this.dest.x = 200;
      this.pos.y = this.dest.y = 450;
    }

    // Update position
    this.pos.x += (this.dest.x - this.pos.x) / this.interval * delta;
    this.pos.y += (this.dest.y - this.pos.y) / this.interval * delta;
  }

  event() {
    
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
