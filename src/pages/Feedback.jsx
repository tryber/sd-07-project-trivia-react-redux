import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(correctQuestions) {
    if (correctQuestions < 3) {
      return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>);
    }
    return (<h1 data-testid="feedback-text">Mandou bem!</h1>);
  }

  render() {
    const { src, name, score, correctQuestions } = this.props;
    return (
      <div>
        <Header
          imgSource={ src }
          playerName={ name }
          playerScore={ score }
        />
        { this.renderMessage(correctQuestions) }
        <div className="score-questions-container">
          <h3
            data-testid="feedback-total-quesiton"
          >
            Você acertou
            { correctQuestions }
            questões!
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            Um total de
            { score }
            pontos!
          </h3>
        </div>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  correctQuestions: propTypes.number,
}.isRequired;
