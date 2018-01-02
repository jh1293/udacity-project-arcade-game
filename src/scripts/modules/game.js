import Engine from './engine.js';
import Resources from './resources.js';
import Input from './input.js';
import Sound from './sound.js';
import { Actor, Player, Enemy } from './entities.js';
import Map from './map.js';

/**
 * Global variables.
 */
window.shared = {
  events: {
    game: null,
    key: null
  }
};

/**
 * Instantiating area.
 */
let engine = new Engine();  // Game engine
let sound = new Sound();  // Sound system
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
engine.create(500, 650);

/**
 * All the initialization works should be done within this function.
 * The game engine will only call this function one time brfore main loop starts.
 */
engine.init = function() {

  sound.effects = [
    './audio/hit1.wav',
    './audio/hit2.wav',
    './audio/win1.wav',
    './audio/win2.wav',
    './audio/win3.wav',
    './audio/win4.wav'
  ];

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
// let blurRadius = 0;
/**
 * The first part of main loop.
 * This function handles math related stuff, such as update entities, collision check.
 */
engine.update = function(delta) {
  // blurRadius += 1 * delta;
  // engine.canvas.style.filter = `blur(${blurRadius}px)`;

  if (window.shared.events.game === 'lose') {
    sound.play(`./audio/hit${Math.floor(Math.random() * 2) + 1}.wav`);
    window.shared.events.game = null;
  }

  if (window.shared.events.game === 'win') {
    sound.play(`./audio/win${Math.floor(Math.random() * 4) + 1}.wav`);
    window.shared.events.game = null;
  }

  console.log('delta: ' + delta);
  console.log('frames: ' + this.frames);
  console.log('fps: ' + this.fps);
  console.log('engine state: ' + this.state);
  console.log('----------------');

  player.collision = {
        center: {
          x: player.pos.x + 50,
          y: player.pos.y + 100
        },
        radius: 36
      };
  player.update(delta);

  enemies.forEach((value) => {
    value.collision = {
          center: {
            x: value.pos.x + 75,
            y: value.pos.y + 100
          },
          radius: 20
        };
    value.update(delta);
  });

  if (engine.collisionCheck(player, ...enemies).isCollided) {
    // engine.pause();
    player.pos.x = player.dest.x = 200;
    player.pos.y = player.dest.y = 450;
  }
  // engine.collisionCheck(player, ...enemies);
  // console.log(window.shared.events.game);
};

/**
 * The second part of main loop.
 * Clean up entire canvas before actually drawing this frame.
 */
engine.cleanup = function() {
  // engine.ctx.fillStyle = '#fff8e4';
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
  // player.events(event.key);
  window.shared.events.key = event.key
  event.preventDefault();
});

// setTimeout(() => {engine.pause()}, 4000);

// setTimeout(() => {engine.pause()}, 2000);
