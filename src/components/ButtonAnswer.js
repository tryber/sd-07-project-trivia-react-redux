import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonAnswer extends React.Component {
  render() {
    const { onClick, disabled, dataTestid, className, item, showAnswers } = this.props;
    return (
      <button
        onClick={ onClick }
        disabled={ disabled }
        type="button"
        data-testid={ dataTestid }
        className={ showAnswers ? className : '' }
      >
        { item }
      </button>
    );
  }
}

ButtonAnswer.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  dataTestid: PropTypes.string.isRequired,
  showAnswers: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
