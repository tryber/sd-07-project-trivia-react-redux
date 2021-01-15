import React from 'react';
import PropTypes from 'prop-types';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { hasClicked } = this.props;

    hasClicked();
  }

  render() {
    const { answer, status, index, style, isDisabled } = this.props;
    const data = status === 'correct' ? `${status}-answer` : `${status}-answer-${index}`;
    return (
      <button
        id={ answer }
        type="button"
        className={ style }
        data-testid={ data }
        onClick={ () => this.handleClick() }
        disabled={ isDisabled }
      >
        { answer }
      </button>
    );
  }
}

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  hasClicked: PropTypes.func.isRequired,
};

export default Answer;
