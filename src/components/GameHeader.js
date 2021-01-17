import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getPicture as takePicture } from '../actions';
import '../css/Header.css';

class GameHeader extends Component {
  constructor() {
    super();
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.readLocalState = this.readLocalState.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
    this.readLocalRanking = this.readLocalRanking.bind(this);
    this.updateLocalRanking = this.updateLocalRanking.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  componentDidUpdate() {
    this.updateLocalState();
    this.updateLocalRanking();
  }

  fetchGravatar() {
    const { getEmail, sendPicture } = this.props;
    const hashEmail = md5(getEmail);
    const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    sendPicture(endPoint);
  }

  readLocalState() {
    const readState = JSON.parse(localStorage.getItem('state'));
    return readState;
  }

  updateLocalState() {
    const { getName, getEmail, getScore, getAssertions } = this.props;
    const currentState = this.readLocalState();
    const newStateStorage = {
      ...currentState,
      player: {
        name: getName,
        gravatarEmail: getEmail,
        score: getScore,
        assertions: getAssertions,
      },
    };
    localStorage.setItem('state', JSON.stringify(newStateStorage));
  }

  readLocalRanking() {
    const readRanking = JSON.parse(localStorage.getItem('ranking'));
    return readRanking;
  }

  updateLocalRanking() {
    const { getName, getScore, getPicture } = this.props;
    const currentRanking = this.readLocalRanking();
    const newRankingStorage = currentRanking.map((user) => {
      if (user.name === getName) {
        return { name: getName, picture: getPicture, score: getScore };
      }
      return user;
    });
    localStorage.setItem('ranking', JSON.stringify(newRankingStorage));
  }

  render() {
    const { getName, getScore, getPicture } = this.props;
    return (
      <header className="game-header-container">
        <img
          data-testid="header-profile-picture"
          src={ getPicture }
          alt={ getName }
        />
        <p data-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">{ getScore }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer, scoreReducer }) => ({
  getName: userReducer.name,
  getEmail: userReducer.email,
  getScore: scoreReducer.score,
  getAssertions: scoreReducer.correctAnswers,
  getPicture: userReducer.picture,
});

const mapDispatchToProps = (dispatch) => ({
  sendPicture: (picture) => dispatch(takePicture(picture)),
});

GameHeader.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getPicture: PropTypes.string.isRequired,
  getAssertions: PropTypes.number.isRequired,
  sendPicture: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
