import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { questionCount, resetQuestionCount } from '../store/reducer/user.action';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleAnswerButtonClick = this.handleAnswerButtonClick.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleButtonsState = this.handleButtonsState.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.saveRankingLocalStorage = this.saveRankingLocalStorage.bind(this);
    this.state = {
      timer: 30,
      isDisabled: false,
      isVisible: false,
      isRedirect: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer, isVisible } = this.state;
    if (timer < 1 && !isVisible) {
      this.timeOut();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getImageApi(hash) {
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  getLocalStorage() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return player;
  }

  startTimer() {
    const TIMER_CLOCK = 1000;
    this.timerID = setInterval(
      () => this.updateTime(),
      TIMER_CLOCK,
    );
  }

  timeOut() {
    clearInterval(this.timerID);
    this.handleButtonsState();
  }

  handleButtonsState() {
    const { isDisabled, isVisible } = this.state;
    this.setState({
      isDisabled: !isDisabled,
      isVisible: !isVisible,
    });
  }

  updateTime() {
    const TIMER_DECREASE = 1;
    this.setState((previousState) => ({
      timer: previousState.timer - TIMER_DECREASE,
    }));
  }

  handleAnswerButtonClick({ target: { name } }) {
    this.handleButtonsState();
    clearInterval(this.timerID);
    if (name === 'correct') this.updateScore();
  }

  handleNextButtonClick() {
    const { dispatchQuestionCount, questionCounter, resetQuestion } = this.props;
    const NEXT_QUESTIONS_LIMIT = 4;
    if (questionCounter === NEXT_QUESTIONS_LIMIT) {
      this.saveRankingLocalStorage();
      this.setState({ isRedirect: true });
      resetQuestion();
    }
    dispatchQuestionCount();
    this.setState({
      timer: 30,
    });
    this.handleButtonsState();
    this.startTimer();
  }

  updateScore() {
    const { timer } = this.state;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { questionCounter, questions } = this.props;
    const weight = {
      easy: 1,
      medium: 2,
      hard: 2,
    };
    const BASE_SCORE = 10;
    const ASSERTIONS_ADD = 1;
    const { difficulty } = questions[questionCounter];
    const questionScore = BASE_SCORE + weight[difficulty] + timer;
    localStorage.setItem('state', JSON
      .stringify({
        player: {
          ...player,
          score: player.score + questionScore,
          assertions: player.assertions + ASSERTIONS_ADD,
        },
      }));
  }

  saveRankingLocalStorage() {
    console.log('entrei');
    const { name, score, gravatarEmail } = this.getLocalStorage();
    const image = this.getImageApi(md5(gravatarEmail));

    const objectRankingPlayer = {
      name,
      score,
      image,
    };

    const ranking = [...JSON.parse(localStorage.getItem('ranking')), objectRankingPlayer];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { handleAnswerButtonClick, handleNextButtonClick } = this;
    const { timer, isDisabled, isVisible, isRedirect } = this.state;
    const { questionCounter, questions } = this.props;
    if (isRedirect) return <Redirect to="/feedback" />;
    if (!questions) return <div>Loading...</div>;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionCounter];
    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          disabled={ isDisabled }
          type="button"
          name="correct"
          className="correct-answer"
          data-testid="correct-answer"
          onClick={ (event) => handleAnswerButtonClick(event) }
        >
          { correctAnswer }
        </button>
        {
          incorrectAnswers
            .map((answer, index) => (
              <button
                disabled={ isDisabled }
                name="wrong"
                key={ answer }
                className="wrong-answer"
                type="button"
                onClick={ (event) => handleAnswerButtonClick(event) }
                data-testid={ `wrong-answer-${index}` }
              >
                { answer }
              </button>))
        }
        <p>{ `Tempo: ${timer}s` }</p>
        {
          (isVisible)
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ handleNextButtonClick }
            >
              Próxima
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.results,
  questionCounter: state.userReducer.questionCount,
  isFetching: state.triviaReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestionCount: () => dispatch(questionCount()),
  resetQuestion: () => dispatch(resetQuestionCount()),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchQuestionCount: PropTypes.func.isRequired,
  questionCounter: PropTypes.number.isRequired,
  resetQuestion: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
