import React from 'react';

export default class ButtonAnswer extends React.Component {
  render() {
    const { onClick, disabled, dataTestid, className, item, showAnswers } = this.props;
    console.log(dataTestid)
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
