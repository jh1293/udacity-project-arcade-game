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
    if (thisArg.resPool[resURL]) {
      /**
       * If current requested resource already exists in resource pool, return it.
       */
      return thisArg.resPool[resURL];
    } else {
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
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Resources;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {class Engine {
  constructor() {
    this.window = global.window;
    this.document = global.document;
    this.canvas = global.document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stamp = 0;
    this.delta = 0;
    this.frames = 0;
    this.state = null;
  }

  get fps() {
    return this.delta === 0 ? 0: Math.trunc(1 / this.delta);
  }

  create(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.document.body.appendChild(this.canvas);
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
          this.cleanup();
          this.render();
      }
      this.loopID = this.window.requestAnimationFrame(loop.bind(this));
    }
    loop.call(this);
    /**
     * The engine started with the state of paused, it will switch to normal state after 1000ms.
     * Within the 1000ms, delta time will continue to be calculated, while update and render process were suspended.
     * The purpose of doing this is the make sure all update and render process were under stable delta time.
     */
    setTimeout(() => {this.state = 100}, 1000);
  }

  resume() {
    this.state = 100;
  }

  pause() {
    this.state = null;
  }

  stop() {
    this.window.cancelAnimationFrame(this.loopID);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Engine;


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 2 */
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




/***/ }),
/* 3 */
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



/***/ }),
/* 4 */
/***/ (function(module, exports) {



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
__webpack_require__(8);
__webpack_require__(3);
__webpack_require__(5);
__webpack_require__(0);
module.exports = __webpack_require__(4);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__engine_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resources_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__input_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sound_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sound_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__sound_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_js__ = __webpack_require__(5);







/**
 * Instantiating area.
 */
let engine = new __WEBPACK_IMPORTED_MODULE_0__engine_js__["default"]();  // Game engine
let player = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Player"]();  // Player entity
let enemies = [];
for (let i = 0; i < 8; i++) {
  let enemy = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Enemy"]();  // Enemy entities
  enemies.push(enemy);
}
let map = new __WEBPACK_IMPORTED_MODULE_5__map_js__["default"]();  // Map

/**
 * Create canvas.
 * Being the first step of all creations.
 */
engine.create(502, 652);

/**
 * All the initialization works should be done within this function.
 * The game engine will only call this function one time brfore main loop starts.
 */
engine.init = function() {

  player.spriter = './images/char-boy.png';
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 450;

  enemies.forEach((value, index) => {
    value.spriter = './images/enemy-bug.png';
    value.pos.x = ((Math.random() * 3) + 1) * (-300);  // Keep cars away as the game starts
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

  console.log('delta: ' + delta);
  console.log('frames: ' + this.frames);
  console.log('fps: ' + this.fps);
  console.log('engine state: ' + this.state);
  console.log('----------------');

  player.update(delta);

  enemies.forEach((value) => {
    value.update(delta);
  });
};

/**
 * The second part of main loop.
 * Clean up entire canvas before actually drawing this frame.
 */
engine.cleanup = function() {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
};

/**
 * The third part of main loop.
 * Invoke .render() method of all instances.
 */
engine.render = function() {

  map.render(engine.ctx);

  enemies.forEach((value) => {
    value.render(engine.ctx);
  });

  player.render(engine.ctx);
};

/**
 * Start the engine.
 */
engine.run();

/**
 * Handling user input.
 */
document.addEventListener('keydown', (event) => {
  player.events(event.key);
  event.preventDefault();
});

// setTimeout(() => {engine.pause()}, 1200);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map