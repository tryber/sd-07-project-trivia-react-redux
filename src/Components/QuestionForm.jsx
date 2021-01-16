import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Question from './Question';
import Timer from './Timer';
import Answer from './Answer';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
    this.setAnswerInState = this.setAnswersInState.bind(this);
    this.state = {
      answers: [],
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

  handleAnswerClicked() {
    const { answer, scorePoint } = this.props;
    const newAnswers = [...answer];

    for (let i = 0; i < newAnswers.length; i += 1) {
      newAnswers[i].className = `btn-actions-${newAnswers[i].status}`;
      newAnswers[i].disabled = true;
      scorePoint();
    }

    this.setState({ answers: newAnswers });
  }

  render() {
    // console.log(this.props)
    const { category, questionText } = this.props;
    const { answers } = this.state;
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
        <hr />
        <button type="button" className="btn-actions">Próxima</button>
        <Timer />
      </div>
    );
  }
}

QuestionForm.propTypes = {
  category: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  answer: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  scorePoint: PropTypes.func.isRequired,
};

export default QuestionForm;
