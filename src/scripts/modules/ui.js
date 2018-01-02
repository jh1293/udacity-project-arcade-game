export default class UI {
  constructor() {
    this.viewport = {
      element: null,
      create: (width, height) => {
        this.viewport.element = document.createElement('div');
        this.viewport.element.className = 'viewport';
        this.viewport.element.id = 'viewport';
        this.viewport.element.style.width = String(width) + 'px';
        this.viewport.element.style.height = String(height) + 'px';
        document.body.appendChild(this.viewport.element);
      }
    };
  }

  update() {

  }

  render() {

  }
}
