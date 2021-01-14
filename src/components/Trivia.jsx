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
    const { questions, currentQuestion } = this.props;

    return (
      <div>
        <span>TRIVIA</span>
        {questions.length > 0 ? (
          <div key={ currentQuestion.question }>
            <h1
              data-testid="question-category"
            >
              { currentQuestion.category }
            </h1>
            <h2
              data-testid="question-text"
            >
              { currentQuestion.question }
            </h2>
            {this.randomArrayQuestions(currentQuestion
              .correct_answer, currentQuestion.incorrect_answers)
              .map((element, indice) => (
                <button
                  key={ indice }
                  type="button"
                  data-testid={ element === currentQuestion.correct_answer
                    ? 'correct-answer' : `wrong-answer-${indice}` }
                >
                  { element }
                </button>))}
          </div>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.play.questions,
  currentQuestion: state.play.currentQuestion,
  status: state.play.status,
});

export default connect(mapStateToProps)(Trivia);

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.objectOf(PropTypes.array).isRequired,
};
