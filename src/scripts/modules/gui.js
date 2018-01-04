/** @module modules/gui */

import Resources from './resources.js';
let resources = new Resources();

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

export { GUI, Viewport, Canvas, Panel, Button, Sprite, Textbox };
