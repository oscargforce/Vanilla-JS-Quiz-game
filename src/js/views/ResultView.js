import View from './View';
import icons from 'url:../../images/sprites.svg'; // Required for parcel to work
import { config } from '../config';

class ResultView extends View {
  _parentElement = document.querySelector('.quiz');

  generateMarkup() {
    if (this._serverQuizData.won) return this.#winQuizMarkup();
    return this._serverQuizData.result ? this.#correctAnswerMarkup() : this.#wrongAnswerMarkup();
  }

  #wrongAnswerMarkup() {
    const { correctAnswer } = this._serverQuizData;
    return `
        <div class="result">
        <h2 class="result__title margin-bottom-small">Better luck next time</h2>
        <div class="result__icon-container margin-bottom-ms">
          <svg class="result__icon result__icon--wrong">
            <use href="${icons}#icon-cross"></use>
          </svg>
        </div>
        <p class="result__answer margin-bottom-medium">Correct answer was: <strong>${correctAnswer}</strong></p>
        <button id="home" class="btn btn--secondary">Back to start page</button>
      </div>
        `;
  }

  #correctAnswerMarkup() {
    const { price } = this._serverQuizData;
    return `
        <div class="result">
        <h2 class="result__title margin-bottom-small">Do you want to continue?</h2>
        <div class="result__icon-container margin-bottom-ms">
          <svg class="result__icon result__icon--right">
            <use href="${icons}#icon-checkmark"></use>
          </svg>
        </div>
        <p class="result__answer margin-bottom-medium">Current currency: <strong>$${price}</strong>. Next question is for: <strong>$${
      price + config.incrementPrice
    }</strong></p>
        <button id="home" class="btn btn--secondary margin-right-small">No, I will cache out</button>
        <button id="next" class="btn btn--primary">Next</button>
      </div>
      `;
  }
  #winQuizMarkup() {
    return `
    <h2 class="header header--two result__win margin-bottom-medium">Congrats you are not an idiot!</h2>
    <div class="center-button">
    <button id="home" class="btn btn--primary">Back to Homepage</button>
    </div>
    `;
  }

  nextBtnEventListener(handler) {
    document.querySelector('#next')?.addEventListener('click', (e) => {
      const element = e.target.closest('#next');
      if (!element) return;
      handler();
    });
  }

  restartEventListener(handler) {
    document.querySelector('#home').addEventListener('click', handler);
  }
}

export default new ResultView();
