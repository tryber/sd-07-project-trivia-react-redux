import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor() {
    super();
    this.incrementIndex = this.incrementIndex.bind(this);
    this.fetchQ = this.fetchQ.bind(this);
    this.state = {
      questionNumber: 0,
      questionsList: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchQ();
  }

  fetchQuestions(token) {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    fetch(URL)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.response_code === 0) {
          const questions = obj.results;
          return questions;
        }
      });
  }

  fetchQ() {
    const token = localStorage.getItem('token');
    this.setState({ isLoading: true }, () => {
      this.fetchQuestions(token).then((q) => {
        this.setState({
          isLoading: false,
          questionsList: q,
        });
      });
    });
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
    if (questions.length > 0) {
      if (questionNumber < five) {
        return (
          <div>
            {`Questão número ${questionNumber + 1}`}
            <div>
              <h2 data-testid="question-category">
                {questions[questionNumber].category}
              </h2>
              <p data-testid="question-text">
                {questions[questionNumber].question}
              </p>
            </div>
            <div>
              <button type="button" data-testid="correct-answer">
                {questions[questionNumber].correct_answer}
              </button>
              {questions[questionNumber].incorrect_answers.map((resposta) => (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${questionNumber}` }
                  key={ resposta }
                >
                  {resposta}
                </button>
              ))}
            </div>
            <button type="button" onClick={ () => this.incrementIndex() }>
              Próxima
            </button>
          </div>
        );
      }
      return <h1>Tente novamente</h1>;
    }
    return <p>Carregando...</p>;
  }
}

const mapStateToProps = (state) => ({
  questionsList: state.questions,
});

Questions.propTypes = {
  questionsList: PropTypes.shape({
    questions: PropTypes.objectOf(PropTypes.string, PropTypes.number)
      .isRequired,
  }).isRequired,
};
export default connect(mapStateToProps, null)(Questions);
