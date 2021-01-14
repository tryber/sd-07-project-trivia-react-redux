import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(assertions) {
    const parameter = 3;
    if (assertions < parameter) {
      return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>);
    }
    return (<h1 data-testid="feedback-text">Mandou bem!</h1>);
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        { this.renderMessage(assertions) }
        <div className="score-questions-container">
          <h3
            data-testid="feedback-total-quesiton"
          >
            { `Você acertou ${assertions} questões!` }
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            { `Um total de ${score} pontos!` }
          </h3>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;

export default Feedback;
