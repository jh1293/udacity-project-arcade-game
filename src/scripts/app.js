/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Resources {
  constructor() {
    this.resPool = {};
  }

  load(resURL) {
    let thisArg = this;
    let resURLArray = resURL.split('.');
    let type = resURLArray[resURLArray.length - 1];
    if (thisArg.resPool[resURL]) {
      /**
       * If current requested resource already exists in resource pool, return it.
       */
      return thisArg.resPool[resURL];
    } else {

      if (type === 'png') {
        /**
         * If current requested resource does not exists in resource pool, create new one and return it, then add it to the resource pool for caching.
         */
        let image = new Image();
        image.src = resURL;
        image.onload = function() {
          thisArg.resPool[resURL] = image;
        };
        return image;
      }

      if (type === 'wav') {
        let audio = new Audio();
        audio.src = resURL;
        audio.onload = function() {
          thisArg.resPool[resURL] = audio;
        }
        return audio;
      }

    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Resources;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

class Audio {
  constructor() {
    this.effectsPool = {};
  }

  get effects() {
    return this.effectsPool;
  }

  set effects(effects) {
    effects.forEach((value) => {
      this.effectsPool[value] = resources.load(value);
    });
  }

  play(audio) {
    this.effectsPool[audio].play();
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Audio;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Engine {
  constructor() {
    this.target = null;
    this.stamp = 0;
    this.delta = 0;
    this.frames = 0;
    this.state = null;
    this.gameMode = '';
  }

  bind(context) {
    this.target = context;
  }

  get fps() {
    return this.delta === 0 ? 0: Math.trunc(1 / this.delta);
  }

  run() {
    // Initialization was seperated from main loop, which will only be called once.
    this.init();
    function loop(stamp) {
      this.delta = (stamp - this.stamp) / 1000;
      this.stamp = stamp;
      /**
       * Divide the main loop into two seperated states.
       * With state 100, main loop runs as normal.
       * With state null, delta calculation runs as normal, while update and render process were been suspended.
       * This way, main loop can be controlled at will.
       */
      if (this.state === 100) {
          this.frames++;
          this.update(this.delta);
          this.cleanup(this.target);
          this.render(this.target);
      }
      this.loopID = window.requestAnimationFrame(loop.bind(this));
    }
    loop.call(this);
    /**
     * The engine started with the state of paused, it will switch to normal state after 1000ms.
     * Within the 1000ms, delta time will continue to be calculated, while update and render process were suspended.
     * The purpose of doing this is the make sure all update and render process were under stable delta time.
     */
    setTimeout(() => {this.state = 100}, 1000);
  }

  collisionCheck(subject, ...object) {
    let dx, dy, distance, diff_radius;
    object.forEach((value) => {
      dx = subject.collision.center.x - value.collision.center.x;
      dy = subject.collision.center.y - value.collision.center.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      diff_radius = subject.collision.radius + value.collision.radius;
      if (Number(distance) < Number(diff_radius)) {
        let event = new CustomEvent('break', {detail: 'collide'});
        document.dispatchEvent(event);
      }
    });
  }

  resume() {
    this.state = 100;
  }

  pause() {
    this.state = null;
  }

  stop() {
    window.cancelAnimationFrame(this.loopID);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Engine;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Actor", function() { return Actor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Enemy", function() { return Enemy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

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
      let event = new CustomEvent('break', {detail: 'reach'});
      document.dispatchEvent(event);
    }

    // if (window.shared.events.game === 'lose') {
    //   this.pos.x = this.dest.x = 200;
    //   this.pos.y = this.dest.y = 450;
    // }

    // if (window.shared.events.game) {
    //   this.pos.x = this.dest.x = 200;
    //   this.pos.y = this.dest.y = 450;
    // }

    // Update position
    this.pos.x += (this.dest.x - this.pos.x) / this.interval * delta;
    this.pos.y += (this.dest.y - this.pos.y) / this.interval * delta;
  }

  react(event) {
    // Handle input event
    if (this.isMoving != true) {
      switch (event.key) {
        case 'Up':
        case 'ArrowUp':
          this.dest.y = this.pos.y - 80;
          break;
        case 'Down':
        case 'ArrowDown':
          this.dest.y = this.pos.y + 80;
          break;
        case 'Left':
        case 'ArrowLeft':
          this.dest.x = this.pos.x - 100;
          break;
        case 'Right':
        case 'ArrowRight':
          this.dest.x = this.pos.x + 100;
          break;
      }
      this.isMoving = true;
      setTimeout(() => {this.isMoving = false;}, this.interval * 4000);
    }

    switch (event.detail) {
      case 'collide':
        this.pos.x = this.dest.x = 200;
        this.pos.y = this.dest.y = 450;
        break;
      case 'reach':
        this.pos.x = this.dest.x = 200;
        this.pos.y = this.dest.y = 450;
        break;
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




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUI", function() { return GUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewport", function() { return Viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Panel", function() { return Panel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return Sprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Textbox", function() { return Textbox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

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




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

class Map {
  constructor() {
    this.displayList = {};
  }

  get tileSet() {
    return this.displayList;
  }

  set tileSet(tileSet) {
    let thisArg = this;
    let request = new XMLHttpRequest();
    request.open('GET', tileSet);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
      let _tileSet = request.response;
      for(let index in _tileSet) {
        thisArg.displayList[index] = {};
        thisArg.displayList[index].image = resources.load(_tileSet[index].src);
        thisArg.displayList[index].cor = _tileSet[index].cor;
      }
    }
  }

  render(context) {
    for (let index in this.displayList) {
      let image = this.displayList[index].image;
      this.displayList[index].cor.forEach((value) => {
        context.drawImage(image, value[0] * 100, value[1] * 80, image.width, image.height);
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Map;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(7);
__webpack_require__(4);
__webpack_require__(8);
__webpack_require__(5);
module.exports = __webpack_require__(0);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__gui_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_js__ = __webpack_require__(5);



// import Input from './input.js';




/**
 * Instantiating area.
 */
let engine = new __WEBPACK_IMPORTED_MODULE_0__engine_js__["default"]();  // Game engine
let viewport = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Viewport"](500, 650, 'viewport', 'viewport');  // Viewport
let canvas = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Canvas"](500, 650, 'canvas', 'canvas');  // canvas
let panel = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Panel"](50, 100, 400, 450, 'panel', 'panel');
let btnStart = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Button"](140, 350, 120, 50, 'btn btn__control--color-green', 'btn-start', 'Start');
let btnPause = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Button"](10, 10, 80, 30, 'btn btn__control--color-orange', 'btn-pause', 'Pause');
let optChar1 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](30, 0, 101, 170, 'sprite__char', 'char-1', './images/char-boy.png');
let optChar2 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](150, 0, 101, 170, 'sprite__char', 'char-2', './images/char-cat-girl.png');
let optChar3 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](270, 0, 101, 170, 'sprite__char', 'char-3', './images/char-horn-girl.png');
let optChar4 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](90, 120, 101, 170, 'sprite__char', 'char-4', './images/char-pink-girl.png');
let optChar5 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](210, 120, 101, 170, 'sprite__char', 'char-5', './images/char-princess-girl.png');
let panelMsg = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Textbox"](0, 300, 400, 50, 'panel__msg', 'msg');
let audio = new __WEBPACK_IMPORTED_MODULE_3__audio_js__["default"]();  // Sound system
let player = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Player"]();  // Player entity
let enemies = [];
for (let i = 0; i < 8; i++) {
  let enemy = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Enemy"]();  // Enemy entities
  enemies.push(enemy);
}
let map = new __WEBPACK_IMPORTED_MODULE_5__map_js__["default"]();  // Map

/**
 * Global variables.
 */
let playerCharacter = null;

/**
 * Building scene tree.
 * Being the first step of all creations.
 */
viewport.appendTo('game');
canvas.appendTo('viewport');

/**
 * Bind engine to the canvas.
 */
engine.bind(canvas.context);

/**
 * All the initialization works should be done within this function.
 * The game engine will only call this function one time brfore main loop starts.
 */
engine.init = function() {

  audio.effects = [
    './audio/hit1.wav',
    './audio/hit2.wav',
    './audio/win1.wav',
    './audio/win2.wav',
    './audio/win3.wav',
    './audio/win4.wav'
  ];

  player.spriter = playerCharacter || './images/char-boy.png';
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 450;

  enemies.forEach((value, index) => {
    value.spriter = './images/enemy-bug.png';
    value.pos.x = ((Math.random() * 3) + 1) * (-200);  // Keep cars away as the game starts
    if (index % 4 === 0) {  // For each line of stone, there are two cars running
      enemies[index].pos.y = 50;
      enemies[index + 1].pos.y = 130;
      enemies[index + 2].pos.y = 290;
      enemies[index + 3].pos.y = 370;
    }
  });

  map.tileSet = './images/map.json';
};

/**
 * The first part of main loop.
 * This function handles math related stuff, such as update entities, collision check.
 */
engine.update = function(delta) {

  document.getElementById('m-dt').innerHTML = delta.toFixed(4);
  document.getElementById('m-frame').innerHTML = this.frames;
  document.getElementById('m-fps').innerHTML = this.fps;

  player.collision = {
        center: {
          x: player.pos.x + 50,
          y: player.pos.y + 100
        },
        radius: 36
      };
  player.update(delta);

  enemies.forEach((value) => {
    value.collision = {
          center: {
            x: value.pos.x + 75,
            y: value.pos.y + 100
          },
          radius: 20
        };
    value.update(delta);
  });

  engine.collisionCheck(player, ...enemies);
};

/**
 * The second part of main loop.
 * Clean up entire canvas before actually drawing this frame.
 */
engine.cleanup = function(target) {
  target.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * The third part of main loop.
 * Invoke .render() method of all instances.
 */
engine.render = function(target) {

  map.render(target);

  enemies.forEach((value) => {
    value.render(target);
  });
  player.render(target);
};



/**
 * Handling events.
 */

 // Document ready.
(() => {
  engine.run();

  viewport.show(0.5);
  canvas.show(1, 1);

  panel.appendTo('viewport');
  btnPause.appendTo('viewport')
  btnStart.appendTo('panel');
  optChar1.appendTo('panel');
  optChar2.appendTo('panel');
  optChar3.appendTo('panel');
  optChar4.appendTo('panel');
  optChar5.appendTo('panel');
  panelMsg.appendTo('panel');

  // Hide player character before game start.
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 650;

  setTimeout(() => {
    canvas.unfocus(0.5);
    panel.show(0.5, 0.5);
    panelMsg.show(0.5, 1);
    btnStart.show(0.5, 1.5);
  }, 4000);
})();

// Character choose
let elemChars = document.getElementsByClassName('sprite__char');
for (let i = 0; i < elemChars.length; i++) {
  elemChars[i].addEventListener('click', (event) => {
    let strArray = String(event.target.src).split('/');
    let fileName = strArray[strArray.length - 1];
    let msg;
    playerCharacter = `./images/${fileName}`;
    switch (fileName) {
      case 'char-boy.png':
        msg = 'You\'ve chosen Boy!';
        break;
      case 'char-cat-girl.png':
        msg = 'You\'ve chosen Cat Girl!';
        break;
      case 'char-horn-girl.png':
        msg = 'You\'ve chosen Horn Girl!';
        break;
      case 'char-pink-girl.png':
        msg = 'You\'ve chosen Pink Girl!';
        break;
      case 'char-princess-girl.png':
        msg = 'You\'ve chosen Princess Girl!';
        break;
    }
    panelMsg.text(msg);
  });
}

document.getElementById('btn-start').addEventListener('click', (event) => {
  engine.init();
  panel.hide(0.5);
  canvas.focus(0.5, 0.5);
  btnPause.show(0.5, 0.5)
  engine.resume();
  event.preventDefault();
});

document.getElementById('btn-pause').addEventListener('click', (event) => {
  if (engine.state) {
    engine.pause();
  } else {
    engine.resume();
  }

  event.preventDefault();
});


document.addEventListener('keydown', (event) => {
  player.react(event);
});

document.addEventListener('break', (event) => {
  player.react(event);
  switch(event.detail) {
    case 'reach':
      engine.pause();
      canvas.unfocus(0.5);
      panel.show(0.5, 0.5);
      btnPause.hide(0.1);
      audio.play(`./audio/win${Math.floor(Math.random() * 4) + 1}.wav`);
      break;
    case 'collide':
      audio.play(`./audio/hit${Math.floor(Math.random() * 2) + 1}.wav`);
  }
});



// setTimeout(() => {engine.pause()}, 4000);
// setTimeout(() => {engine.pause()}, 2000);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Input {
  constructor() {

  }

  listen() {
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case "ArrowUp":
          console.log('up');
          break;
        case "ArrowDown":
          break;
        case "ArrowLeft":
          break;
        case "ArrowRight":
          break;
      }
      event.preventDefault();
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Input;



/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map