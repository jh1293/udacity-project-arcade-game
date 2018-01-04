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
/** @module modules/resources */

/** Class representing resource loader. */
class Resources {
  constructor() {
    /**
     * Creating resource pool.
     */
    this.resPool = {};
  }

  /**
   * Load a resource from specified URL to resource pool.
   * @param {string} resURL - URL of a resource to be loaded.
   */
  load(resURL) {
    let thisArg = this;
    let resURLArray = resURL.split('.');  // Parse URL string.
    let type = resURLArray[resURLArray.length - 1];  // Identify resource type.
    if (thisArg.resPool[resURL]) {
      /**
       * If current requested resource already exists in resource pool, return it.
       */
      return thisArg.resPool[resURL];
    } else {
      /**
       * If current requested resource does not exists in resource pool, create new one and return it, then add it to the resource pool for caching.
       */
      // Image resource.
      if (type === 'png') {
        let image = new Image();
        image.src = resURL;
        image.onload = function() {
          thisArg.resPool[resURL] = image;
        };
        return image;
      }
      // Audio resource.
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
/** @module modules/audio */


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

/** Class representing audio player. */
class Audio {
  /**
   * Creating effects pool as a buffer of audio effects.
   */
  constructor() {
    this.effectsPool = {};
  }

  /**
   * Get currently loaded effects.
   */
  get effects() {
    return this.effectsPool;
  }

  /**
   * Add an effect to the effects pool.
   * @param {string} effects - URL of a audio file to be loaded as effect.
   */
  set effects(effects) {
    effects.forEach((value) => {
      this.effectsPool[value] = resources.load(value);
    });
  }

  /**
   * Play an audio clip.
   * @param {string} effects - URL of a audio file to be played.
   */
  play(audio, delay = 0) {
    setTimeout(() => {
      this.effectsPool[audio].play();
    }, delay * 1000);
  }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Audio;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/** @module modules/engine */

/** Class representing game engine. */
class Engine {
  /**
   * Create game engine.
   */
  constructor() {
    this.target = null;  // Canvas context to be bound to engine.
    this.stamp = 0;  // Last time stamp.
    this.delta = 0;  // Current delta time.
    this.frames = 0;  // Frame count since the engine started.
    this.state = null;  // Engine state, null - pause; 100 - running.
    this.gameMode = '';
    this.collisionCheckEnabled = true;
  }

  /**
   * Bind the engine to a canvas 2d context.
   * @param {object} context - A canvas 2d context to be bound to.
   */
  bind(context) {
    this.target = context;
  }

  /**
   * Get current frame rates.
   * @return {number} Frame rates.
   */
  get fps() {
    return this.delta === 0 ? 0: Math.trunc(1 / this.delta);
  }

  /**
   * Start the engine.
   */
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

  /**
   * Collision check.
   * @param {object} subject A subject that going to be checked with others.
   * @param {array} object An array of object that going to be checked with subject.
   */
  collisionCheck(subject, ...object) {
    if (this.collisionCheckEnabled === false) {
      return;
    }
    let dx, dy, distance, diff_radius;
    object.forEach((value) => {
      dx = subject.collision.center.x - value.collision.center.x;
      dy = subject.collision.center.y - value.collision.center.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      diff_radius = subject.collision.radius + value.collision.radius;
      if (Number(distance) < Number(diff_radius)) {
        let event = new CustomEvent('break', {detail: 'collide'});
        document.dispatchEvent(event);  // Once collide, dispatch break event.
      }
    });
  }

  /**
   * Resume the engine.
   */
  resume() {
    this.state = 100;
  }

  /**
   * Pause the engine.
   */
  pause() {
    this.state = null;
  }

  /**
   * Completely stop the engine.
   */
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
/** @module modules/entities */


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

/** Class representing basic entity type. */
class Actor {
  /**
   * Create an actor.
   */
  constructor() {
    this.pos = {
      x: 0,
      y: 0
    };
    this.spriteImage = null;
    this.collision = {
      center: {
        x: 0,
        y: 0
      },
      radius: 0
    };
  }

  /**
   * Get width of current actor.
   * @return {number} Width of current actor.
   */
  get width() {
    return this.spriteImage.width;
  }

  /**
   * Get height of current actor.
   * @return {number} Height of current actor.
   */
  get height() {
    return this.spriteImage.height;
  }

  /**
   * Get sprite image of current actor.
   * @return {object} Sprite image of current actor.
   */
  get sprite() {
    return this.spriteImage;
  }

  /**
   * Set sprite image of current actor.
   * @param {string} resURL URL of image to be set as sprite image.
   */
  set sprite(resURL) {
    this.spriteImage = resources.load(resURL);
  }

  /**
   * Render current actor to a canvas 2d context.
   * @param {object} context The target context.
   */
  render(context) {
    context.drawImage(this.spriteImage, this.pos.x, this.pos.y, this.spriteImage.width, this.spriteImage.height);
  }
}

/**
 * Class representing player.
 * @extends Actor
 */
class Player extends Actor {
  /**
   * Create the player.
   */
  constructor() {
    super();
    this.dest = {
      x: 0,
      y: 0
    };
    this.interval = 0.05;  // Specify moving speed.
    this.isMoving = false;
  }

  /**
   * Update player's properties.
   * @param {number} delta Delta time generated by the engine.
   */
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

    // Update position properties
    this.pos.x += (this.dest.x - this.pos.x) / this.interval * delta;
    this.pos.y += (this.dest.y - this.pos.y) / this.interval * delta;
  }

  /**
   * Shift player to a new location.
   * @param {string} direction Direction implying player to be shifted.
   */
  shift(direction) {
    if (this.isMoving != true) {
      switch (direction) {
        case 'up':
          this.dest.y = this.pos.y - 80;
          break;
        case 'down':
          this.dest.y = this.pos.y + 80;
          break;
        case 'left':
          this.dest.x = this.pos.x - 100;
          break;
        case 'right':
          this.dest.x = this.pos.x + 100;
          break;
      }
      this.isMoving = true;
      setTimeout(() => {this.isMoving = false;}, this.interval * 4000);
    }
  }

  /**
   * Reset player to the original position.
   */
  reset() {
    this.dest.x = 200;
    this.dest.y = 450;
  }
}

/**
 * Class representing enemy.
 * @extends Actor
 */
class Enemy extends Actor {
  /**
   * Create an enemy.
   */
  constructor() {
    super();
    this.v = 100;  // Enemy's basic velocity
    this.r = Math.floor(Math.random() * 5) + 1;  // Enemy's velocity modifier, random number between 1-5
  }

  /**
   * Update enemy's properties.
   * @param {number} delta Delta time generated by the engine.
   */
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
/** @module modules/gui */


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

/** Class representing basic GUI element. */
class GUI {
    /**
     * Create a GUI element.
     * @param {number} posX - The left offset of this element.
     * @param {number} posY - The top offset of this element.
     * @param {number} width - The wisth of this element.
     * @param {number} height - The height of this element.
     * @param {string} className - The class name of this element.
     * @param {string} id - The id of this element.
     */
  constructor(posX, posY, width, height, className, id) {
    this.element = document.createElement('div');
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.className = className;
    this.element.id = id;
    this.element.style.position = 'absolute';  // GUI elements were positioned relatively to their parent elements.
    this.element.style.visibility = 'hidden';  // The element is invisible by default.
  }

  /**
   * Append current element to another element.
   */
  appendTo(id) {
    document.getElementById(id).appendChild(this.element)
  }

  /**
   * Hide current element with fadeout animation.
   * @param {number} duration - The duration of fadeout animation, default 0 (The element will hide immediately).
   * @param {number} delay - The delay of fadeout animation, default 0 (No delay).
   */
  hide(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `fadeout ${duration}s forwards`;
      setTimeout(() => {
        this.element.style.visibility = 'hidden';
      }, duration * 1000);  // Actually hide the element after animation ends.
    }, delay * 1000);
  }

  /**
   * Show current element with fadeout animation.
   * @param {number} duration - The duration of fadein animation, default 0 (The element will hide immediately).
   * @param {number} delay - The delay of fadein animation, default 0 (No delay).
   */
  show(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.visibility = 'visible';
      this.element.style.animation = `fadein ${duration}s forwards`;
    }, delay * 1000);

  }

  /**
   * Simulate camera focus effect to current element.
   * @param {number} duration - The duration of focus animation, default 0 (The element will hide immediately).
   * @param {number} delay - The delay of focus animation, default 0 (No delay).
   */
  focus(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `focus ${duration}s forwards`;
    }, delay * 1000);
  }

  /**
   * Simulate camera unfocus effect to current element.
   * @param {number} duration - The duration of unfocus animation, default 0 (The element will hide immediately).
   * @param {number} delay - The delay of unfocus animation, default 0 (No delay).
   */
  unfocus(duration = 0, delay = 0) {
    setTimeout(() => {
      this.element.style.animation = `unfocus ${duration}s forwards`;
    }, delay * 1000);
  }
}

