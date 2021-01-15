import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    this.buttonColor = this.buttonColor.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);

    this.state = {
      questionNumber: 0,
      correctAnswer: 'neutral',
      wrongAnswer: 'neutral',
      visibleClick: false,
    };
  }

  incrementIndex() {
    const four = 4;
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
      visibleClick: false,
    }));
    const { questionNumber } = this.state;
    console.log(questionNumber);
    if (questionNumber === four) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState({ correctAnswer: 'neutral', wrongAnswer: 'neutral' });
  }

  allFunctionsOfButton() {
    this.buttonColor();
    this.renderNextButton();
  }

  buttonColor() {
    this.setState({
      correctAnswer: 'correctAnswer',
      wrongAnswer: 'wrongAnswer',
    });
  }

  renderNextButton() {
    this.setState({ visibleClick: true });
  }

  render() {
    const { questions, timer } = this.props;
    const { questionsList } = questions;
    const {
      questionNumber,
      wrongAnswer,
      correctAnswer,
      visibleClick,
    } = this.state;
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
            onClick={ () => this.allFunctionsOfButton() }
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
              onClick={ () => this.allFunctionsOfButton() }
            >
              {q}
            </button>
          ))}
        </div>
        {visibleClick || timer ? (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ this.incrementIndex }
          >
            Next
          </button>
        ) : null}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, null)(Questions);
