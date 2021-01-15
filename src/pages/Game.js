import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchQuestions,
  updateAssertions,
  updateRandomAnswers,
  updateScore,
} from '../actions';
import GameHeader from '../components/GameHeader';
import { setStorage } from '../services';
import '../style/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      nextQuestion: false,
      disabledTimeOut: false,
      timer: 30,
    };
    this.shuffle = this.shuffle.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
    this.playerLocalStorage = this.playerLocalStorage.bind(this);
  }

  async componentDidMount() {
    this.timeOut();
    const mockData = {
      player: {
        score: 0,
        assertions: 0,
      },
    };
    setStorage('state', mockData);
    const { requestQuestions, token } = this.props;
    await requestQuestions(token);
    this.playerLocalStorage();
  }

  shuffle(answers) {
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  async handleAnswer({ target: { name } }, difficulty) {
    console.log('handle', difficulty);
    const { assertionsAction, scoreAction } = this.props;
    const { timer } = this.state;
    const answerButtons = document.querySelectorAll('.hidden');
    answerButtons.forEach((button) => button.classList.remove('hidden'));
    if (name === 'correct') {
      await scoreAction(timer, difficulty);
      await assertionsAction();
    }
    this.setState({ nextQuestion: true });
    this.playerLocalStorage();
  }

  handleNext() {
    const { questions, history, assertions, randomAnswersAction } = this.props;
    const { currentQuestion } = this.state;
    const mockData = {
      player: {
        score: assertions,
        assertions,
      },
    };
    setStorage('state', mockData);
    if (currentQuestion !== questions.length - 1) {
      randomAnswersAction({ randomAnswers: [], sorted: false });
      this.setState((prevSate) => ({
        currentQuestion: prevSate.currentQuestion + 1,
        nextQuestion: false,
        timer: 30,
      }));
    } else {
      history.push('/feedbacks');
    }
  }

  disableQuestion() {
    const { timer } = this.state;
    console.log('disableQuestion');
    if (timer <= 0) {
      this.setState({ disabledTimeOut: true });
    }
  }

  timeOut() {
    const ONE_SEC = 1000;
    console.log('timeOut');
    setInterval(() => {
      this.setState(
        (state) => ({
          timer: state.timer - 1,
        }),
        this.disableQuestion,
      );
    }, ONE_SEC);
  }

  playerLocalStorage() {
    const { name, assertions, email, score } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { questions, randomAnswersAction, randomAnswers, sorted } = this.props;
    const { currentQuestion, nextQuestion, timer, disabledTimeOut } = this.state;
    if (questions === undefined) return <p>Loading...</p>;
    const question = questions[currentQuestion];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty,
    } = question;
    const answers = [correctAnswer, ...incorrectAnswers];
    const taggedAnswers = question.type !== 'boolean' ? [{
      correct: true,
      answer: answers[0],
      difficulty,
    },
    {
      correct: false,
      answer: answers[1],
      index: 0,
      difficulty,
    },
    {
      correct: false,
      answer: answers[2],
      index: 1,
      difficulty,
    },
    {
      correct: false,
      answer: answers[3],
      index: 2,
      difficulty,
    }]
      : [{
        correct: true,
        answer: answers[0],
        difficulty,
      },
      {
        correct: false,
        answer: answers[1],
        index: 0,
        difficulty,
      }];
    const randomAnswersLocal = sorted ? randomAnswers : this.shuffle(taggedAnswers);
    randomAnswersAction({ randomAnswers: randomAnswersLocal, sorted: true });
    return (
      <div>
        <GameHeader />
        <div key={ question.question }>
          <h4 key={ question.category } data-testid="question-category">
            {question.category}
          </h4>
          <h3 data-testid="question-text">
            {question.question}
          </h3>
          {randomAnswersLocal.map((answer) => (
            <button
              className={ `hidden ${answer.correct ? 'rightGreen' : 'wrongRed'}` }
              type="button"
              key={ answer.answer }
              name={ answer.correct
                ? 'correct'
                : 'wrong' }
              data-testid={ answer.correct
                ? 'correct-answer'
                : `wrong-answer-${answer.index}` }
              onClick={ (e) => this.handleAnswer(e, answer.difficulty) }
              disabled={ disabledTimeOut }
            >
              {answer.answer}
            </button>
          ))}
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNext }
            style={ nextQuestion ? { visibility: 'visible' } : { visibility: 'hidden' } }
            disabled={ disabledTimeOut }
          >
            Próxima pergunta
          </button>
          {!disabledTimeOut && timer}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    length: PropTypes.number.isRequired,
  }).isRequired,
  requestQuestions: PropTypes.func.isRequired,
  assertionsAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  scoreAction: PropTypes.func.isRequired,
  randomAnswersAction: PropTypes.func.isRequired,
  randomAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  sorted: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (questions) => dispatch(fetchQuestions(questions)),
  assertionsAction: () => dispatch(updateAssertions()),
  scoreAction: (payload, difficulty) => dispatch(updateScore(payload, difficulty)),
  randomAnswersAction: (payload) => dispatch(updateRandomAnswers(payload)),

});

const mapStateToProps = (state) => ({
  isLoading: state.game.isLoading,
  questions: state.game.questions.results,
  token: state.login.token,
  name: state.login.name,
  email: state.login.email,
  score: state.game.score,
  assertions: state.game.assertions,
  randomAnswers: state.game.randomAnswers,
  sorted: state.game.sorted,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
