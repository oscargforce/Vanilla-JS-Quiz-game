import icons from 'url:../../images/sprites.svg'; // Required for Parcel to work.

export default class View {
  /** Property is used by the child classes. Holds the ```states```object from model.js */
  _serverQuizData;

  #clearInnerHtml() {
    this._parentElement.innerHTML = '';
  }

  render(serverQuizData) {
    this._serverQuizData = serverQuizData;
    const html = this.generateMarkup();
    this.#clearInnerHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(error) {
    this.#clearInnerHtml();
    const html = `
    <div class="error-container">
      <h2 class="header header--two error-header">Oops! Something went wrong...</h2>
      <h2 class="header header--two error-header">Reload the page and try again.</h2>
      <p class="error-message">${error}</p>
  </div>`;
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderSpinner() {
    this.#clearInnerHtml();
    const html = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}

/*
insertAdjacentHTML()

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->

*/
