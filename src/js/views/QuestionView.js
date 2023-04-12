import View from './View';
import { config } from '../config';

class QuestionView extends View {
  _parentElement = document.querySelector('.quiz');

  submitAnswerEventListener(handler) {
    document.querySelector('.question__btns--submit').addEventListener('click', (e) => {
      const answerId = document.querySelector('input[name="answer"]:checked').id;
      const chosenAnswer = Number(answerId.replace('answer-', '')) - 1;
      handler(chosenAnswer);
    });
  }

  fiftyFiftyEventListener(handler) {
    document.querySelector('.question__btns--fiftyfifty').addEventListener('click', (e) => {
      e.target.classList.add('disable-button');
      const { correctAnswerIndex, incorrectAnswerIndex } = handler();

      document.querySelectorAll('.question__label').forEach((label, index) => {
        if (index === correctAnswerIndex || index === incorrectAnswerIndex) return;
        label.classList.add('question__disable');
      });
    });
  }

  skipEventListener(handler) {
    document.querySelector('.skip').addEventListener('click', handler);
  }
  cacheOutEventListener(handler) {
    document.querySelector('#cache-out').addEventListener('click', handler);
  }

  generateMarkup() {
    const { questionIndex, question } = this._serverQuizData;
    return `
        <div class="question-container">
        <div class="question">
          <div class="question__info margin-bottom-medium">
            <div class="question__wrapper">
              <p class="question__difficulty">Difficulty: <span>${question.difficulty}</span></p>
              <p class="question__left">${questionIndex + 1}/${config.allowedNumOfQuestions}</p>
            </div>
            <p class="question__type">Category: ${question.category}</p>
            <h3 class="question__question">${question.question}</h3>
          </div>
          <div class="question__answers margin-bottom-small">
            <div class="question__answer-container">
              <input name="answer" id="answer-1" type="radio" class="question__checkbox" />
              <label for="answer-1" class="question__label">${question.shuffledAnswers[0]}</label>
            </div>

            <div class="question__answer-container">
              <input name="answer" id="answer-2" type="radio" class="question__checkbox" />
              <label for="answer-2" class="question__label">${question.shuffledAnswers[1]}</label>
            </div>

            <div class="question__answer-container">
              <input name="answer" id="answer-3" type="radio" class="question__checkbox" />
              <label for="answer-3" class="question__label">${question.shuffledAnswers[2]}</label>
            </div>

            <div class="question__answer-container">
              <input name="answer" id="answer-4" type="radio" class="question__checkbox" />
              <label for="answer-4" class="question__label">${question.shuffledAnswers[3]}</label>
            </div>
          </div>

          <p class="question__life-lines margin-bottom-small">Life lines are only usuable once</p>
          <div class="question__btns">
            <button class="btn btn--secondary skip ${this.#isDisabled('skip')}">skip answering</button>
            <button class="btn btn--secondary question__btns--fiftyfifty ${this.#isDisabled('fiftyFifty')}">50 / 50</button>
            <button id="cache-out" class="btn btn--secondary question__btns--hold">Cache out</button>
            <button class="btn btn--primary question__btns--submit">Submit answer</button>
          </div>
        </div>
      </div>
        `;
  }

  #isDisabled(btn) {
    const { lifelines } = this._serverQuizData;
    switch (btn) {
      case 'fiftyFifty':
        return lifelines.fiftyFifty ? 'active' : 'disable-button';
      case 'skip':
        return lifelines.skip ? 'active' : 'disable-button';
      default:
        break;
    }
  }
}

export default new QuestionView();
