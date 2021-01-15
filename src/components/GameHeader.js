import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../css/Header.css';

class GameHeader extends Component {
  constructor() {
    super();
    this.fetchGravatar = this.fetchGravatar.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  fetchGravatar() {
    const { getEmail } = this.props;
    const hashEmail = md5(getEmail);
    const endPoint = `https://www.gravatar.com/avatar/${hashEmail}`;
    return endPoint;
  }

  render() {
    const { getName } = this.props;
    return (
      <header className="game-header-container">
        <img
          data-testid="header-profile-picture"
          src={ this.fetchGravatar() }
          alt={ getName }
        />
        <p data-testid="header-player-name">{ getName }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = ({ userReducer }) => ({
  getEmail: userReducer.email,
  getName: userReducer.name,
});

GameHeader.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GameHeader);