/**
 * Class representing viewport.
 * @extends GUI
 */
class Viewport extends GUI {
  /**
   * Create a viewport.
   * @param {number} width - The wisth of viewport.
   * @param {number} height - The height of viewport.
   * @param {string} className - The class name of viewport.
   * @param {string} id - The id of viewport.
   */
  constructor(width, height, className, id) {
    super(null, null, width, height, className, id);
    this.element.style.position = 'relative';  // Viewports were considered as general container for all GUI elements.
    this.element.style.overflow = 'hidden';  // Any GUI elements beyond viewport area are invisible.
  }
}

/**
 * Class representing canvas.
 * @extends GUI
 */
class Canvas extends GUI {
  /**
   * Create a canvas.
   * @param {number} width - The wisth of canvas.
   * @param {number} height - The height of canvas.
   * @param {string} className - The class name of canvas.
   * @param {string} id - The id of canvas.
   */
  constructor(width, height, className, id) {
    super();
    this.element = document.createElement('canvas');
    this.element.width = width;
    this.element.height = height;
    this.element.className = className;
    this.element.id = id;
    this.element.innerHTML = 'It seems like your browser doesn\'t support HTML5.';
    this.element.style.position = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.zIndex = 0;
  }

  /**
   * Get the width of current canvas.
   * @return {number} Width of current canvas.
   */
  get width() {
    return this.element.width;
  }

