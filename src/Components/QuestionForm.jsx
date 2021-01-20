import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import Question from './Question';
import Timer from './Timer';
import Answer from './Answer';
import { addAcerto } from '../actions';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
    this.setAnswerInState = this.setAnswersInState.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.state = {
      answers: [],
      disableNextQuestion: false,
    };
  }

  componentDidUpdate(previous) {
    const { answer } = this.props;
    if (previous.answer !== answer) {
      this.setAnswersInState();
    }
  }

  setAnswersInState() {
    const { answer } = this.props;

    this.setState({ answers: answer });
  }

  handleAnswerClicked(event) {
    const { answer, scorePoint } = this.props;
    let assertionLocal = 0;
    const newAnswers = [...answer];
    for (let i = 0; i < newAnswers.length; i += 1) {
      newAnswers[i].className = `btn-actions-${newAnswers[i].status}`;
      newAnswers[i].disabled = true;
      if (newAnswers[i].status === 'correct') {
        if (event.target.innerHTML === newAnswers[i].answer) {
          const { addScore } = this.props;
          scorePoint();
          addScore();
          assertionLocal += 1;
          const getStateSaved = JSON.parse(localStorage.getItem('state'));
          getStateSaved.player.assertions += assertionLocal;
          localStorage.setItem('state', JSON.stringify(getStateSaved));
        }
      }
    }
    this.setState({ answers: newAnswers, disableNextQuestion: true });
  }

  renderNextButton() {
    const { handleClickNextQuestion } = this.props;
    const button = (
      <button
        type="button"
        className="btn-actions"
        data-testid="btn-next"
        onClick={ () => handleClickNextQuestion() }
      >
        Próxima
      </button>);

    return button;
  }

  render() {
    // console.log(this.props)
    const { category, questionText } = this.props;
    const { answers, disableNextQuestion } = this.state;
    return (
      <div className="form-login">
        <span className="category" data-testid="question-category">
          {category}
        </span>
        <div className="question" />
        <Question content={ questionText } />
        {answers.map((acc, index) => (
          <Answer
            answer={ acc.answer }
            key={ acc.answer }
            status={ acc.status }
            index={ index }
            style={ acc.className }
            hasClicked={ this.handleAnswerClicked }
            isDisabled={ acc.disabled }
          />))}
        {
          disableNextQuestion
            && this.renderNextButton()
        }
        <Timer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addScore: () => dispatch(addAcerto()),
});

QuestionForm.propTypes = {
  category: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answer: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  scorePoint: PropTypes.func.isRequired,
  handleClickNextQuestion: PropTypes.func.isRequired,
  addScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(QuestionForm);
