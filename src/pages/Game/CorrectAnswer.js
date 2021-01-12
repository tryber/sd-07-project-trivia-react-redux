import React, { Component } from 'react';

class CorrectAnswer extends Component {
  render() {
    const { answer } = this.props;
    return (
      <div>
        <button type="button" data-testid="correct-answer">
          { answer }
        </button>
      </div>
    );
  }
}

export default CorrectAnswer;
