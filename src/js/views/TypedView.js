import Typed from 'typed.js';

class TypedView {
  #typed;
  #containerElement = document.querySelector('#typedjs-container');
  constructor() {
    this.#typed = this.#createTypedJs();
  }
  
  #createTypedJs() {
    return new Typed('#typedjs', {
      strings: ['Choose your category', 'Good luck!', 'You will need it.'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
      showCursor: true,
    });
  }

  stopTypedJs() {
    this.#containerElement.classList.remove('margin-bottom-large');
    this.#typed.destroy();
  }

  startTypedJs() {
    // Destroying first, to prevent multiple instances from being created, when double clicking.
    this.#typed.destroy();
    this.#typed = this.#createTypedJs();

    const isClassNamePresent = this.#containerElement.classList.contains('margin-bottom-large');
    if (isClassNamePresent) return;
    this.#containerElement.classList.add('margin-bottom-large');
  }
}

export default new TypedView();
