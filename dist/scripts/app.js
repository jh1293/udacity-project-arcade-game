'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 6);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /** @module modules/resources */

  /** Class representing resource loader. */

  var Resources = function () {
    function Resources() {
      _classCallCheck(this, Resources);

      /**
       * Creating resource pool.
       */
      this.resPool = {};
    }

    /**
     * Load a resource from specified URL to resource pool.
     * @param {string} resURL - URL of a resource to be loaded.
     */


    _createClass(Resources, [{
      key: 'load',
      value: function load(resURL) {
        var thisArg = this;
        var resURLArray = resURL.split('.'); // Parse URL string.
        var type = resURLArray[resURLArray.length - 1]; // Identify resource type.
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
            var image = new Image();
            image.src = resURL;
            image.onload = function () {
              thisArg.resPool[resURL] = image;
            };
            return image;
          }
          // Audio resource.
          if (type === 'wav') {
            var audio = new Audio();
            audio.src = resURL;
            audio.onload = function () {
              thisArg.resPool[resURL] = audio;
            };
            return audio;
          }
        }
      }
    }]);

    return Resources;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Resources;

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);
  /** @module modules/audio */

  var resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

  /** Class representing audio player. */

  var Audio = function () {
    /**
     * Creating effects pool as a buffer of audio effects.
     */
    function Audio() {
      _classCallCheck(this, Audio);

      this.effectsPool = {};
    }

    /**
     * Get currently loaded effects.
     */


    _createClass(Audio, [{
      key: 'play',


      /**
       * Play an audio clip.
       * @param {string} effects - URL of a audio file to be played.
       */
      value: function play(audio) {
        var _this = this;

        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        setTimeout(function () {
          _this.effectsPool[audio].play();
        }, delay * 1000);
      }
    }, {
      key: 'effects',
      get: function get() {
        return this.effectsPool;
      }

      /**
       * Add an effect to the effects pool.
       * @param {string} effects - URL of a audio file to be loaded as effect.
       */
      ,
      set: function set(effects) {
        var _this2 = this;

        effects.forEach(function (value) {
          _this2.effectsPool[value] = resources.load(value);
        });
      }
    }]);

    return Audio;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Audio;

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /** @module modules/engine */

  /** Class representing game engine. */

  var Engine = function () {
    /**
     * Create game engine.
     */
    function Engine() {
      _classCallCheck(this, Engine);

      this.target = null; // Canvas context to be bound to engine.
      this.stamp = 0; // Last time stamp.
      this.delta = 0; // Current delta time.
      this.frames = 0; // Frame count since the engine started.
      this.state = null; // Engine state, null - pause; 100 - running.
      this.gameMode = '';
      this.collisionCheckEnabled = true;
    }

    /**
     * Bind the engine to a canvas 2d context.
     * @param {object} context - A canvas 2d context to be bound to.
     */


    _createClass(Engine, [{
      key: 'bind',
      value: function bind(context) {
        this.target = context;
      }

      /**
       * Get current frame rates.
       * @return {number} Frame rates.
       */

    }, {
      key: 'run',


      /**
       * Start the engine.
       */
      value: function run() {
        var _this3 = this;

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
        setTimeout(function () {
          _this3.state = 100;
        }, 1000);
      }

      /**
       * Collision check.
       * @param {object} subject A subject that going to be checked with others.
       * @param {array} object An array of object that going to be checked with subject.
       */

    }, {
      key: 'collisionCheck',
      value: function collisionCheck(subject) {
        if (this.collisionCheckEnabled === false) {
          return;
        }
        var dx = void 0,
            dy = void 0,
            distance = void 0,
            diff_radius = void 0;

        for (var _len = arguments.length, object = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          object[_key - 1] = arguments[_key];
        }

        object.forEach(function (value) {
          dx = subject.collision.center.x - value.collision.center.x;
          dy = subject.collision.center.y - value.collision.center.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          diff_radius = subject.collision.radius + value.collision.radius;
          if (Number(distance) < Number(diff_radius)) {
            var event = new CustomEvent('break', { detail: 'collide' });
            document.dispatchEvent(event); // Once collide, dispatch break event.
          }
        });
      }

      /**
       * Resume the engine.
       */

    }, {
      key: 'resume',
      value: function resume() {
        this.state = 100;
      }

      /**
       * Pause the engine.
       */

    }, {
      key: 'pause',
      value: function pause() {
        this.state = null;
      }

      /**
       * Completely stop the engine.
       */

    }, {
      key: 'stop',
      value: function stop() {
        window.cancelAnimationFrame(this.loopID);
      }
    }, {
      key: 'fps',
      get: function get() {
        return this.delta === 0 ? 0 : Math.trunc(1 / this.delta);
      }
    }]);

    return Engine;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Engine;

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Actor", function () {
    return Actor;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Player", function () {
    return Player;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Enemy", function () {
    return Enemy;
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);
  /** @module modules/entities */

  var resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

  /** Class representing basic entity type. */

  var Actor = function () {
    /**
     * Create an actor.
     */
    function Actor() {
      _classCallCheck(this, Actor);

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


    _createClass(Actor, [{
      key: 'render',


      /**
       * Render current actor to a canvas 2d context.
       * @param {object} context The target context.
       */
      value: function render(context) {
        context.drawImage(this.spriteImage, this.pos.x, this.pos.y, this.spriteImage.width, this.spriteImage.height);
      }
    }, {
      key: 'width',
      get: function get() {
        return this.spriteImage.width;
      }

      /**
       * Get height of current actor.
       * @return {number} Height of current actor.
       */

    }, {
      key: 'height',
      get: function get() {
        return this.spriteImage.height;
      }

      /**
       * Get sprite image of current actor.
       * @return {object} Sprite image of current actor.
       */

    }, {
      key: 'sprite',
      get: function get() {
        return this.spriteImage;
      }

      /**
       * Set sprite image of current actor.
       * @param {string} resURL URL of image to be set as sprite image.
       */
      ,
      set: function set(resURL) {
        this.spriteImage = resources.load(resURL);
      }
    }]);

    return Actor;
  }();

  /**
   * Class representing player.
   * @extends Actor
   */


  var Player = function (_Actor) {
    _inherits(Player, _Actor);

    /**
     * Create the player.
     */
    function Player() {
      _classCallCheck(this, Player);

      var _this4 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

      _this4.dest = {
        x: 0,
        y: 0
      };
      _this4.interval = 0.05; // Specify moving speed.
      _this4.isMoving = false;
      return _this4;
    }

    /**
     * Update player's properties.
     * @param {number} delta Delta time generated by the engine.
     */


    _createClass(Player, [{
      key: 'update',
      value: function update(delta) {

        // Moveable area restriction
        // '10' at the end of each expression is a tolerance value.
        if (this.dest.x < 0 - 10) {
          this.dest.x = this.pos.x;
        }
        if (this.dest.x > 500 - this.width + 10) {
          this.dest.x = this.pos.x;
        }
        if (this.dest.y < -30 - 10) {
          this.dest.y = this.pos.y;
        }
        if (this.dest.y > 650 - this.height + 10) {
          this.dest.y = this.pos.y;
        }

        // Condition to win
        if (this.pos.y < -28) {
          var event = new CustomEvent('break', { detail: 'reach' });
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

    }, {
      key: 'shift',
      value: function shift(direction) {
        var _this5 = this;

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
          setTimeout(function () {
            _this5.isMoving = false;
          }, this.interval * 4000);
        }
      }

      /**
       * Reset player to the original position.
       */

    }, {
      key: 'reset',
      value: function reset() {
        this.dest.x = 200;
        this.dest.y = 450;
      }
    }]);

    return Player;
  }(Actor);

  /**
   * Class representing enemy.
   * @extends Actor
   */


  var Enemy = function (_Actor2) {
    _inherits(Enemy, _Actor2);

    /**
     * Create an enemy.
     */
    function Enemy() {
      _classCallCheck(this, Enemy);

      var _this6 = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this));

      _this6.v = 100; // Enemy's basic velocity
      _this6.r = Math.floor(Math.random() * 5) + 1; // Enemy's velocity modifier, random number between 1-5
      return _this6;
    }

    /**
     * Update enemy's properties.
     * @param {number} delta Delta time generated by the engine.
     */


    _createClass(Enemy, [{
      key: 'update',
      value: function update(delta) {
        this.pos.x += this.v * this.r * delta;
        if (this.pos.x > 502) {
          this.pos.x = (Math.random() * 3 + 1) * -100;
          this.r = Math.floor(Math.random() * 5) + 1;
        }
      }
    }]);

    return Enemy;
  }(Actor);

  /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "GUI", function () {
    return GUI;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Viewport", function () {
    return Viewport;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Canvas", function () {
    return Canvas;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Panel", function () {
    return Panel;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Button", function () {
    return Button;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Sprite", function () {
    return Sprite;
  });
  /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "Textbox", function () {
    return Textbox;
  });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);
  /** @module modules/gui */

  var resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

  /** Class representing basic GUI element. */

  var GUI = function () {
    /**
     * Create a GUI element.
     * @param {number} posX - The left offset of this element.
     * @param {number} posY - The top offset of this element.
     * @param {number} width - The wisth of this element.
     * @param {number} height - The height of this element.
     * @param {string} className - The class name of this element.
     * @param {string} id - The id of this element.
     */
    function GUI(posX, posY, width, height, className, id) {
      _classCallCheck(this, GUI);

      this.element = document.createElement('div');
      this.element.style.left = posX + 'px';
      this.element.style.top = posY + 'px';
      this.element.style.width = width + 'px';
      this.element.style.height = height + 'px';
      this.element.className = className;
      this.element.id = id;
      this.element.style.position = 'absolute'; // GUI elements were positioned relatively to their parent elements.
      this.element.style.visibility = 'hidden'; // The element is invisible by default.
    }

    /**
     * Append current element to another element.
     */


    _createClass(GUI, [{
      key: 'appendTo',
      value: function appendTo(id) {
        document.getElementById(id).appendChild(this.element);
      }

      /**
       * Hide current element with fadeout animation.
       * @param {number} duration - The duration of fadeout animation, default 0 (The element will hide immediately).
       * @param {number} delay - The delay of fadeout animation, default 0 (No delay).
       */

    }, {
      key: 'hide',
      value: function hide() {
        var _this7 = this;

        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        setTimeout(function () {
          _this7.element.style.animation = 'fadeout ' + duration + 's forwards';
          setTimeout(function () {
            _this7.element.style.visibility = 'hidden';
          }, duration * 1000); // Actually hide the element after animation ends.
        }, delay * 1000);
      }

      /**
       * Show current element with fadeout animation.
       * @param {number} duration - The duration of fadein animation, default 0 (The element will hide immediately).
       * @param {number} delay - The delay of fadein animation, default 0 (No delay).
       */

    }, {
      key: 'show',
      value: function show() {
        var _this8 = this;

        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        setTimeout(function () {
          _this8.element.style.visibility = 'visible';
          _this8.element.style.animation = 'fadein ' + duration + 's forwards';
        }, delay * 1000);
      }

      /**
       * Simulate camera focus effect to current element.
       * @param {number} duration - The duration of focus animation, default 0 (The element will hide immediately).
       * @param {number} delay - The delay of focus animation, default 0 (No delay).
       */

    }, {
      key: 'focus',
      value: function focus() {
        var _this9 = this;

        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        setTimeout(function () {
          _this9.element.style.animation = 'focus ' + duration + 's forwards';
        }, delay * 1000);
      }

      /**
       * Simulate camera unfocus effect to current element.
       * @param {number} duration - The duration of unfocus animation, default 0 (The element will hide immediately).
       * @param {number} delay - The delay of unfocus animation, default 0 (No delay).
       */

    }, {
      key: 'unfocus',
      value: function unfocus() {
        var _this10 = this;

        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        setTimeout(function () {
          _this10.element.style.animation = 'unfocus ' + duration + 's forwards';
        }, delay * 1000);
      }
    }]);

    return GUI;
  }();

  /**
   * Class representing viewport.
   * @extends GUI
   */


  var Viewport = function (_GUI) {
    _inherits(Viewport, _GUI);

    /**
     * Create a viewport.
     * @param {number} width - The wisth of viewport.
     * @param {number} height - The height of viewport.
     * @param {string} className - The class name of viewport.
     * @param {string} id - The id of viewport.
     */
    function Viewport(width, height, className, id) {
      _classCallCheck(this, Viewport);

      var _this11 = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this, null, null, width, height, className, id));

      _this11.element.style.position = 'relative'; // Viewports were considered as general container for all GUI elements.
      _this11.element.style.overflow = 'hidden'; // Any GUI elements beyond viewport area are invisible.
      return _this11;
    }

    return Viewport;
  }(GUI);

  /**
   * Class representing canvas.
   * @extends GUI
   */


  var Canvas = function (_GUI2) {
    _inherits(Canvas, _GUI2);

    /**
     * Create a canvas.
     * @param {number} width - The wisth of canvas.
     * @param {number} height - The height of canvas.
     * @param {string} className - The class name of canvas.
     * @param {string} id - The id of canvas.
     */
    function Canvas(width, height, className, id) {
      _classCallCheck(this, Canvas);

      var _this12 = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this));

      _this12.element = document.createElement('canvas');
      _this12.element.width = width;
      _this12.element.height = height;
      _this12.element.className = className;
      _this12.element.id = id;
      _this12.element.innerHTML = 'It seems like your browser doesn\'t support HTML5.';
      _this12.element.style.position = 'absolute';
      _this12.element.style.visibility = 'hidden';
      _this12.element.style.zIndex = 0;
      return _this12;
    }

    /**
     * Get the width of current canvas.
     * @return {number} Width of current canvas.
     */


    _createClass(Canvas, [{
      key: 'width',
      get: function get() {
        return this.element.width;
      }

      /**
       * Get the height of current canvas.
       * @return {number} Height of current canvas.
       */

    }, {
      key: 'height',
      get: function get() {
        return this.element.height;
      }

      /**
       * Get the 2d context of current canvas.
       * @return {object} 2d context of current canvas.
       */

    }, {
      key: 'context',
      get: function get() {
        return this.element.getContext('2d');
      }
    }]);

    return Canvas;
  }(GUI);

  /**
   * Class representing a panel.
   * @extends GUI
   */


  var Panel = function (_GUI3) {
    _inherits(Panel, _GUI3);

    /**
     * Create a panel element.
     * @param {number} posX - The left offset of this panel.
     * @param {number} posY - The top offset of this panel.
     * @param {number} width - The wisth of this panel.
     * @param {number} height - The height of this panel.
     * @param {string} className - The class name of this panel.
     * @param {string} id - The id of this panel.
     */
    function Panel(posX, posY, width, height, className, id) {
      _classCallCheck(this, Panel);

      var _this13 = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, posX, posY, width, height, className, id));

      _this13.element.style.zIndex = 100;
      return _this13;
    }

    return Panel;
  }(GUI);

  /**
   * Class representing a button.
   * @extends GUI
   */


  var Button = function (_GUI4) {
    _inherits(Button, _GUI4);

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
    function Button(posX, posY, width, height, className, id, value) {
      _classCallCheck(this, Button);

      var _this14 = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

      _this14.element = document.createElement('button');
      _this14.element.style.left = posX + 'px';
      _this14.element.style.top = posY + 'px';
      _this14.element.style.width = width + 'px';
      _this14.element.style.height = height + 'px';
      _this14.element.className = className;
      _this14.element.id = id;
      _this14.element.style.position = 'absolute';
      _this14.element.innerHTML = value;
      _this14.element.style.visibility = 'hidden';
      return _this14;
    }

    return Button;
  }(GUI);

  /**
   * Class representing a sprite image.
   * @extends GUI
   */


  var Sprite = function (_GUI5) {
    _inherits(Sprite, _GUI5);

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
    function Sprite(posX, posY, width, height, className, id, src) {
      _classCallCheck(this, Sprite);

      var _this15 = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

      _this15.element = resources.load(src);
      _this15.element.style.left = posX + 'px';
      _this15.element.style.top = posY + 'px';
      _this15.element.style.width = width + 'px';
      _this15.element.style.height = height + 'px';
      _this15.element.className = className;
      _this15.element.id = id;
      _this15.element.style.position = 'absolute';
      return _this15;
    }

    return Sprite;
  }(GUI);

  /**
   * Class representing a textbox.
   * @extends GUI
   */


  var Textbox = function (_GUI6) {
    _inherits(Textbox, _GUI6);

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
    function Textbox(posX, posY, width, height, className, id, text) {
      _classCallCheck(this, Textbox);

      var _this16 = _possibleConstructorReturn(this, (Textbox.__proto__ || Object.getPrototypeOf(Textbox)).call(this, posX, posY, width, height, className, id));

      _this16.element.innerHTML = text;
      return _this16;
    }
    /**
     * Change text of this textbox.
     * @param {string} text - The text of this textbox.
     */


    _createClass(Textbox, [{
      key: 'text',
      value: function text(_text) {
        this.element.innerHTML = _text;
      }
    }]);

    return Textbox;
  }(GUI);

  /***/
},
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__resources_js__ = __webpack_require__(0);
  /** @module modules/map */

  var resources = new __WEBPACK_IMPORTED_MODULE_0__resources_js__["default"]();

  /** Class representing map. */

  var Map = function () {
    /**
     * Create display list used for generating the map.
     */
    function Map() {
      _classCallCheck(this, Map);

      this.displayList = {};
    }

    /**
     * Get the tileset of current map.
     * @return {object} Tileset of current map, aka. display list.
     */


    _createClass(Map, [{
      key: 'render',


      /**
       * Render map based on tileset.
       * @param {object} context - Target canvas 2d context.
       */
      value: function render(context) {
        var _this17 = this;

        var _loop = function _loop(index) {
          var image = _this17.displayList[index].image;
          _this17.displayList[index].cor.forEach(function (value) {
            context.drawImage(image, value[0] * 100, value[1] * 80, image.width, image.height);
          });
        };

        for (var index in this.displayList) {
          _loop(index);
        }
      }
    }, {
      key: 'tileSet',
      get: function get() {
        return this.displayList;
      }

      /**
       * Set the tileset of current map.
       * @param {string} tileSet - URL of a json file contains the tileset information.
       */
      ,
      set: function set(tileSet) {
        var thisArg = this;
        var request = new XMLHttpRequest();
        request.open('GET', tileSet);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
          var _tileSet = request.response;
          for (var index in _tileSet) {
            thisArg.displayList[index] = {};
            thisArg.displayList[index].image = resources.load(_tileSet[index].src);
            thisArg.displayList[index].cor = _tileSet[index].cor;
          }
        };
      }
    }]);

    return Map;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["default"] = Map;

  /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

  __webpack_require__(1);
  __webpack_require__(2);
  __webpack_require__(3);
  __webpack_require__(7);
  __webpack_require__(4);
  __webpack_require__(5);
  module.exports = __webpack_require__(0);

  /***/
},
/* 7 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__engine_js__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__resources_js__ = __webpack_require__(0);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__gui_js__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__audio_js__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__entities_js__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__map_js__ = __webpack_require__(5);

  /**
   * Instantiating area.
   */
  var engine = new __WEBPACK_IMPORTED_MODULE_0__engine_js__["default"](); // Game engine
  var viewport = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Viewport"](500, 650, 'viewport', 'viewport'); // Viewport
  var canvas = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Canvas"](500, 650, 'canvas', 'canvas'); // canvas
  var panel = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Panel"](50, 100, 400, 450, 'panel', 'panel');
  var btnStart = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Button"](140, 350, 120, 50, 'btn btn__control--color-green', 'btn-start', 'Start');
  var btnPause = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Button"](10, 10, 80, 30, 'btn btn__control--color-orange', 'btn-pause', 'Pause');
  var optChar1 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](30, 0, 101, 170, 'sprite__char', 'char-1', './images/char-boy.png');
  var optChar2 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](150, 0, 101, 170, 'sprite__char', 'char-2', './images/char-cat-girl.png');
  var optChar3 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](270, 0, 101, 170, 'sprite__char', 'char-3', './images/char-horn-girl.png');
  var optChar4 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](90, 120, 101, 170, 'sprite__char', 'char-4', './images/char-pink-girl.png');
  var optChar5 = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Sprite"](210, 120, 101, 170, 'sprite__char', 'char-5', './images/char-princess-girl.png');
  var panelMsg = new __WEBPACK_IMPORTED_MODULE_2__gui_js__["Textbox"](0, 300, 400, 50, 'panel__msg', 'msg', 'Choose Your Character');
  var audio = new __WEBPACK_IMPORTED_MODULE_3__audio_js__["default"](); // Sound system
  var map = new __WEBPACK_IMPORTED_MODULE_5__map_js__["default"](); // Map
  var player = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Player"](); // Player entity
  var enemies = [];
  for (var i = 0; i < 8; i++) {
    var enemy = new __WEBPACK_IMPORTED_MODULE_4__entities_js__["Enemy"](); // Enemy entities
    enemies.push(enemy);
  }

  /**
   * Global variables.
   */
  var playerCharacter = null;

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
  engine.init = function () {

    audio.effects = ['./audio/hit1.wav', './audio/hit2.wav', './audio/win1.wav', './audio/win2.wav', './audio/win3.wav', './audio/win4.wav'];

    player.sprite = playerCharacter || './images/char-boy.png';
    player.pos.x = player.dest.x = 200;
    player.pos.y = player.dest.y = 450;

    enemies.forEach(function (value, index) {
      value.sprite = './images/enemy-bug.png';
      value.pos.x = (Math.random() * 3 + 1) * -200; // Keep cars away as the game starts
      if (index % 4 === 0) {
        // For each line of stone, there are two cars running
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
  engine.update = function (delta) {

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

    enemies.forEach(function (value) {
      value.collision = {
        center: {
          x: value.pos.x + 75,
          y: value.pos.y + 100
        },
        radius: 20
      };
      value.update(delta);
    });

    engine.collisionCheck.apply(engine, [player].concat(enemies));
  };

  /**
   * The second part of main loop.
   * Clean up entire canvas before actually drawing this frame.
   */
  engine.cleanup = function (target) {
    target.clearRect(0, 0, canvas.width, canvas.height);
  };

  /**
   * The third part of main loop.
   * Invoke .render() method of all instances.
   */
  engine.render = function (target) {

    map.render(target);

    enemies.forEach(function (value) {
      value.render(target);
    });
    player.render(target);
  };

  /**
   * Handling events.
   */

  // Document ready.
  (function () {

    viewport.appendTo('game');
    canvas.appendTo('viewport');

    engine.run();

    viewport.show(0.5);
    canvas.show(1, 1);

    panel.appendTo('viewport');
    btnPause.appendTo('viewport');
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

    setTimeout(function () {
      canvas.unfocus(0.5);
      panel.show(0.5, 0.5);
      panelMsg.show(0.5, 1);
      btnStart.show(0.5, 1.5);
    }, 4000);
  })();

  // Character choose
  var elemChars = document.getElementsByClassName('sprite__char');
  for (var _i = 0; _i < elemChars.length; _i++) {
    elemChars[_i].addEventListener('click', function (event) {
      var strArray = String(event.target.src).split('/');
      var fileName = strArray[strArray.length - 1];
      var msg = void 0;
      playerCharacter = './images/' + fileName;
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

  document.getElementById('btn-start').addEventListener('click', function (event) {
    engine.init();
    panel.hide(0.5);
    canvas.focus(0.5, 0.5);
    btnPause.show(0.5, 0.5);
    engine.resume();
    event.preventDefault();
  });

  document.getElementById('btn-pause').addEventListener('click', function (event) {
    if (engine.state) {
      engine.pause();
    } else {
      engine.resume();
    }
    event.preventDefault();
  });

  document.addEventListener('keydown', function (event) {
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

  document.addEventListener('break', function (event) {
    switch (event.detail) {
      case 'reach':
        engine.pause();
        canvas.unfocus(0.5);
        panel.show(0.5, 0.5);
        btnPause.hide(0.1);
        audio.play('./audio/win' + (Math.floor(Math.random() * 4) + 1) + '.wav');
        break;
      case 'collide':
        console.log('collide');
        engine.collisionCheckEnabled = false; // Avoid collision events overlapping.
        player.reset();
        audio.play('./audio/hit' + (Math.floor(Math.random() * 2) + 1) + '.wav');
        setTimeout(function () {
          engine.collisionCheckEnabled = true;
        }, player.interval * 1000);
        break;
    }
  });

  /***/
}]
/******/);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
