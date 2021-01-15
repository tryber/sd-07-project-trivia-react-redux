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
    });
  }

  givesIfFalse(question) {
    const { buttonCorrect, buttonError } = this.state;
    return (
      <div>
        <div data-testid="question-category">{question.category}</div>
        <div>
          Pergunta:
          <div data-testid="question-text">{ question.question }</div>
        </div>
        <div>
          Alternativas:
          <button
            className={ buttonCorrect }
            type="button"
            data-testid="correct-answer"
            onClick={ this.borderButton }
          >
            { question.correct_answer }
          </button>
          { question.incorrect_answers.map((wrong, index) => (
            <button
              className={ buttonError }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.borderButton }
            >
              { wrong }
            </button>
          ))}
        </div>
      </div>
    );
  }

  givesIfTrue() {
    return <div>Carregando</div>;
  }

  render() {
    const { questions } = this.props;
    return questions === undefined || questions.length === 0
      ? this.givesIfTrue()
      : this.givesIfFalse(questions[0]);
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
