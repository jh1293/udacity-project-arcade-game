import Resources from './resources.js';

let resources = new Resources();

export default class Sound {
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