  /**
   * Get the height of current canvas.
   * @return {number} Height of current canvas.
   */
  get height() {
    return this.element.height;
  }

  /**
   * Get the 2d context of current canvas.
   * @return {object} 2d context of current canvas.
   */
  get context() {
    return this.element.getContext('2d');
  }
}

/**
 * Class representing a panel.
 * @extends GUI
 */
class Panel extends GUI {
  /**
   * Create a panel element.
   * @param {number} posX - The left offset of this panel.
   * @param {number} posY - The top offset of this panel.
   * @param {number} width - The wisth of this panel.
   * @param {number} height - The height of this panel.
   * @param {string} className - The class name of this panel.
   * @param {string} id - The id of this panel.
   */
  constructor(posX, posY, width, height, className, id) {
    super(posX, posY, width, height, className, id);
    this.element.style.zIndex = 100;
  }
}

/**
 * Class representing a button.
 * @extends GUI
 */
class Button extends GUI {
  /**
   * Create a button element.
   * @param {number} posX - The left offset of this button.
   * @param {number} posY - The top offset of this button.
   * @param {number} width - The wisth of this button.
   * @param {number} height - The height of this button.
   * @param {string} className - The class name of this button.
   * @param {string} id - The id of this button.
   * @param {string} value - The text that shows on the button.
   */
  constructor(posX, posY, width, height, className, id, value) {
    super();
    this.element = document.createElement('button');
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.className = className;
    this.element.id = id;
    this.element.style.position = 'absolute';
    this.element.innerHTML = value;
    this.element.style.visibility = 'hidden';
  }
}

/**
 * Class representing a sprite image.
 * @extends GUI
 */
