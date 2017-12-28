import Engine from './engine.js';
import Resource from './resource.js';
import Input from './input.js';
import Sound from './sound.js';

let engine = new Engine();

engine.create(300, 200);

engine.init = function() {

};

engine.update = function(delta) {

  console.log('delta: ' + delta);
  console.log('frames: ' + this.frames);
  console.log('fps: ' + this.fps);
  console.log('engine state: ' + this.state);
  console.log('----------------');

};

engine.render = function() {

};

engine.run();
