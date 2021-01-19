import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Answer extends React.Component {
  render() {
    const { answer, status, index, onLoading } = this.props;
    const data = status === 'correct' ? `${status}-answer` : `${status}-answer-${index}`;
    return (
      <button
        id={ answer }
        type="button"
        className="btn-actions"
        data-testid={ data }
        disabled={ onLoading }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isOver: state.timer,
  onLoading: state.timer.onLoading,

});

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Answer);
