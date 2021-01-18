import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Answer extends React.Component {
  render() {
    const { answer, status, index, isOver } = this.props;
    const data = status === 'correct' ? `${status}-answer` : `${status}-answer-${index}`;
    console.log(answer);
    return (
      <button
        id={ answer }
        type="button"
        className="btn-actions"
        data-testid={ data }
        disabled={ isOver.timer === 0 ? 'true' : 'false' || 'false' }
      >
        { answer }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  isOver: state.timer,

});

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isOver: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, null)(Answer);
