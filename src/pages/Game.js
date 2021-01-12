import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { apiQuestions } from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    const { receiveQuestions, token } = this.props;
    receiveQuestions(token);
  }

  renderQuestions() {
    const { questions } = this.props;
    const { results } = questions;

    console.log(results);

    results.map((question, key) => (
      <div key={ key }>
        <h2
          data-testid="question-category"
        >
          {question.category}
        </h2>
        <h2
          data-testid="question-text"
        >
          {question.question}
        </h2>
        <button
          type="button"
          data-testid="correct-answer"
        >
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            {answer}
          </button>
        ))}
      </div>
    ));
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <header>
          <img
            alt="Imagem do Gravatar"
            data-testid="header-profile-picture"
            src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both"
          />
          <h2
            data-testid="header-player-name"
          >
            { name }
          </h2>
          <h2
            data-testid="header-score"
          >
            0
          </h2>
        </header>
        {this.renderQuestions}
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  // questions:  PropTypes.object(PropTypes.object).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  token: state.tokenReducer.token,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  receiveQuestions: (questions) => dispatch(apiQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
