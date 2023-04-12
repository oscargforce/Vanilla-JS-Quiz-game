import typedView from './views/TypedView';
import { config } from './config';
import * as model from './model';
import cardView from './views/CardView';
import resultView from './views/ResultView';
import questionView from './views/QuestionView';

function init() {
  model.resetStates();
  cardView.render();
  typedView.startTypedJs();
  cardView.cardEventListener(renderQuizHandler);
}

init();

async function renderQuizHandler(chosenCategory) {
  try {
  // 1) Update states with the clicked category.
  model.states.category = chosenCategory;
  // 2) Render spinner.
  questionView.renderSpinner();
  typedView.stopTypedJs();
  // 3) Send the request and set model.state.quiz object.
  await model.getQuizsFromServer();
  // 4) Render first question.
  const { questionIndex, quiz, lifelines } = model.states;
  const question = quiz[questionIndex];
  questionView.render({ questionIndex, question, lifelines });
  addQuestionViewListeners();
  console.log(model.states);
  } catch (error) {
    questionView.renderError(error.stack)
  }
}

function addQuestionViewListeners() {
  questionView.submitAnswerEventListener(submitAnswerHandler);
  questionView.fiftyFiftyEventListener(fiftyFiftyHandler);
  questionView.skipEventListener(skipQuestionHandler);
  // Only for the cache-out button
  questionView.cacheOutEventListener(init);
}

function addResutViewListeners() {
  resultView.nextBtnEventListener(nextQuestionHandler);
  resultView.restartEventListener(init);
}

function submitAnswerHandler(submitedAnswer) {
  resultView.renderSpinner();
  const question = model.states.quiz[model.states.questionIndex];
  const answer = question.shuffledAnswers[submitedAnswer];
  incrementQuestionIndex();
  if (answer === question.correctAnswer) {
    model.increasePriceMoney();
    resultView.render({ result: true, price: model.states.priceMoney, won: model.states.won });
  } else {
    resultView.render({
      result: false,
      price: model.states.priceMoney,
      correctAnswer: question.correctAnswer,
    });
  }
  addResutViewListeners();
}

function fiftyFiftyHandler() {
  const question = model.states.quiz[model.states.questionIndex];
  // Get random incorrect answer from array.
  const incorrectAnswer = question.incorrectAnswers[Math.trunc(Math.random() * question.incorrectAnswers.length)];
  // Find the random incorrect answer in the renderd answer array.
  const incorrectAnswerIndex = question.shuffledAnswers.indexOf(incorrectAnswer);
  const correctAnswerIndex = question.shuffledAnswers.indexOf(question.correctAnswer);
  model.states.lifelines.fiftyFifty = false;
  return { correctAnswerIndex, incorrectAnswerIndex };
}

function incrementQuestionIndex() {
  const quiz = model.states.quiz;
  const questionIndex = model.states.questionIndex + 1;
  if (!Array.isArray(quiz) || !quiz.length) return;
  if (questionIndex === config.allowedNumOfQuestions) model.states.won = true;
  model.states.questionIndex++;
}

function skipQuestionHandler() {
  model.states.lifelines.skip = false;
  model.increasePriceMoney();
  incrementQuestionIndex();
  nextQuestionHandler();
}

function nextQuestionHandler() {
  console.log(model.states.questionIndex);
  const { questionIndex, quiz, lifelines } = model.states;
  const question = quiz[questionIndex];
  questionView.render({ questionIndex, question, lifelines });
  addQuestionViewListeners();
}
