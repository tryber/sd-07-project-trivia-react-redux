import React from 'react';
import '../App.css';
import Question from './Question';
import Timer from './Timer';

class QuestionForm extends React.Component {
  render() {
    return (
      <div className="form-login">
        <div className="question" />
        <p>Categry</p>
        <Question />
        <label htmlFor="answer_1" className="label-form answer wrong-answer">
          <input type="radio" name="answer" id="answer_1" value="answer_5" />
          answer_1
        </label>
        <label htmlFor="answer_2" className="label-form answer">
          <input type="radio" name="answer" id="answer_2" value="answer_5" />
          answer_2
        </label>
        <label htmlFor="answer_3" className="label-form answer">
          <input type="radio" name="answer" id="answer_3" value="answer_5" />
          answer_3
        </label>
        <label htmlFor="answer_4" className="label-form answer">
          <input type="radio" name="answer" id="answer_4" value="answer_5" />
          answer_4
        </label>
        <label htmlFor="answer_5" className="label-form answer">
          <input type="radio" name="answer" id="answer_5" value="answer_5" />
          answer_5
        </label>
        <button type="button" className="btn-actions">Próxima</button>
        <Timer />
      </div>
    );
  }
}

export default QuestionForm;
