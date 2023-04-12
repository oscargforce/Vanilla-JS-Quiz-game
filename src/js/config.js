export const config = {
  allowedNumOfQuestions: 5,

  setRequestUrl(category) {
    return `https://the-trivia-api.com/api/questions?categories=${category}&limit=${this.allowedNumOfQuestions}&region=SE`;
  },
  categories: {
    general: 'general_knowledge',
    movies: 'film_and_tv',
    music: 'music',
    food: 'food_and_drink',
    geography: 'geography',
    sport: 'sport_and_leisure',
  },
  incrementPrice: 1000,
};
