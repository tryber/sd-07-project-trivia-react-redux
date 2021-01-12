import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionAnswered } from '../../redux/actions';

class CorrectAnswer extends Component {
  render() {
    const { answer, isAnswered, changeColor } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="correct-answer"
          className={ isAnswered ? 'answer-button-correct' : 'answer-button' }
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

CorrectAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectAnswer);
