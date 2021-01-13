import React, { Component } from 'react';
import './style.css';

class Question extends Component {
  render() {
    return (
      <section>
        <div data-testid="question-category" />
        <div data-testid="question-text" />
      </section>
    );
  }
}

export default Question;
