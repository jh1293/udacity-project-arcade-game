export default class Resources {
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
