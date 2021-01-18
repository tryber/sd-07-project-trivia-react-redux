import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../Pages/PlayGame.css';

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      isLoading: true,
      correctAnswer: '',
      incorrectAnswer: '',
      timer: 30,
      btnDisable: false,
      questionIndex: 0,
      redirect: null,
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.renderTrivia = this.renderTrivia.bind(this);
    this.fetchTriviaQuestions = this.fetchTriviaQuestions.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.changeBtnColor = this.changeBtnColor.bind(this);
    this.counter = this.counter.bind(this);
    this.btnNext = this.btnNext.bind(this);
  }

  componentDidMount() {
    this.updateLocalState();
    this.counter();
  }

  btnNext() {
    this.setState({
      timer: 30,
      correctAnswer: '',
      incorrectAnswer: '',
      btnDisable: false,
    });
    const { questionIndex } = this.state;
    const magicNumber = 4;
    if (questionIndex >= magicNumber) {
      return this.setState({ redirect: '/feedback' });
    }
    this.setState({ questionIndex: questionIndex + 1 });
  }

  counter() {
    const magicNumber = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        this.changeBtnColor();
        this.setState({ btnDisable: true });
      }
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, magicNumber);
  }

  async fetchTriviaQuestions() {
    // const five = 5;
    const endpoint = 'https://opentdb.com/api.php?amount=5';
    const token = localStorage.getItem('token');
    console.log(token);
    const getQuestions = await fetch(`${endpoint}&token=${token}`);
    const response = await getQuestions.json();
    return response;
  }

  async updateLocalState() {
    const responseAPI = await this.fetchTriviaQuestions();
    const { results } = responseAPI;
    await this.setState({
      questions: results,
      isLoading: false,
    });
  }

  shuffleAnswers(array) {
    const randomNumber = 0.5;
    return array.sort(() => Math.random() - randomNumber);
  }

  changeBtnColor() {
    this.setState({
      correctAnswer: 'correctAnswer',
      incorrectAnswer: 'incorrectAnswer',
      btnDisable: true,
      timer: 0,
    });
  }

  renderTrivia(rightAnswer, wrongAnswers) {
    const { incorrectAnswer, correctAnswer, btnDisable } = this.state;
    const wrong = [];
    const right = (
      <button
        className={ correctAnswer }
        type="button"
        data-testid="correct-answer"
        key={ Math.random() }
        onClick={ this.changeBtnColor }
        disabled={ btnDisable }
      >
        {rightAnswer}
      </button>
    );
    wrongAnswers.map((wrongAnswer, index) => wrong.push(
      <button
        className={ incorrectAnswer }
        type="button"
        key={ index }
        onClick={ this.changeBtnColor }
        data-testid={ `wrong-answer-${index}` }
        disabled={ btnDisable }
      >
        {wrongAnswer}
      </button>,
    ));
    const answers = [right, ...wrong];
    const randomOptions = this.shuffleAnswers(answers);
    return randomOptions;
  }

  render() {
    const { isLoading,
      questions,
      timer,
      questionIndex,
      btnDisable,
      redirect } = this.state;
    console.log(questions);
    console.log(isLoading);
    return isLoading ? <p>Loading</p>
      : (
        <div>
          Timer:
          { timer }
          { redirect && <Redirect to={ redirect } />}
          <div key={ Math.random() }>
            <h3 data-testid="question-category">
              Categoria:
              {questions[questionIndex].category}
            </h3>
            <p data-testid="question-text">
              Pergunta:
              { questions[questionIndex].question }
            </p>
            <div>
              { this.renderTrivia(questions[questionIndex].correct_answer,
                questions[questionIndex]
                  .incorrect_answers) }
            </div>
            { btnDisable === true && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.btnNext() }
              >
                Próxima
              </button>
            )}
          </div>
        </div>
      );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default Questions;
