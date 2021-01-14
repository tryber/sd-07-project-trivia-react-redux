import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    // this.buttonColor = this.buttonColor.bind(this);
    this.state = {
      questionNumber: 0,
      correctAnswer: 'neutral',
      wrongAnswer: 'neutral',
    };
  }

  incrementIndex() {
    // const { questionNumber } = this.state;
    // this.setState({ questionNumber: questionNumber + 1 });
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
    }));
  }

  buttonColor() {
    this.setState({ correctAnswer: 'correctAnswer', wrongAnswer: 'wrongAnswer' });
  }

  render() {
    const { questions, timer } = this.props;
    const { questionsList } = questions;
    const { questionNumber, wrongAnswer, correctAnswer } = this.state;
    const five = 5;
    if (questionsList < five) {
      console.log(questionsList);
      return <div>Efetue o login novamente</div>;
    }
    return (
      <div>
        {`Questão número ${questionNumber + 1}`}
        <div>
          <h2 data-testid="question-category">
            {questionsList[questionNumber].category}
          </h2>
          <p data-testid="question-text">
            {questionsList[questionNumber].question}
          </p>
        </div>
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ () => this.buttonColor() }
            className={ correctAnswer }
            disabled={ timer }
          >
            {questionsList[questionNumber].correct_answer}
          </button>
          {questionsList[questionNumber].incorrect_answers.map((q, index) => (
            <button
              key={ q }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ timer }
              className={ wrongAnswer }
              onClick={ () => this.buttonColor() }
            >
              {q}
            </button>
          ))}
        </div>
        <button type="button" onClick={ () => this.incrementIndex() }>
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  timer: state.questions.timer,
});

Questions.propTypes = {
  questions: PropTypes.shape({
    questionsList: PropTypes.arrayOf(PropTypes.string, PropTypes.array)
      .isRequired,
  }).isRequired,
  timer: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, null)(Questions);
