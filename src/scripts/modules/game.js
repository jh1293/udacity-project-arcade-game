import Engine from './engine.js';
import Resources from './resources.js';
import * as GUI from './gui.js';
// import Input from './input.js';
import Audio from './audio.js';
import * as Entities from './entities.js';
import Map from './map.js';

/**
 * Instantiating area.
 */
let engine = new Engine();  // Game engine
let viewport = new GUI.Viewport(500, 650, 'viewport', 'viewport');  // Viewport
let canvas = new GUI.Canvas(500, 650, 'canvas', 'canvas');  // canvas
let panel = new GUI.Panel(50, 100, 400, 450, 'panel', 'panel');
let btnStart = new GUI.Button(140, 350, 120, 50, 'btn btn__control--color-green', 'btn-start', 'Start');
let btnPause = new GUI.Button(10, 10, 80, 30, 'btn btn__control--color-orange', 'btn-pause', 'Pause');
let optChar1 = new GUI.Sprite(30, 0, 101, 170, 'sprite__char', 'char-1', './images/char-boy.png');
let optChar2 = new GUI.Sprite(150, 0, 101, 170, 'sprite__char', 'char-2', './images/char-cat-girl.png');
let optChar3 = new GUI.Sprite(270, 0, 101, 170, 'sprite__char', 'char-3', './images/char-horn-girl.png');
let optChar4 = new GUI.Sprite(90, 120, 101, 170, 'sprite__char', 'char-4', './images/char-pink-girl.png');
let optChar5 = new GUI.Sprite(210, 120, 101, 170, 'sprite__char', 'char-5', './images/char-princess-girl.png');
let panelMsg = new GUI.Textbox(0, 300, 400, 50, 'panel__msg', 'msg');
let audio = new Audio();  // Sound system
let player = new Entities.Player();  // Player entity
let enemies = [];
for (let i = 0; i < 8; i++) {
  let enemy = new Entities.Enemy();  // Enemy entities
  enemies.push(enemy);
}
let map = new Map();  // Map

/**
 * Global variables.
 */
let playerCharacter = null;

/**
 * Building scene tree.
 * Being the first step of all creations.
 */
viewport.appendTo('game');
canvas.appendTo('viewport');

/**
 * Bind engine to the canvas.
 */
engine.bind(canvas.context);

/**
 * All the initialization works should be done within this function.
 * The game engine will only call this function one time brfore main loop starts.
 */
engine.init = function() {

  audio.effects = [
    './audio/hit1.wav',
    './audio/hit2.wav',
    './audio/win1.wav',
    './audio/win2.wav',
    './audio/win3.wav',
    './audio/win4.wav'
  ];

  player.spriter = playerCharacter || './images/char-boy.png';
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 450;

  enemies.forEach((value, index) => {
    value.spriter = './images/enemy-bug.png';
    value.pos.x = ((Math.random() * 3) + 1) * (-200);  // Keep cars away as the game starts
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

  document.getElementById('m-dt').innerHTML = delta.toFixed(4);
  document.getElementById('m-frame').innerHTML = this.frames;
  document.getElementById('m-fps').innerHTML = this.fps;

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

  engine.collisionCheck(player, ...enemies);
};

/**
 * The second part of main loop.
 * Clean up entire canvas before actually drawing this frame.
 */
engine.cleanup = function(target) {
  target.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * The third part of main loop.
 * Invoke .render() method of all instances.
 */
engine.render = function(target) {

  map.render(target);

  enemies.forEach((value) => {
    value.render(target);
  });
  player.render(target);
};



/**
 * Handling events.
 */

 // Document ready.
(() => {
  engine.run();

  viewport.show(0.5);
  canvas.show(1, 1);

  panel.appendTo('viewport');
  btnPause.appendTo('viewport')
  btnStart.appendTo('panel');
  optChar1.appendTo('panel');
  optChar2.appendTo('panel');
  optChar3.appendTo('panel');
  optChar4.appendTo('panel');
  optChar5.appendTo('panel');
  panelMsg.appendTo('panel');

  // Hide player character before game start.
  player.pos.x = player.dest.x = 200;
  player.pos.y = player.dest.y = 650;

  setTimeout(() => {
    canvas.unfocus(0.5);
    panel.show(0.5, 0.5);
    panelMsg.show(0.5, 1);
    btnStart.show(0.5, 1.5);
  }, 4000);
})();

// Character choose
let elemChars = document.getElementsByClassName('sprite__char');
for (let i = 0; i < elemChars.length; i++) {
  elemChars[i].addEventListener('click', (event) => {
    let strArray = String(event.target.src).split('/');
    let fileName = strArray[strArray.length - 1];
    let msg;
    playerCharacter = `./images/${fileName}`;
    switch (fileName) {
      case 'char-boy.png':
        msg = 'You\'ve chosen Boy!';
        break;
      case 'char-cat-girl.png':
        msg = 'You\'ve chosen Cat Girl!';
        break;
      case 'char-horn-girl.png':
        msg = 'You\'ve chosen Horn Girl!';
        break;
      case 'char-pink-girl.png':
        msg = 'You\'ve chosen Pink Girl!';
        break;
      case 'char-princess-girl.png':
        msg = 'You\'ve chosen Princess Girl!';
        break;
    }
    panelMsg.text(msg);
  });
}

document.getElementById('btn-start').addEventListener('click', (event) => {
  engine.init();
  panel.hide(0.5);
  canvas.focus(0.5, 0.5);
  btnPause.show(0.5, 0.5)
  engine.resume();
  event.preventDefault();
});

document.getElementById('btn-pause').addEventListener('click', (event) => {
  if (engine.state) {
    engine.pause();
  } else {
    engine.resume();
  }

  event.preventDefault();
});


document.addEventListener('keydown', (event) => {
  player.react(event);
});

document.addEventListener('break', (event) => {
  player.react(event);
  switch(event.detail) {
    case 'reach':
      engine.pause();
      canvas.unfocus(0.5);
      panel.show(0.5, 0.5);
      btnPause.hide(0.1);
      audio.play(`./audio/win${Math.floor(Math.random() * 4) + 1}.wav`);
      break;
    case 'collide':
      audio.play(`./audio/hit${Math.floor(Math.random() * 2) + 1}.wav`);
  }
});



// setTimeout(() => {engine.pause()}, 4000);
// setTimeout(() => {engine.pause()}, 2000);
