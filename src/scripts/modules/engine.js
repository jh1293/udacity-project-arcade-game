export default class Engine {
  constructor() {
    this.target = null;
    this.stamp = 0;
    this.delta = 0;
    this.frames = 0;
    this.state = null;
    this.gameMode = '';
  }

  bind(context) {
    this.target = context;
  }

  get fps() {
    return this.delta === 0 ? 0: Math.trunc(1 / this.delta);
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
          this.cleanup(this.target);
          this.render(this.target);
      }
      this.loopID = window.requestAnimationFrame(loop.bind(this));
    }
    loop.call(this);
    /**
     * The engine started with the state of paused, it will switch to normal state after 1000ms.
     * Within the 1000ms, delta time will continue to be calculated, while update and render process were suspended.
     * The purpose of doing this is the make sure all update and render process were under stable delta time.
     */
    setTimeout(() => {this.state = 100}, 1000);
  }

  collisionCheck(subject, ...object) {
    let dx, dy, distance, diff_radius;
    object.forEach((value) => {
      dx = subject.collision.center.x - value.collision.center.x;
      dy = subject.collision.center.y - value.collision.center.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      diff_radius = subject.collision.radius + value.collision.radius;
      if (Number(distance) < Number(diff_radius)) {
        let event = new CustomEvent('break', {detail: 'collide'});
        document.dispatchEvent(event);
      }
    });
  }

  resume() {
    this.state = 100;
  }

  pause() {
    this.state = null;
  }

  stop() {
    window.cancelAnimationFrame(this.loopID);
  }
}
