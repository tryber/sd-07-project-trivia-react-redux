import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/api';
import { updateScoreAction } from '../actions/index';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      buttonColorVisible: false,
      disableButton: false,
      seconds: 30,
      questions: [],
      isLoading: true,
      lastQuestion: false,
      assertions: 0,
      score: 0,
    };
    this.timer = 0;
    this.oneQuestion = this.oneQuestion.bind(this);
    this.answerAnalyze = this.answerAnalyze.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.updateItensInLocalStorage = this.updateItensInLocalStorage.bind(this);
  }

  componentDidMount() {
    this.updateItensInLocalStorage();
    this.startTimer();
    this.getQuestions();
  }

  oneQuestion(indexQuestion) {
    const { buttonColorVisible, questions, disableButton, lastQuestion } = this.state;
    const options = [...questions[indexQuestion].incorrect_answers,
      questions[indexQuestion].correct_answer].sort();
    if (lastQuestion) return <Redirect to="/feedback" />;
    return (
      <div>
        <div key={ Math.random() }>
          <h5 data-testid="question-category">
            {questions[indexQuestion].category}
          </h5>
          <h5 data-testid="question-text">
            {questions[indexQuestion].question}
          </h5>
          {options
            .map((answer, index) => (
              <button
                key={ index }
                data-testid={
                  answer === questions[indexQuestion].correct_answer
                    ? 'correct-answer' : `wrong-answer-${index}`
                }
                className={ buttonColorVisible
                  && (answer === questions[indexQuestion].correct_answer
                    ? 'correctAnswer' : 'incorrectAnswer') }
                value={ answer === questions[indexQuestion].correct_answer
                  ? 'correct' : 'incorrect' }
                type="button"
                disabled={ disableButton }
                onClick={ (event) => this.answerAnalyze(event) }
              >
                { answer}
              </button>))}
          <button
            data-testid="btn-next"
            type="button"
            hidden={ !disableButton }
            onClick={ () => this.clickNextQuestion() }
          >
            Next Question
          </button>
        </div>
      </div>
    );
  }

  async getQuestions() {
    const { token } = this.props;
    const questionsResponse = await fetchQuestions(token);
    const questions = questionsResponse.results;
    this.setState({ questions, isLoading: false });
  }

  // Referência p/ timer: https://stackoverflow.com/questions/40885923/countdown-timer-in-react
  startTimer() {
    const { seconds } = this.state;
    const oneSecond = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, oneSecond);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let { seconds } = this.state;
    seconds -= 1;
    this.setState({
      seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({ disableButton: true });
    }
  }

  answerAnalyze(event) {
    this.setState({
      buttonColorVisible: true,
      disableButton: true,
    });

    const { questions, indexQuestion, seconds, assertions, score } = this.state;
    const { updateScore } = this.props;
    const { value } = event.target;
    const ten = 10;
    const one = 1;
    const two = 2;
    const three = 3;
    if (value === 'correct') {
      switch (questions[indexQuestion].difficulty) {
      case 'easy':
        this.updateItensInLocalStorage(assertions + 1, score + (ten + (seconds * one)));
        updateScore(assertions + 1, score + (ten + (seconds * one)));
        this.setState(
          {
            score: score + (ten + (seconds * one)),
            assertions: assertions + 1,
          },
        );
        break;
      case 'medium':
        this.updateItensInLocalStorage(assertions + 1, score + (ten + (seconds * two)));
        updateScore(assertions + 1, score + (ten + (seconds * two)));
        this.setState(
          {
            score: score + (ten + (seconds * two)),
            assertions: assertions + 1,
          },
        );
        break;
      case 'hard':
        this.updateItensInLocalStorage(assertions + 1, score + (ten + (seconds * three)));
        updateScore(assertions + 1, score + (ten + (seconds * three)));
        this.setState(
          {
            score: score + (ten + (seconds * three)),
            assertions: assertions + 1,
          },
        );
        break;
      default:
        break;
      }
      // this.setState((prevState) => ({ assertions: prevState.assertions + 1 }));
    } else {
      this.updateItensInLocalStorage(assertions, score);
    }
  }

  updateItensInLocalStorage(assertions = 0, score = 0) {
    const { name, email } = this.props;
    const localStorageItem = localStorage.getItem('state');
    if (!localStorageItem) {
      const playerToStorage = {
        player: {
          name,
          assertions,
          score,
          gravatarEmail: email },
      };
      localStorage.setItem('state', JSON.stringify(playerToStorage));
    } else {
      const playerToStorage = {
        player: {
          name,
          assertions,
          score,
          gravatarEmail: email,
        },
      };
      localStorage.setItem('state', JSON.stringify(playerToStorage));
    }
  }

  clickNextQuestion() {
    const { indexQuestion } = this.state;
    const lastQuestionIndex = 4;

    if (indexQuestion < lastQuestionIndex) {
      this.setState({
        indexQuestion: indexQuestion + 1,
        seconds: 30,
        disableButton: false,
        buttonColorVisible: false,
      });
    } else this.setState({ lastQuestion: true });
  }

  render() {
    const { indexQuestion, seconds, isLoading } = this.state;
    return isLoading ? <p>Loading</p> : (
      <div>
        <section>
          <div>
            {this.oneQuestion(indexQuestion)}
          </div>
          <div>
            Tempo:
            {seconds}
          </div>
        </section>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  token: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
  token: state.tokenReducer.token,
  assertions: state.userReducer.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (newAssertions, newScore) => dispatch(
    updateScoreAction(newAssertions, newScore),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
