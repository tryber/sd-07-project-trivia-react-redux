import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestionNAnswer } from '../../services';
import { addScore } from '../../store/ducks/player/actions';
import './Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);
    this.handleClickNextQuestion = this.handleClickNextQuestion.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);

    this.state = {
      questions: [],
      isLoading: true,
      questionNumber: 0,
      isDisabled: false,
      counterInterval: 30,
      counter: 0,
      toStorage: false,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    const milisegundos = 1000;
    setInterval(this.countdown, milisegundos);
    this.setLocalStorage(0, 0);
  }

  setLocalStorage(totalScore, assertions) {
    console.log('chamou setLocalStorge');
    const { playerProps } = this.props;
    const { name, gravatarEmail } = playerProps;
    const playerToStorage = { player: {
      name,
      assertions,
      score: totalScore,
      gravatarEmail } };
    localStorage.setItem('state', JSON.stringify(playerToStorage));
  }

  resetCounter() {
    const milisegundos = 1000;
    this.setState({ counterInterval: 30, counter: 0 });
    setInterval(this.countdown, milisegundos);
  }

  async fetchQuestions() {
    const token = localStorage.getItem('token');
    const result = await fetchQuestionNAnswer(token);
    this.setState({ questions: result, isLoading: false });
  }

  countdown() {
    const { counterInterval } = this.state;
    return counterInterval > 0
      ? this.setState((prevState) => ({ ...prevState,
        counterInterval: prevState.counterInterval - 1 }))
      : this.setState({ counterInterval: 0, isDisabled: true });
  }

  calculateScore() {
    console.log('chamou a calculate');
    const { questions, questionNumber, counterInterval } = this.state;
    const { scoreProps, addScoreAction, assertionsProps } = this.props;
    const questionLevel = questions[questionNumber].difficulty;
    let levelScore = 1;
    const hardLevelScore = 3;
    const defaultPoint = 10;

    if (questionLevel === 'easy') {
      levelScore = 1;
    } else if (questionLevel === 'medium') {
      levelScore = 2;
    } else {
      levelScore = hardLevelScore;
    }

    const totalScore = scoreProps + (defaultPoint + counterInterval * levelScore);
    console.log(totalScore);

    const assertions = assertionsProps + 1;

    addScoreAction(totalScore, assertions);
    this.setLocalStorage(totalScore, assertions);
  }

  handleClick({ target }) {
    console.log('click');
    this.setState({ isDisabled: true });
    if (target.className === 'correct-answer') this.calculateScore();
  }

  handleClickNextQuestion() {
    this.setState((prevState) => ({ ...prevState,
      questionNumber: prevState.questionNumber + 1 }));
    this.resetCounter();
    this.setState({ isDisabled: false });
  }

  render() {
    const { questions,
      isLoading,
      questionNumber,
      isDisabled,
      counterInterval } = this.state;

    if (isLoading) return <h1>Is Loading</h1>;

    const numberOfQuestions = 4;
    if (questionNumber > numberOfQuestions) return <Redirect to="/feedback" />;

    const questionToLoad = questions[questionNumber];

    return (
      <div className="questions-display">
        <div>
          <h2 className="timer">{`Timer: ${counterInterval}` }</h2>
        </div>
        <div>
          <h1>{`Question: ${questionNumber + 1}`}</h1>
          <h2 data-testid="question-category">{ questionToLoad.category }</h2>
          <h2 data-testid="question-text">{ questionToLoad.question }</h2>
          <button
            data-testid="correct-answer"
            type="button"
            className="correct-answer"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            { questionToLoad.correct_answer }
          </button>
          { questionToLoad.incorrect_answers
            .map((answer, index) => (
              <button
                data-testid={ `wrong-answer-${index}` }
                type="button"
                className="wrong-answer"
                disabled={ isDisabled }
                onClick={ this.handleClick }
                key={ index }
              >
                { answer }
              </button>)) }
        </div>
        <div>
          <button
            data-testid="btn-next"
            type="button"
            hidden={ !isDisabled }
            onClick={ () => this.handleClickNextQuestion() }
          >
            Next Question

          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerProps: state.player,
  scoreProps: state.player.score,
  assertionsProps: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  addScoreAction: (score, assertions) => dispatch(addScore(score, assertions)),
});

Questions.propTypes = {
  scoreProps: PropTypes.number.isRequired,
  assertionsProps: PropTypes.number.isRequired,
  addScoreAction: PropTypes.func.isRequired,
  playerProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
