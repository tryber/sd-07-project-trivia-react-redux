import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions/index';
import Header from '../Components/Header';

class Game extends Component {
  render() {
    const { questions, isFetching } = this.props;
    const options = [...questions[0].incorrect_answers,
      questions[0].correct_answer]
      .sort();
    if (isFetching) {
      return <p>Loading</p>;
    }
    return (
      <div>
        <Header />
        <section>
          <div>
            {questions && (
              <div key={ Math.random() }>
                <h5 data-testid="question-category">
                  { questions[0].category }
                </h5>
                <h5 data-testid="question-text">
                  { questions[0].question }
                </h5>
                {/* <button
                  data-testid="correct-answer"
                  value="correct"
                  type="button"
                  onClick={ (e) => this.answerAnalyze(e) }
                >
                  {questions[0].correct_answer}
                </button> */}
                {options
                  .map((answer, index) => (
                    <button
                      key={ index }
                      data-testid={ answer === option[0].correct_answer ? 'correct-answer' : `wrong-answer-${index}` }
                      value="incorrect"
                      type="button"
                      onClick={ (e) => this.answerAnalyze(e) }
                    >
                      { answer }
                    </button>))}
              </div>)}
          </div>
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  questions: state.questionsReducer.questions,
  isFetching: state.questionsReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
