import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.resetStorage = this.resetStorage.bind(this);
  }

  resetStorage() {
    const { history } = this.props;
    const playerStorage = localStorage.getItem('state');
    const playerStorageJson = JSON.parse(playerStorage);
    const { name, gravatarEmail } = playerStorageJson.player;
    const newPlayer = {
      player: {
        name,
        gravatarEmail,
        assertions: 0,
        score: 0,
      },
    };
    localStorage.clear();
    localStorage.setItem('state', JSON.stringify(newPlayer));
    history.push('/');
  }

  render() {
    const { assertions, score, history } = this.props;
    const goodMessage = <p data-testid="feedback-text">Mandou bem!</p>;
    const badMessage = <p data-testid="feedback-text">Podia ser melhor...</p>;
    const three = 3;

    return (
      <div>
        <h1>FeedBack</h1>
        <Header />
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        { assertions < three ? badMessage : goodMessage }
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.resetStorage }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.userReducer.assertions,
  score: state.userReducer.score,
});

export default connect(mapStateToProps)(Feedback);
