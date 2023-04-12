import { config } from './config';

export let states = {
  category: '',
  questionIndex: 0,
  quiz: [
    {
      category: '',
      difficulty: '',
      correctAnswer: '',
      incorrectAnswers: [],
      question: '',
      shuffledAnswers: [],
    },
  ],
  lifelines: { fiftyFifty: true, skip: true },
  priceMoney: 0,
  won: false,
};

export async function getQuizsFromServer() {
  try {
    const responseBody = await AJAX(getRequestUrl());
    states.quiz = responseBody;

    states.quiz.forEach((quiz, i) => {
      const shuffledArray = shuffleQuizAnswers(quiz);
      states.quiz[i].shuffledAnswers = shuffledArray;
    });
  } catch (error) {
    throw error;
  }
}

async function AJAX(requestUrl) {
  try {
    const response = await fetch(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw Error(`RequestUrl: ${response.url}
    Status code: ${response.status}
    Response body: ${await response.json()}`);

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function getRequestUrl() {
  // Flow: user clicks on a category -> View sends the click info to the controller -> controller set the state.category value.
  const category = config.categories[states.category];
  const requestUrl = config.setRequestUrl(category);
  return requestUrl;
}

function shuffleQuizAnswers(quiz) {
  let shuffledAnswers = [quiz.correctAnswer, ...quiz.incorrectAnswers];
  let currentIndex = shuffledAnswers.length;
  let randomIndex;

  for (let i = 0; i < shuffledAnswers.length; i++) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // Swap places.
    [shuffledAnswers[currentIndex], shuffledAnswers[randomIndex]] = [shuffledAnswers[randomIndex], shuffledAnswers[currentIndex]];
  }

  return shuffledAnswers;
}

export function increasePriceMoney() {
  states.priceMoney += config.incrementPrice;
}

export function resetStates() {
  states = {
    category: '',
    questionIndex: 0,
    quiz: [
      {
        category: '',
        difficulty: '',
        correctAnswer: '',
        incorrectAnswers: [],
        question: '',
        shuffledAnswers: [],
      },
    ],
    lifelines: { fiftyFifty: true, skip: true },
    priceMoney: 0,
    won: false,
  };
}
