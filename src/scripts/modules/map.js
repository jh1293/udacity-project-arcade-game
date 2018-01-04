/** @module modules/map */

import Resources from './resources.js';
let resources = new Resources();

/** Class representing map. */
export default class Map {
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
