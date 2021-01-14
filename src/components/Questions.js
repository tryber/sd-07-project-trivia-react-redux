import React from 'react';
import PropTypes from 'prop-types';

class Questions extends React.PureComponent {
  render() {
    const { questions, clicked, disabled, position } = this.props;
    const { clickHandler } = this.props;
    const { results } = questions;
    return (

      <div>
        {results.map((item, index1) => {
          const answers = item.incorrect_answers.map((answer, index) => (
            <button
              onClick={ ({ target }) => clickHandler(target, item.difficulty) }
              key={ index }
              type="button"
              className={ clicked ? 'wrongRed' : '' }
              data-testid={ `wrong-answer-${index}` }
              disabled={ disabled }

            >
              {' '}
              {answer}
              {' '}
            </button>
          ));

          const lengthMaisUm = answers.length + 1;
          const answerCorrect = (
            <button
              onClick={ ({ target }) => clickHandler(target, item.difficulty) }
              id="rightAnswer"
              type="button"
              className={ clicked ? 'rightGreen' : '' }
              data-testid="correct-answer"
              disabled={ disabled }
            >
              { ' '}
              {item.correct_answer}
              {' '}
            </button>
          );
          answers.splice(Math.floor(Math.random() * lengthMaisUm), 0, answerCorrect);
          return (
            <div key={ index1 }>
              <p data-testid="question-category">
                Categoria:
                {item.category}
              </p>
              <p data-testid="question-text">
                Questão :
                {item.question}
              </p>
              <ul>
                {answers.map((item1, index2) => <li key={ index2 }>{item1}</li>)}
              </ul>
            </div>
          );
        })[position]}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.shape().isRequired,
  clicked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Questions;
