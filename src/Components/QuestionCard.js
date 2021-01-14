import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchQuestions from '../services/api';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      buttonColorVisible: false,
      seconds: 30,
      questions: [],
      isLoading: true,
    };
    this.timer = 0;
    this.oneQuestion = this.oneQuestion.bind(this);
    this.answerAnalyze = this.answerAnalyze.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    // this.nextQuestion = this.nextQuestion.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    // this.startTimer();
    this.getQuestions();
  }

  oneQuestion(indexQuestion) {
    const { buttonColorVisible, questions } = this.state;
    const options = [...questions[indexQuestion].incorrect_answers,
      questions[indexQuestion].correct_answer].sort();
    console.log(questions);

    return (
      <div>
        <div key={ Math.random() }>
          <h5 data-testid="question-category">
            { questions[indexQuestion].category }
          </h5>
          <h5 data-testid="question-text">
            { questions[indexQuestion].question }
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
                onClick={ () => this.answerAnalyze() }
              >
                { answer }
              </button>))}
        </div>
      </div>
    );
  }

  async getQuestions() {
    const { token } = this.props;
    const questionsResponse = await fetchQuestions(token);
    const questions = questionsResponse.results;
    console.log(questions);
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
    }
  }

  answerAnalyze() {
    this.setState({ buttonColorVisible: true });
  }

  render() {
    const { indexQuestion, seconds, isLoading } = this.state;

    return isLoading ? <p>Loading</p> : (
      <div>
        <section>
          <div>
            { this.oneQuestion(indexQuestion) }
          </div>
          <div>
            Tempo:
            { seconds }
          </div>
        </section>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(QuestionCard);
