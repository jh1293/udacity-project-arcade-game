export default class Input {
  constructor() {

  }

  listen() {
    document.addEventListener('keyup', (event) => {
      switch (event.key) {
        case "ArrowUp":
          console.log('up');
          break;
        case "ArrowDown":
          break;
        case "ArrowLeft":
          break;
        case "ArrowRight":
          break;
      }
      event.preventDefault();
    });
  }
}
