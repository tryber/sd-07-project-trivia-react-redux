import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions, updateAssertions } from '../actions';
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
  }

  shuffle(answers) {
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  handleAnswer({ target: { name } }) {
    const { assertionAction } = this.props;
    const answerButtons = document.querySelectorAll('.hidden');
    answerButtons.forEach((button) => button.classList.remove('hidden'));
    if (name === 'correct') {
      assertionAction();
    }
    this.setState({
      nextQuestion: true,
    });
  }

  handleNext() {
    const { questions, history, assertions } = this.props;
    const { currentQuestion } = this.state;
    const mockData = {
      player: {
        score: assertions,
        assertions,
      },
    };
    setStorage('state', mockData);
    if (currentQuestion !== questions.length - 1) {
      this.setState((prevSate) => ({
        currentQuestion: prevSate.currentQuestion + 1,
        nextQuestion: false,
      }));
    } else {
      history.push('/feedbacks');
    }
  }

  disableQuestion() {
    const { timer } = this.state;
    if (timer <= 0) {
      this.setState({ disabledTimeOut: true });
    }
  }

  timeOut() {
    const ONE_SEC = 1000;
    setInterval(() => {
      this.setState(
        (state) => ({
          timer: state.timer - 1,
        }),
        this.disableQuestion,
      );
    }, ONE_SEC);
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, nextQuestion, timer, disabledTimeOut } = this.state;
    if (questions === undefined) return <p>Loading...</p>;
    const question = questions[currentQuestion];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = question;
    const answers = [correctAnswer, ...incorrectAnswers];
    const taggedAnswers = question.type !== 'boolean' ? [{
      correct: true,
      answer: answers[0],
    },
    {
      correct: false,
      answer: answers[1],
      index: 0,
    },
    {
      correct: false,
      answer: answers[2],
      index: 1,
    },
    {
      correct: false,
      answer: answers[3],
      index: 2,
    }]
      : [{
        correct: true,
        answer: answers[0],
      },
      {
        correct: false,
        answer: answers[1],
        index: 0,
      }];
    const randomAnswers = this.shuffle(taggedAnswers);
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
          {randomAnswers.map((answer) => (
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
              onClick={ (e) => this.handleAnswer(e) }
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
  assertionAction: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (questions) => dispatch(fetchQuestions(questions)),
  assertionAction: () => dispatch(updateAssertions()),
});

const mapStateToProps = (state) => ({
  isLoading: state.game.isLoading,
  questions: state.game.questions.results,
  token: state.login.token,
  assertions: state.game.assertions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
