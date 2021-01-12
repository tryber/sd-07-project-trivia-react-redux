import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionAnswered } from '../../redux/actions';

class WrongAnswer extends Component {
  render() {
    const { answer, index, isAnswered, changeColor } = this.props;
    const label = `wrong-answer-${index}`;
    return (
      <div>
        <button
          type="button"
          data-testid={ label }
          className={ isAnswered ? 'answer-button-wrong' : 'answer-button' }
          onClick={ () => changeColor() }
        >
          { answer }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAnswered: state.questionAnswererd.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  changeColor: () => dispatch(questionAnswered()),
});

WrongAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WrongAnswer);
