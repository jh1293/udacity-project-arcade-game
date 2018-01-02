export default class UI {
  constructor() {
    this.viewport = {
      element: null,
      create: (width, height) => {
        this.element = document.createElement('div');
        this.element.className = 'viewport';
        this.element.id = 'viewport';
        this.element.style.width = String(width) + 'px';
        this.element.style.height = String(height) + 'px';
        document.body.appendChild(this.element);
      }
    };
  }

  update() {

  }

  render() {

  }
}
