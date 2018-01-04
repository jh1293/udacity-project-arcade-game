/** @module modules/resources */

/** Class representing resource loader. */
export default class Resources {
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
