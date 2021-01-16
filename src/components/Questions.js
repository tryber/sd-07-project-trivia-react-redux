import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.handleClass = this.handleClick.bind(this);
    this.randomChoice = this.randomChoice.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
    this.state = {
      green: '',
      red: '',
      timer: '',
      disabled: false,
      shuffledAnswers: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;
    const { results } = questions;
    if (prevProps.questions.results !== results) {
      this.randomChoice(results);
      this.startCountDown();
    }
  }

  randomChoice(results) {
    const newResults = results.map((result) => {
      const categoryAndQuestion = {
        category: result.category,
        question: result.question,
      };
      const shuffledAnswers = [
        ...result.incorrect_answers.map((incorrect) => (
          {
            text: incorrect,
            correct: false,
          }
        )),
        {
          text: result.correct_answer,
          correct: true,
        }];
        // Durstenfeld shuffle algorithm
      for (let i = shuffledAnswers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const aux = shuffledAnswers[i];
        shuffledAnswers[i] = shuffledAnswers[j];
        shuffledAnswers[j] = aux;
      }
      const objectToBeReturned = {
        answers: shuffledAnswers,
        ...categoryAndQuestion,
      };
      return objectToBeReturned;
    });
    this.setState({
      shuffledAnswers: newResults,
    });
  }

  startCountDown() {
    const countDownSeconds = new Date().getTime() + 30000;
    const seconds = (countDownSeconds - new Date().getTime()) / 1000;
    this.setState({
      timer: seconds,
    });
    const updateTimerWithOneSecond = setInterval(() => {
      const now = new Date().getTime();
      const gap = countDownSeconds - now;
      const seconds = Math.ceil((gap % (1000 * 60)) / 1000);
      this.setState({
        timer: seconds,
      });

      if (gap <= 0) {
        clearInterval(updateTimerWithOneSecond);
        this.setState({
          timer: 'Tempo expirado',
        });
        this.stopButtons();
      }
    }, 1000);
  }

  stopButtons() {
    this.setState({
      disabled: true,
    });
  }

  handleClick(event) {
    this.setState({
      green: 'green',
      red: 'red',
    });
    this.saveScore(event);
  }

  saveScore({ target }) {
    const getLocalStorage = JSON.parse(localStorage.getItem('score'));
    if (getLocalStorage) {
      localStorage.setItem('score', 'new value');
    }
  }

  render() {
    const { timer, shuffledAnswers, green, red, disabled } = this.state;

    /* console.log(shuffledAnswers); */
    console.log(timer);
    if (shuffledAnswers) {
      return (
        <div>
          <div>{ timer }</div>
          <label htmlFor="div">
            Categoria:
            <div data-testid="question-category">

              { shuffledAnswers[0].category }
            </div>
          </label>
          <label htmlFor="div">
            Pergunta:
            <div data-testid="question-text">

              { shuffledAnswers[0].question }
            </div>
          </label>
          <div>
            { shuffledAnswers[0].answers.map((answer, index) => {
              if (answer.correct === true) {
                return (
                  <button
                    type="button"
                    key={ index }
                    className={ green }
                    data-testid="correct-answer"
                    disabled={ disabled }
                    onClick={ (event) => this.handleClick(event) }
                  >
                    { answer.text}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ index }
                  className={ red }
                  data-testid={ `wrong-answer-${index}` }
                  disabled={ disabled }
                  onClick={ (event) => this.handleClick(event) }
                >
                  {answer.text}
                </button>
              );
            }) }

          </div>

        </div>
      );
    }
    return <p>Loading... </p>;
  }
}

Questions.propTypes = {
  questions: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.receiveQuestions.questions,
});

export default connect(mapStateToProps, null)(Questions);
