import React from 'react';
import './style.css';

class Answer extends React.Component {
  render() {
    return (
      <section className="answer-section">
        <div className="answer-box green">
          <p className="message">
            Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou menor
          </p>
        </div>
        <div className="answer-box pink">
          <p className="message">
            Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou menor
          </p>
        </div>
        <div className="answer-box orange">
          <p className="message">
            Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou menor
          </p>
        </div>
        <div className="answer-box purple">
          <p className="message">
            Pergunta meus colegas alguma coisarada escriyta! pode ser maior ou
          </p>
        </div>
      </section>
    );
  }
}

export default Answer;
