import Engine from './engine.js';
import Resources from './resources.js';
import Input from './input.js';
import Sound from './sound.js';
import { Actor, Player, Enemy } from './entities.js';
import Map from './map.js';

/**
 * Instantiating area.
 */
let engine = new Engine();  // Game engine
let player = new Player();  // Player entity
let enemies = [];
for (let i = 0; i < 8; i++) {
  let enemy = new Enemy();  // Enemy entities
  enemies.push(enemy);
}
let map = new Map();  // Map

/**
 * Create canvas.
 * Being the first step of all creations.
 */
engine.create(502, 652);

/**
 * All the initialization works should be done within this function.
 * The game engine will only call this function one time brfore main loop starts.
 */
engine.init = function() {

  player.spriter = './images/char-boy.png';
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 450;

  enemies.forEach((value, index) => {
    value.spriter = './images/enemy-bug.png';
    value.pos.x = ((Math.random() * 3) + 1) * (-300);  // Keep cars away as the game starts
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

  console.log('delta: ' + delta);
  console.log('frames: ' + this.frames);
  console.log('fps: ' + this.fps);
  console.log('engine state: ' + this.state);
  console.log('----------------');

  player.update(delta);

  enemies.forEach((value) => {
    value.update(delta);
  });
};

/**
 * The second part of main loop.
 * Clean up entire canvas before actually drawing this frame.
 */
engine.cleanup = function() {
  engine.ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
};

/**
 * The third part of main loop.
 * Invoke .render() method of all instances.
 */
engine.render = function() {

  map.render(engine.ctx);

  enemies.forEach((value) => {
    value.render(engine.ctx);
  });

  player.render(engine.ctx);
};

/**
 * Start the engine.
 */
engine.run();

/**
 * Handling user input.
 */
document.addEventListener('keydown', (event) => {
  player.events(event.key);
  event.preventDefault();
});

// setTimeout(() => {engine.pause()}, 1200);
