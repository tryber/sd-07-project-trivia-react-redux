import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Button.css';
import questionsAPI from '../services/questionAPI';
import { addScoreboard } from '../actions';
import Header from '../components/Header';

class Gamepage extends Component {
  constructor() {
    super();
    this.state = {
      timerThirty: 30,
      questionIndex: 0,
      styleButton: false,
    };
    this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.nextPageBack = this.nextPageBack.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.countdown = this.countdown.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.scorePoint = this.scorePoint.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  async componentDidMount() {
    const { point } = this.props;
    const token = localStorage.getItem('token');
    await this.getQuestions(token);
    this.timer();
    point(0, 0);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async getQuestions(token) {
    await questionsAPI(token);
  }

  timer() {
    const seconds = 1000;
    this.timerID = setInterval(this.countdown, seconds);
  }

  nextPageBack() {
    const { history } = this.props;
    history.push('/feedback');
  }

  scorePoint() {
    const { questionIndex, timerThirty } = this.state;
    const { questions } = this.props;
    const difficultyLevel = questions[questionIndex].difficulty;
    const three = 3;
    const defaultPoint = 10;
    let levelPoint = 1;
    if (difficultyLevel === 'easy') levelPoint = 1;
    if (difficultyLevel === 'medium') levelPoint = 2;
    if (difficultyLevel === 'hard') levelPoint = three;
    const answerPoint = (defaultPoint + (timerThirty * levelPoint));
    return answerPoint;
  }

  handleAnswer(event) {
    const valueTextButton = event.target.innerHTML;
    console.log('handleAnswer', valueTextButton);
    const { questionIndex } = this.state;
    const { questions, point, score, assertions } = this.props;
    const correctAnswer = questions[questionIndex].correct_answer;
    const currentPoints = (valueTextButton === correctAnswer) ? this.scorePoint() : 0;
    const currentAssertions = (valueTextButton === correctAnswer)
      ? assertions + 1 : assertions + 0;
    const currentScore = score + currentPoints;
    point(currentScore, currentAssertions);
  }

  nextQuestion() {
    // const { questions } = this.props;
    const { questionIndex } = this.state;
    const number = 4;
    if (questionIndex === number) {
      this.nextPageBack();
    }
    this.setState((state) => ({
      questionIndex: state.questionIndex + 1,
      styleButton: false,
      timerThirty: 30,
    }));
    this.timer();
  }

  countdown() {
    const { timerThirty } = this.state;
    const { styleButton } = this.state;
    this.setState({
      timerThirty: timerThirty - 1,
    });
    if (timerThirty <= 0) {
      clearInterval(this.timerID);
      this.setState({
        styleButton: !styleButton,
        timerThirty,
      });
    }
  }

  handleClick(event) {
    this.handleAnswer(event);
    const { styleButton } = this.state;
    this.setState({
      styleButton: !styleButton,
    });
    clearInterval(this.timerID);
  }

  nextButton() {
    const { styleButton } = this.state;
    if (styleButton) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.nextQuestion() }
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, styleButton, timerThirty } = this.state;
    const currentQuestion = questions[questionIndex];

    return questions && questions.length && (
      <div>
        <Header />
        <div>
          <p> Timer: </p>
          { timerThirty }
        </div>
        <div>
          <div data-testid="question-category">
            Categoria:
            {currentQuestion && currentQuestion.category}
            <br />
          </div>
          <div data-testid="question-text">
            Pergunta:
            <br />
            { currentQuestion && currentQuestion.question }
          </div>
        </div>
        <div>
          { currentQuestion && currentQuestion.incorrect_answers
            .map((option, index) => (
              <div key={ option }>
                <button
                  className={ !styleButton ? 'none-answer' : 'incorrect' }
                  onClick={ this.handleClick }
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  disabled={ styleButton }
                >
                  {option}
                </button>
              </div>
            ))}
          <button
            className={ !styleButton ? 'none-answer' : 'correct' }
            onClick={ this.handleClick }
            data-testid="correct-answer"
            type="button"
            id="correct"
            disabled={ styleButton }
          >
            { currentQuestion && currentQuestion.correct_answer }
          </button>
          { this.nextButton() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions,
  score: state.score.score,
  assertions: state.assertions.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  point: (score, assertions) => dispatch(addScoreboard(score, assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);

Gamepage.propTypes = {
  currentQuestion: PropTypes.arrayOf(Object).isRequired,
  questions: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  point: PropTypes.func.isRequired,
}.isRequired;
