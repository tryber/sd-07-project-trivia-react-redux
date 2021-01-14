import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  constructor() {
    super();
    this.randomChoice = this.randomChoice.bind(this);
  }

  randomChoice(arr) {
    const random = 0.5;
    return arr.sort(() => Math.random() - random);
  }

  renderQuestions(correct_answer, incorrect_answers) {
    const incorreta = [];
    const correta = (
      <button type="button" data-testid="correct-answer">
        {correct_answer}
      </button>
    );

    incorrect_answers.map((incorrect, index) => incorreta.push(
      <button type="button" key={ index } data-testid={ `wrong-answer-${index}` }>
        {incorrect}
      </button>,
    ));
    const answers = [correta, ...incorreta];
    const answersRandom = this.randomChoice(answers);
    return answersRandom;
  }

  render() {
    const { questions } = this.props;
    const { results } = questions;

    if (results) {
      const {
        category,
        question,
        incorrect_answers,
        correct_answer,
      } = results[0];

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
          <div>{this.renderQuestions(correct_answer, incorrect_answers)}</div>
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
