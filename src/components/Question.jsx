import React, { Component } from 'react';
import propTypes from 'prop-types';
import Answer from './Answer';

class Question extends Component {
  constructor() {
    super();

    this.state = { clicked: '' };

    this.getAnswers = this.getAnswers.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  getAnswers(obj) {
    const randomQuestions = [];
    const questions = [
      { correctAnswer: obj.correct_answer },
      { incorrectAnswer: obj.incorrect_answers },
    ];
    let counter = 1;
    const index = 0;
    if (obj.incorrect_answers.length > counter) {
      counter += obj.incorrect_answers.length;
    } else counter = questions.length;
    return this.renderAnswers(counter, index, questions, randomQuestions);
  }

  changeColor() {
    this.setState({ clicked: '-clicked' });
  }

  renderAnswers(counter, index, questions, randomQuestions) {
    if (counter === 0) return randomQuestions;
    const random = Math.floor(Math.random() * questions.length);
    const question = questions[random];
    const { correctAnswer } = question;
    if (correctAnswer) {
      counter -= 1;
      randomQuestions.push({
        answer: correctAnswer,
        value: -1,
      });
      const filteredQuestions = questions.filter((item) => item !== question);
      return this.renderAnswers(counter, index, filteredQuestions, randomQuestions);
    }
    counter -= 1;
    const { incorrectAnswer } = question;
    const randomIncorrectAnswerIndex = Math.floor(Math.random() * incorrectAnswer.length);
    const randomIncorrectAnswer = incorrectAnswer[randomIncorrectAnswerIndex];
    randomQuestions.push({
      answer: randomIncorrectAnswer,
      value: index,
    });
    index += 1;
    const filteredIncorrectQuestions = incorrectAnswer
      .filter((item) => item !== randomIncorrectAnswer);
    question.incorrectAnswer = filteredIncorrectQuestions;
    const incorrectAnswersLength = 0;
    if (question.incorrectAnswer.length === incorrectAnswersLength) {
      const filteredQuestions = questions.filter((item) => item !== question);
      return this.renderAnswers(counter, index, filteredQuestions, randomQuestions);
    }
    return this.renderAnswers(counter, index, questions, randomQuestions);
  }

  render() {
    const { item } = this.props;
    const { category, question } = item;
    const { clicked } = this.state;
    const randomQuestions = this.getAnswers(item);
    return (
      <div className="question-container">
        <div className="category-container">
          <h2 data-testid="question-category">{ category }</h2>
        </div>
        <div className="question-text-container">
          <h3 data-testid="question-text">{ question }</h3>
        </div>
        <div className="answers-container">
          { randomQuestions.map((answer) => (
            <Answer
              key={ answer.value }
              item={ answer }
              click={ clicked }
              changeColor={ this.changeColor }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Question;

Question.propTypes = {
  item: propTypes.shape({
    category: propTypes.string,
    question: propTypes.string,
  }),
}.isRequired;
