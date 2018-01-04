/** @module modules/audio */

import Resources from './resources.js';
let resources = new Resources();

/** Class representing audio player. */
export default class Audio {
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
