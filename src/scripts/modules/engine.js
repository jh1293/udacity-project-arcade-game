export default class Engine {
  constructor() {
    this.window = global.window;
    this.document = global.document;
    this.canvas = global.document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stamp = 0;
    this.delta = 0;
    this.frames = 0;
    this.state = null;
  }

  get fps() {
    return this.delta === 0 ? 0: Math.trunc(1 / this.delta);
  }

  create(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.document.body.appendChild(this.canvas);
  }

  run() {
    // Initialization was seperated from main loop, which will only be called once.
    this.init();
    function loop(stamp) {
      this.delta = (stamp - this.stamp) / 1000;
      this.stamp = stamp;
      /**
       * Divide the main loop into two seperated states.
       * With state 100, main loop runs as normal.
       * With state null, delta calculation runs as normal, while update and render process were been suspended.
       * This way, main loop can be controlled at will.
       */
      if (this.state === 100) {
          this.frames++;
          this.update(this.delta);
          this.cleanup();
          this.render();
      }
      this.loopID = this.window.requestAnimationFrame(loop.bind(this));
    }
    loop.call(this);
    /**
     * The engine started with the state of paused, it will switch to normal state after 1000ms.
     * Within the 1000ms, delta time will continue to be calculated, while update and render process were suspended.
     * The purpose of doing this is the make sure all update and render process were under stable delta time.
     */
    setTimeout(() => {this.state = 100}, 1000);
  }

  resume() {
    this.state = 100;
  }

  pause() {
    this.state = null;
  }

  stop() {
    this.window.cancelAnimationFrame(this.loopID);
  }
}
