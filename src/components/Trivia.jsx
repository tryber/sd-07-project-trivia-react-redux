import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.randomArrayQuestions = this.randomArrayQuestions.bind(this);
  }

  randomArrayQuestions(string, array) {
    const newArray = [...array, string];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  render() {
    const { questions } = this.props;

    return (
      <div>
        <span>TRIVIA</span>
        {questions.map((item, index) => (
          <div key={ index }>
            <h1
              data-testid="question-category"
            >
              { item.category }
            </h1>
            <h2
              data-testid="question-text"
            >
              { item.question }
            </h2>
            <button
              type="button"
              data-testid="correct-answer"
            >
              { item.correct_answer }
            </button>
            {item.incorrect_answers.map((element, indice) => (
              <button
                key={ indice }
                type="button"
                data-testid={ `wrong-answer-${indice}` }
              >
                { element }
              </button>
            ))}
            {this.randomArrayQuestions(item.correct_answer, item.incorrect_answers)
              .map((element, indice) => (
                <button
                  key={ indice }
                  type="button"
                  data-testid={ element === item.correct_answer
                    ? 'correct-answer' : `wrong-answer-${indice}` }
                >
                  { element }
                </button>))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.play.questions,
  status: state.play.status,
});

export default connect(mapStateToProps)(Trivia);

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
