import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkApiQuestions } from '../actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonCorrect: '',
      buttonError: '',
      counter: 0,
      buttonDisable: false,
    };

    this.givesIfTrue = this.givesIfTrue.bind(this);
    this.givesIfFalse = this.givesIfFalse.bind(this);
    this.borderButton = this.borderButton.bind(this);
  }

  componentDidMount() {
    const { getQuestion, token } = this.props;
    getQuestion(token);
  }

  borderButton() {
    this.setState({
      buttonCorrect: 'correct',
      buttonError: 'wrong-answer',
      buttonDisable: true,
    });
  }

  givesIfFalse(question) {
    const { buttonCorrect, buttonError, buttonDisable } = this.state;
    const answers = [...question.incorrect_answers, question.correct_answer];
    const sortAnswers = answers
      .map((answer, index) => {
        if (answer === question.correct_answer) {
          return (
            <button
              key={ answer }
              type="button"
              disabled={ buttonDisable }
              data-testid="correct-answer"
              className={ buttonCorrect }
              onClick={ this.borderButton }
            >
              { answer }
            </button>
          );
        }
        return (
          <button
            key={ answer }
            type="button"
            disabled={ buttonDisable }
            data-testid={ `wrong-answer-${index}` }
            className={ buttonError }
            onClick={ this.borderButton }
          >
            { answer }
          </button>
        );
      })
      .sort(() => {
        const magicNumber = 0.5;
        return Math.random() - magicNumber;
      });

    return (
      <div>
        <div data-testid="question-category">{question.category}</div>
        <div>
          Pergunta:
          <div data-testid="question-text">{question.question}</div>
        </div>
        <div>
          Alternativas:
          {sortAnswers}
        </div>
        <button
          type="button"
        >
          Próxima Pergunta
        </button>
      </div>
    );
  }

  givesIfTrue() {
    return <div>Carregando</div>;
  }

  render() {
    const { questions } = this.props;
    const { counter } = this.state;
    return questions === undefined || questions.length === 0
      ? this.givesIfTrue()
      : this.givesIfFalse(questions[counter]);
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (token) => dispatch(thunkApiQuestions(token)),
});

Questions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
