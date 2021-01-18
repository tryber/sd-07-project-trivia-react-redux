import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
  }

  getFeedbackMessage(assertions) {
    const three = 3;
    if (assertions < three) return 'Podia ser melhor...';
    if (assertions >= three) return 'Mandou bem!';
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = state.player;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">{ this.getFeedbackMessage(assertions) }</span>
        <div>
          <div data-testid="feedback-total-score">{ score }</div>
          <div data-testid="feedback-total-question">{ assertions }</div>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
