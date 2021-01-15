import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../css/Header.css';

class GameHeader extends Component {
  constructor() {
    super();
    this.fetchGravatar = this.fetchGravatar.bind(this);
    this.readLocalStorage = this.readLocalStorage.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  componentDidUpdate() {
    this.updateLocalStorage();
  }

  fetchGravatar() {
    const { getEmail } = this.props;
    const hashEmail = md5(getEmail);
    const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    return endPoint;
  }

  readLocalStorage() {
    const readStorage = JSON.parse(localStorage.getItem('state'));
    return readStorage;
  }

  updateLocalStorage() {
    const { getScore } = this.props;
    const currentStorage = this.readLocalStorage();
    const newStorage = { ...currentStorage,
      player: { ...currentStorage.player, score: getScore } };
    localStorage.setItem('state', JSON.stringify(newStorage));
  }

  render() {
    const { getName, getScore } = this.props;
    return (
      <header className="game-header-container">
        <img
          data-testid="header-profile-picture"
          src={ this.fetchGravatar() }
          alt={ getName }
        />
        <p data-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">{ getScore }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer, scoreReducer }) => ({
  getEmail: userReducer.email,
  getName: userReducer.name,
  getScore: scoreReducer.score,
});

GameHeader.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
