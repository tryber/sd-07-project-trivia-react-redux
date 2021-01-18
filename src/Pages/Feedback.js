import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultMessage: {
        badResult: 'Podia ser melhor...',
        goodResult: 'Mandou bem!',
      },
    };
  }

  render() {
    const { score, assertions } = this.props;
    const { resultMessage } = this.state;
    const cutOff = 3;
    return (
      <div>
        <Header />
        <div>
          <h1>RESULTADO</h1>
          <p data-testid="feedback-text">
            {assertions >= cutOff
              ? resultMessage.goodResult
              : resultMessage.badResult}
          </p>
          <h2>
            <h3>Pontuação Total: </h3>
            <span data-testid="feedback-total-score">
              {score === undefined ? 0 : score}
            </span>
          </h2>
          <h2>
            <h3>Total de Acertos:</h3>
            <span data-testid="feedback-total-question">
              {assertions === undefined ? 0 : assertions}
            </span>
          </h2>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
