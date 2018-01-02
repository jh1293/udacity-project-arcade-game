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

  react(event) {
    switch (event.detail) {
      case 'collide':
        this.play(`./audio/hit${Math.floor(Math.random() * 2) + 1}.wav`);
        break;
      case 'reach':
        this.play(`./audio/win${Math.floor(Math.random() * 4) + 1}.wav`);
        break;
    }

  }
}
