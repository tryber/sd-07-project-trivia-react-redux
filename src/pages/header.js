import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const hash = md5(email);
    return (
      <div className="header-nav">
        <br />
        <div className="header-player">
          <span data-testid="header-player-name">{ name }</span>
          <span data-testid="header-score">{ `${score} points` }</span>
        </div>
        <div className="header-gravatar">
          <img
            className="ui small circular image centered"
            data-testid="header-profile-picture"
            alt="gravatar"
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
