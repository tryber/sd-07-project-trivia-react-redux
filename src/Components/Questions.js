import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    this.state = {
      questionNumber: 0,
    };
  }

  incrementIndex() {
    // const { questionNumber } = this.state;
    // this.setState({ questionNumber: questionNumber + 1 });
    this.setState((anterior) => ({
      questionNumber: anterior.questionNumber + 1,
    }));
  }

  render() {
    const { questionNumber } = this.state;
    const { questionsList } = this.props;
    const { questions } = questionsList;
    const five = 5;

    // if (questions.length > 0) {
    //   this.setState({
    //     isLoading: true,
    //   });
    // }

    if (questionNumber < five) {
      return (
        <div>
          {`Questão número ${questionNumber + 1}`}
          <div>
            <p data-testid="question-category">
              {questions.length > 0 && questions[questionNumber].category}
            </p>
            <p data-testid="question-text">
              {questions.length > 0 && questions[questionNumber].question}
            </p>
          </div>
          <div>
            <button type="button" data-testid="correct-answer">
              {questions.length > 0 && questions[questionNumber].correct_answer}
            </button>
            {questions.length > 0
              && questions[questionNumber].incorrect_answers.map(
                (resposta, index) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ resposta }
                  >
                    {resposta}
                  </button>
                ),
              )}
          </div>
          <button type="button" onClick={ () => this.incrementIndex() }>
            Próxima
          </button>
        </div>
      );
    }
    return <h1>Tente novamente</h1>;
  }
}

const mapStateToProps = (state) => ({
  questionsList: state.questions,
  isLoading: state.questions.loading,
});

Questions.propTypes = {
  questionsList: PropTypes.shape({
    questions: PropTypes.objectOf(PropTypes.string, PropTypes.number)
      .isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, null)(Questions);
