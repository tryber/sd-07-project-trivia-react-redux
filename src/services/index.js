const API_URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

async function fetchToken() {
  const response = await fetch(API_URL_TOKEN);
  const result = await response.json();
  return result;
}

const five = 5;
const getRandomNumber = () => Math.floor(Math.random() * five);

function toRamQuestion(questions) {
  const newAnswer = questions.map((question) => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    return answers.reduce((acc, answer, index) => {
      acc[index] = { position: index, number: getRandomNumber(), answer };
      return acc.sort((answer1, answer2) => answer2.number - answer1.number);
    }, []);
  });

  const questionsOrdered = questions.map((question, index) => {
    const newQuestion = {
      question: question.question,
      category: question.category,
      answers: newAnswer[index],
      difficulty: question.difficulty,
    };
    return newQuestion;
  });
  return questionsOrdered;
}

async function fetchQuestionNAnswer(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  const questions = result.results;
  const readyQuestion = toRamQuestion(questions);

  return readyQuestion;
}

export { fetchToken, fetchQuestionNAnswer };
