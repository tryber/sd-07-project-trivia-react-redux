import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      green: '',
      red: '',
    };
    this.handleClass = this.handleClass.bind(this);
    this.randomChoice = this.randomChoice.bind(this);
    this.WinnerOrLoser = this.WinnerOrLoser.bind(this);
  }

  WinnerOrLoser() {
    console.log('entrei aqui');
  }

  handleClass() {
    const { disableButton, next } = this.props;
    const maxQuestion = 4;
    this.setState({
      green: 'green',
      red: 'red',
    });
    next !== maxQuestion ? disableButton() : this.WinnerOrLoser();
  }

  randomChoice(arr) {
    const random = 0.5;
    return arr.sort(() => Math.random() - random);
  }

  renderQuestions(correctAnswers, incorrectAnswers) {
    const incorreta = [];
    const { green, red } = this.state;
    const correta = (
      <button
        type="button"
        className={ green }
        data-testid="correct-answer"
        onClick={ (event) => this.handleClass(event) }
      >
        {correctAnswers}
      </button>
    );

    incorrectAnswers.map((incorrect, index) => incorreta.push(
      <button
        type="button"
        key={ index }
        className={ red }
        data-testid={ `wrong-answer-${index}` }
        onClick={ (event) => this.handleClass(event) }
      >
        {incorrect}
      </button>,
    ));
    const answers = [correta, ...incorreta];
    const answersRandom = this.randomChoice(answers);
    return answersRandom;
  }

  render() {
    const { questions: { results }, next } = this.props;

    if (results) {
      const { category, question } = results[next];

      const {
        incorrect_answers: incorrect,
        correct_answer: correct,
      } = results[next];

      return (
        <div>
          <div data-testid="question-category">
            Categoria:
            {category}
          </div>
          <div data-testid="question-text">
            {' '}
            Pergunta:
            {question}
          </div>
          <div>{this.renderQuestions(correct, incorrect)}</div>
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
