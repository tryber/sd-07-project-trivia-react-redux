import React, { Component } from 'react';
import { fetchQuestionNAnswer } from '../../services';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);

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

  handleClick() {
    this.setState({ isDisabled: true });
  }

  render() {
    const { questions,
      isLoading,
      questionNumber,
      isDisabled,
      counterInterval } = this.state;
    const questionToLoad = questions[questionNumber];
    if (isLoading) return <h1>Is Loading</h1>;
    return (
      <div>
        <div>
          <h2>{ counterInterval }</h2>
        </div>
        <div>
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
          >
            Next Question

          </button>
        </div>
      </div>
    );
  }
}

export default Questions;
