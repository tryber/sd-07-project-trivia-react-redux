import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { hashRequest } from '../actions/index';

class GameHeader extends React.Component {
  constructor() {
    super();

    this.convertToHash = this.convertToHash.bind(this);
  }

  componentDidMount() {
    this.convertToHash();
  }

  convertToHash() {
    const { email, hashAction } = this.props;
    const returnedHash = md5(email).toString();
    hashAction(returnedHash);
  }

  render() {
    const { name, score, hash } = this.props;
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ src }
          alt=""
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hashAction: (returnedHash) => dispatch(hashRequest(returnedHash)),
});

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  score: state.game.score,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  hash: PropTypes.string,
  hashAction: PropTypes.func.isRequired,
};

GameHeader.defaultProps = {
  hash: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
