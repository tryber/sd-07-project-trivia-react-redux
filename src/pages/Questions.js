import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      // shuffled: false,
      shuffledAnswers: [],
    };

    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentDidMount() {
    this.shuffleAnswers();
  }

  shuffleAnswers() {
    const { question } = this.props;
    // define keys to new array
    const correctAnswer = question.correct_answer;
    const incorrectAnswer = question.incorrect_answers;
    const concatAnswersArr = [correctAnswer, ...incorrectAnswer];
    // lint purpose - magic number
    const magic = 0.5;
    // sort concataned array to shuffle answers
    const sortedArr = concatAnswersArr.sort(() => Math.random() - magic);

    this.setState({
      // shuffled: true,
      shuffledAnswers: sortedArr,
    });
  }

  render() {
    const { question } = this.props;
    const { shuffledAnswers } = this.state;
    console.log(shuffledAnswers);
    return (
      <div>
        <h3 data-testid="question-category">{question.category}</h3>
        <h4 data-testid="question-text">{question.question}</h4>
        {shuffledAnswers && shuffledAnswers.map((answer, index) => {
          if (answer === question.correct_answer) {
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
              >
                {answer}
              </button>

            );
          }
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          );
        })}
      </div>
    );
  }
}

Questions.propTypes = {
  question: PropTypes.arrayOf.isRequired,
};