class Sprite extends GUI {
  /**
   * Create a sprite image.
   * @param {number} posX - The left offset of this sprite image.
   * @param {number} posY - The top offset of this sprite image.
   * @param {number} width - The wisth of this sprite image.
   * @param {number} height - The height of this sprite image.
   * @param {string} className - The class name of this sprite image.
   * @param {string} id - The id of this sprite image.
   * @param {string} src - The URL of this sprite image.
   */
  constructor(posX, posY, width, height, className, id, src) {
    super();
    this.element = resources.load(src);
    this.element.style.left = posX + 'px';
    this.element.style.top = posY + 'px';
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.className = className;
    this.element.id = id;
    this.element.style.position = 'absolute';
  }
}

/**
 * Class representing a textbox.
 * @extends GUI
 */
class Textbox extends GUI {
  /**
   * Create a textbox.
   * @param {number} posX - The left offset of this textbox.
   * @param {number} posY - The top offset of this textbox.
   * @param {number} width - The wisth of this textbox.
   * @param {number} height - The height of this textbox.
   * @param {string} className - The class name of this textbox.
   * @param {string} id - The id of this textbox.
   * @param {string} text - The URL of this textbox.
   */
  constructor(posX, posY, width, height, className, id, text) {
    super(posX, posY, width, height, className, id);
    this.element.innerHTML = text;
  }
  /**
   * Change text of this textbox.
   * @param {string} text - The text of this textbox.
   */
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
/** @module modules/map */


let resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

/** Class representing map. */
class Map {
  /**
   * Create display list used for generating the map.
   */
  constructor() {
    this.displayList = {};
  }

  /**
   * Get the tileset of current map.
   * @return {object} Tileset of current map, aka. display list.
   */
  get tileSet() {
    return this.displayList;
  }

  /**
   * Set the tileset of current map.
   * @param {string} tileSet - URL of a json file contains the tileset information.
   */
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

  /**
   * Render map based on tileset.
   * @param {object} context - Target canvas 2d context.
   */
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
let panelMsg = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Textbox"](0, 300, 400, 50, 'panel__msg', 'msg', 'Choose Your Character');
let audio = new __WEBPACK_IMPORTED_MODULE_3__audio_js__["default"]();  // Sound system
let map = new __WEBPACK_IMPORTED_MODULE_5__map_js__["default"]();  // Map
let player = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Player"]();  // Player entity
let enemies = [];
for (let i = 0; i < 8; i++) {
  let enemy = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Enemy"]();  // Enemy entities
  enemies.push(enemy);
}

/**
 * Global variables.
 */
let playerCharacter = null;

/**
 * Building scene tree.
 * Being the first step of all creations.
 */
// viewport.appendTo('game');
// canvas.appendTo('viewport');

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

  player.sprite = playerCharacter || './images/char-boy.png';
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 450;

  enemies.forEach((value, index) => {
    value.sprite = './images/enemy-bug.png';
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

  viewport.appendTo('game');
  canvas.appendTo('viewport');

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
  switch (event.key) {
    case 'Up':
    case 'ArrowUp':
      player.shift('up');
      break;
    case 'Down':
    case 'ArrowDown':
      player.shift('down');
      break;
    case 'Left':
    case 'ArrowLeft':
      player.shift('left');
      break;
    case 'Right':
    case 'ArrowRight':
      player.shift('right');
      break;
  }
});

document.addEventListener('break', (event) => {
  switch(event.detail) {
    case 'reach':
      engine.pause();
      canvas.unfocus(0.5);
      panel.show(0.5, 0.5);
      btnPause.hide(0.1);
      audio.play(`./audio/win${Math.floor(Math.random() * 4) + 1}.wav`);
      break;
    case 'collide':
    console.log('collide');
      engine.collisionCheckEnabled = false;  // Avoid collision events overlapping.
      player.reset();
      audio.play(`./audio/hit${Math.floor(Math.random() * 2) + 1}.wav`);
      setTimeout(() => {
        engine.collisionCheckEnabled = true;
      }, player.interval * 1000);
      break;
    }
});


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map