import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTriviaQuestions } from '../../store/ducks/triviaQuestions';
import { addScore } from '../../store/ducks/user';
import './GameQuestions.css';
import Timer from '../Timer';

class GameQuestions extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestion: 0,
      revealAnswer: false,
    };

    this.timeOver = this.timeOver.bind(this);
    this.timer = React.createRef();
    this.clickAnswer = this.clickAnswer.bind(this);
    this.clickNextQuestion = this.clickNextQuestion.bind(this);

    this.CORRECT_ANSWER_VALUE = 10;
    this.difficultyLevel = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
  }

  async componentDidMount() {
    const { getTriviaQuestions } = this.props;
    await getTriviaQuestions();
  }

  timeOver() {
    this.setState({ revealAnswer: true });
  }

  clickNextQuestion() {
    this.setState((state) => ({
      currentQuestion: state.currentQuestion + 1,
      revealAnswer: false,
    }));
    this.timer.current.resetTimer();
    this.timer.current.startTimer();
  }

  clickAnswer(isCorrect, difficulty) {
    const { addScoreQuestion } = this.props;
    this.setState({ revealAnswer: true });
    const timeLeft = this.timer.current.stopTimer();
    if (isCorrect) {
      const scoreQuestion = this.CORRECT_ANSWER_VALUE
        + (this.difficultyLevel[difficulty] * timeLeft);
      addScoreQuestion(scoreQuestion);
    }
  }

  render() {
    const { questions, isLoading } = this.props;
    const { currentQuestion, revealAnswer } = this.state;
    if (isLoading) { return <h1>Loading...</h1>; }
    return (
      <>
        <h3>
          Category:
          <span data-testid="question-category">
            {questions.length && questions[currentQuestion].category}
          </span>
        </h3>
        <h3>
          {`Question ${currentQuestion + 1}: `}
          <span data-testid="question-text">
            {questions.length && questions[currentQuestion].question}
          </span>
        </h3>
        <h3>
          Answers:
          <span data-testid="question-text">
            {
              questions.length
              && questions[currentQuestion].randomAnswers
                .map((answer) => (
                  <button
                    type="button"
                    disabled={ revealAnswer }
                    className={ (revealAnswer
                      && (answer.correct ? 'correctAnswer' : 'wrongAnswer')).toString() }
                    key={ answer.text }
                    data-testid={ answer.dataTestid }
                    onClick={ () => this.clickAnswer(
                      answer.correct,
                      questions[currentQuestion].difficulty,
                    ) }
                  >
                    {answer.text}
                  </button>))
            }
          </span>
        </h3>
        <Timer
          stopTimer={ revealAnswer }
          handleTimeOver={ this.timeOver }
          ref={ this.timer }
        />
        <button
          hidden={ !revealAnswer }
          type="button"
          data-testid="btn-next"
          onClick={ () => this.clickNextQuestion() }
        >
          Next
        </button>
      </>
    );
  }
}

GameQuestions.propTypes = {
  getTriviaQuestions: PropTypes.func.isRequired,
  addScoreQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.triviaQuestions.questions,
  isLoading: state.triviaQuestions.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: () => dispatch(fetchTriviaQuestions()),
  addScoreQuestion: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
