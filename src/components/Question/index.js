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
import React from 'react';
import './style.css';

const Question = () => (
  <section>
    <div className="message-box">
      <p className="message">Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou menor</p>
    </div>
  </section>
);

export default Question;
