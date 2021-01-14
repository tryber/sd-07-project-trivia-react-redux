import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
  constructor() {
    super();
    this.state = {
      indexQuestion: 0,
      buttonColorVisible: false,
      seconds: 30,
      optionsArray: [],
    };
    this.timer = 0;
    this.oneQuestion = this.oneQuestion.bind(this);
    this.answerAnalyze = this.answerAnalyze.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    // this.nextQuestion = this.nextQuestion.bind(this);
    this.optionsRandom = this.optionsRandom.bind(this);
  }

  componentDidMount() {
    // this.startTimer();
    this.optionsRandom();
  }

  oneQuestion(indexQuestion) {
    const { questions } = this.props;

    const { buttonColorVisible, optionsArray } = this.state;

    return (
      <div>
        { questions && (
          <div key={ Math.random() }>
            <h5 data-testid="question-category">
              { questions[indexQuestion].category }
            </h5>
            <h5 data-testid="question-text">
              { questions[indexQuestion].question }
            </h5>
            {optionsArray
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
          </div>)}
      </div>
    );
  }

  optionsRandom() {
    const { questions } = this.props;
    const { indexQuestion } = this.state;
    const options = [...questions[indexQuestion].incorrect_answers,
      questions[indexQuestion].correct_answer];

    let actualIndex = options.length;
    let tempValue;
    let randomIndex;
    while (actualIndex !== 0) {
      randomIndex = Math.floor(Math.random() * actualIndex);
      actualIndex -= 1;
      tempValue = options[actualIndex];
      options[actualIndex] = options[randomIndex];
      options[randomIndex] = tempValue;
    }

    this.setState({ optionsArray: options });
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
    const { indexQuestion, seconds } = this.state;

    return (
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
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(QuestionCard);
