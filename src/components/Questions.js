import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.randomChoice = this.randomChoice.bind(this);
  }

  randomChoice(arr) {
    return arr.sort((a,b) => 0.5 - Math.random());
  }

  renderQuestions(correct_answer, incorrect_answers){

    let incorreta = [];
    const correta = (
      <button data-testid="correct-answer">{correct_answer}</button>
    );
      
    incorrect_answers.map((incorrect, index) =>
      incorreta.push(
        <button key={index} data-testid={`wrong-answer-${index}`}>
          {incorrect}
        </button>
      )
    );
    const answers = [correta, ...incorreta];
    const answersRandom = this.randomChoice(answers);
    return answersRandom
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
          <div data-testid="question-category">Categoria: {category}</div>
          <div data-testid="question-text"> Pergunta: {question}</div>
          <div>
            { this.renderQuestions(correct_answer, incorrect_answers )}
          </div>
        </div>
      );
    } else {
      return <p>Loading... </p>;
    }
  }
}

const mapStateToProps = (state) => ({
  questions: state.receiveQuestions.questions,
  isFetching: state.receiveQuestions.isFetching,
});

export default connect(mapStateToProps, null)(Questions);
