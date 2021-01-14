import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changeColor } from '../actions';
import './Answer.css';

class Answer extends Component {
  constructor() {
    super();

    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    const { changeClass } = this.props;
    changeClass();
  }

  render() {
    const { item, click, disable } = this.props;
    const { answer, value } = item;
    const correctAnswer = -1;
    if (value !== correctAnswer) {
      return (
        <button
          type="button"
          data-testid={ `wrong-answer-${value}` }
          className={ `wrong-answer${click}` }
          onClick={ this.clicked }
          disabled={ disable }
        >
          { answer }
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="correct-answer"
        className={ `correct-answer${click}` }
        onClick={ this.clicked }
        disabled={ disable }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  disable: state.timer.disable,
  click: state.questions.click,
});

const mapDispatchToProps = (dispatch) => ({
  changeClass: () => dispatch(changeColor()) });

export default connect(mapStateToProps, mapDispatchToProps)(Answer);

Answer.propTypes = {
  item: propTypes.shape({
    answer: propTypes.string,
    value: propTypes.number,
  }),
}.isRequired;
