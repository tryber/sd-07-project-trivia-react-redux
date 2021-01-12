import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { fetchQuestions } from '../actions';

class Game extends Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  renderAllDataQuestion() {
    const { questions } = this.props;
    const { incorrect_answers, correct_answer, category, question } = this.question.results[0];
    const arrayAnswers = [...incorrect_answers, correct_answer];
  
  }

  render() {
    return (questions.results)
      ? (
        <div>
          <h1>TELA DE JOGO</h1>
          <h3 data-testid="question-category">{category}</h3>
          <h2 data-testid="question-text">{question}</h2>
          <div>
            {/* {
              arrayAnswers.map((answer) => <button type="button" key={ answer }>{ answer }</button>)
            } */}
          </div>
        </div>
      ) : <p>loading</p>;
  }
}
const mapStateToProps = ({ gameReducer }) => ({
  questions: gameReducer.questions,
  isFetching: gameReducer.isFetching,

});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Game);

// descobrir pq o estado inicial de questions ta vindo undefined
