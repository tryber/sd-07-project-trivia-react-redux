import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScore } from '../../redux/actions';

class WrongAnswer extends Component {
  render() {
    const { answer, index, isAnswered, actionSetScore } = this.props;
    const label = `wrong-answer-${index}`;
    return (
      <button
        type="button"
        data-testid={ label }
        disabled={ isAnswered }
        className={ isAnswered ? 'answer-button-wrong' : 'answer-button' }
        onClick={ () => actionSetScore(true, false, 0, 'none') }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isAnswered: state.questionAnswererd.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  actionSetScore: (a, b, c, d) => dispatch(setScore(a, b, c, d)),
});

WrongAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  actionSetScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WrongAnswer);
