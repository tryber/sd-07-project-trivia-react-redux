import React, { Component } from 'react';

class WrongAnswer extends Component {
  render() {
    const { answer, index } = this.props;
    const label = `wrong-answer-${index}`;
    return (
      <div>
        <button type="button" data-testid={ label }>
          { answer }
        </button>
      </div>
    );
  }
}

export default WrongAnswer;
