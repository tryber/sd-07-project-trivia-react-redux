import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import { saveRanking } from '../../services/storageService';
import Header from '../../components/Header';
import './index.css';

class Feedback extends Component {
  componentDidMount() {
    const { player } = this.props;
    const hash = md5(player.gravatarEmail.trim().toLowerCase());
    const playerPicture = `https://www.gravatar.com/avatar/${hash}?s=36`;
    const newPlayerRanking = {
      name: player.name,
      score: player.score,
      picture: playerPicture,
    };
    saveRanking(newPlayerRanking);
  }

  handleRedirect(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { player } = this.props;
    const { assertions, score } = player;
    const sufficientAssertion = 3;
    return (
      <main className="wrapper">
        <Header />
        <div className="feedback__container">
          <div className="feedback__content">
            <div className="feedback__result__container">
              <p
                className="feedback__result feedback__title"
                data-testid="feedback-text"
              >
                {
                  assertions < sufficientAssertion
                    ? ('Podia ser melhor...')
                    : ('Mandou bem!')
                }
              </p>
              <div className="feedback__result">
                <p>Acertos:</p>
                <p
                  className="feedback__number"
                  data-testid="feedback-total-question"
                >
                  {assertions}
                </p>
              </div>
              <div className="feedback__result">
                <p>Pontos:</p>
                <p
                  className="feedback__number"
                  data-testid="feedback-total-score"
                >
                  {score}
                </p>
              </div>
            </div>
            <div className="feedback__actions">
              <button
                type="button"
                className="feedback__action feedback__action--primary"
                data-testid="btn-play-again"
                onClick={ () => this.handleRedirect('/') }
              >
                Jogar novamente
              </button>
              <button
                type="button"
                className="feedback__action"
                data-testid="btn-ranking"
                onClick={ () => this.handleRedirect('/ranking') }
              >
                Ver Ranking
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
