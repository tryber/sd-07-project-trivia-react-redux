import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Question from './Question';
import Timer from './Timer';
import Answer from './Answer';

class QuestionForm extends React.Component {
  render() {
    const { category, questionText, answer } = this.props;
    return (
      <div className="form-login">
        <span className="category" data-testid="question-category">
          {category}
        </span>
        <div className="question" />
        <Question content={ questionText } />
        {answer.map((acc, index) => (
          <Answer
            answer={ acc.answer }
            key={ acc.answer }
            status={ acc.status }
            index={ index }
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
};

export default QuestionForm;
