import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './questionList.css';
import GameTimer from '../GameTimer';

class QuestionsList extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.timerZero = this.timerZero.bind(this);
  }

  timerZero() {
    this.setState({
      clicked: true,
    });
  }

  render() {
    const { list } = this.props;
    const { clicked } = this.state;
    const { timerZero } = this;
    if (!list[0]) return <h1>...Carregando</h1>;
    return (
      <div>
        <span data-testid="question-category">{list[0].category}</span>
        <h1 data-testid="question-text">{list[0].question}</h1>
        <button
          type="button"
          data-testid="correct-answer"
          className={ clicked ? 'correct-answer-color' : '' }
          disabled={ clicked }
          onClick={ timerZero }
        >
          {list[0].correct_answer}
        </button>
        {list[0].incorrect_answers.map((incorrect, index) => (
          <button
            type="button"
            key={ incorrect }
            data-testid={ `wrong-answer-${index}` }
            className={ clicked ? 'wrong-answer-color' : '' }
            disabled={ clicked }
            onClick={ timerZero }
          >
            { incorrect }
          </button>
        ))}
        <GameTimer timerZero={ this.timerZero } clicked={ clicked } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.game.QuestionsList,
});

QuestionsList.propTypes = {
  list: PropTypes.shape(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(QuestionsList);
