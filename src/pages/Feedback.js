import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.resetStorage = this.resetStorage.bind(this);
    this.generateRanking = this.generateRanking.bind(this);
  }

  generateRanking() {
    const { history } = this.props;

    const localStorageRanking = localStorage.getItem('ranking');
    if (!localStorageRanking) {
      const array = [];
      const playerJson = localStorage.getItem('state');
      const player = JSON.parse(playerJson);
      array.push(player);
      localStorage.setItem('ranking', JSON.stringify(array));
    } else {
      const arrayConverted = JSON.parse(localStorageRanking);
      const playerJson = localStorage.getItem('state');
      const player = JSON.parse(playerJson);
      arrayConverted.push(player);
      localStorage.setItem('ranking', JSON.stringify(arrayConverted));
    }
    history.push('/ranking');
  }

  resetStorage() {
    const localStorageRanking = localStorage.getItem('ranking');
    if (!localStorageRanking) {
      const array = [];
      const playerJson = localStorage.getItem('state');
      const player = JSON.parse(playerJson);
      array.push(player);
      localStorage.setItem('ranking', JSON.stringify(array));
    } else {
      const arrayConverted = JSON.parse(localStorageRanking);
      const playerJson = localStorage.getItem('state');
      const player = JSON.parse(playerJson);
      arrayConverted.push(player);
      localStorage.setItem('ranking', JSON.stringify(arrayConverted));
    }

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
    localStorage.setItem('state', JSON.stringify(newPlayer));
    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const goodMessage = <p data-testid="feedback-text">Mandou bem!</p>;
    const badMessage = <p data-testid="feedback-text">Podia ser melhor...</p>;
    const three = 3;

    return (
      <div>
        <h1>FeedBack</h1>
        <Header />
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <h2 data-testid="feedback-total-question">
          {assertions}
        </h2>
        { assertions < three ? badMessage : goodMessage}
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.generateRanking }
          >
            Ver Ranking
          </button>
        </Link>
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
