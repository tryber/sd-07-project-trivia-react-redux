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

    this.state = {
      questions: [],
      isLoading: true,
      questionNumber: 0,
      isDisabled: false,
      counterInterval: 30,
      counter: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    const milisegundos = 1000;
    setInterval(this.countdown, milisegundos);
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
    const { questions, questionNumber, counterInterval } = this.state;
    const { scoreProps, assertionsProps, addScoreAction } = this.props;
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
    addScoreAction(totalScore, assertionsProps + 1);
  }

  handleClick({ target }) {
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
  scoreProps: state.player.score,
  assertionsProps: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  addScoreAction: (score, assertions) => dispatch(addScore(score, assertions)),
});

Questions.propTypes = {
  scoreProps: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
