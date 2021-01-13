import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import gravatarAPI from '../services/gravatarAPI';
import './Header.css';

class Header extends Component {
  render() {
    const { emailGravatar, name, score } = this.props;
    return (
      <header>
        <div class="header-components-container">
        <img
          class="header-component"
          src={ gravatarAPI(emailGravatar) }
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <p class="header-component" data-testid="header-player-name">{name}</p>
        <p class="header-component" data-testid="header-score">
          {score}
        </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGravatar: state.playerReducer.emailGravatar,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailGravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
