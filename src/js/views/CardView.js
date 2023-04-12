import View from './View';
import icons from 'url:../../images/sprites.svg'; // Required for parcel to work

class CardView extends View {
  _parentElement = document.querySelector('.quiz');

  cardEventListener(handler) {
    document.querySelector('.card-container').addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const newCategoryState = card.dataset.quiz;
      handler(newCategoryState);
    });
  }

  generateMarkup() {
    return `
    <div class="card-container">
    <div class="card" data-quiz="general">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-shuffle"></use>
        </svg>
      </div>
      <h4 class="card__category">General questions</h4>
    </div>

    <div class="card" data-quiz="movies">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-videocam"></use>
        </svg>
      </div>
      <h4 class="card__category">Movie questions</h4>
    </div>

    <div class="card" data-quiz="music">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-play"></use>
        </svg>
      </div>
      <h4 class="card__category">Music questions</h4>
    </div>

    <div class="card" data-quiz="food">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-fast-food"></use>
        </svg>
      </div>
      <h4 class="card__category">Food questions</h4>
    </div>

    <div class="card" data-quiz="geography">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-locate"></use>
        </svg>
      </div>
      <h4 class="card__category">Geography questions</h4>
    </div>

    <div class="card" data-quiz="sport">
      <div class="card__icon-container">
        <svg class="card__icon">
          <use href="${icons}#icon-sport"></use>
        </svg>
      </div>
      <h4 class="card__category">Sport questions</h4>
    </div>
  </div>`;
  }
}

export default new CardView();
