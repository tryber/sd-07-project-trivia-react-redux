import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { player: { name, picture, score } } = this.props;
    return (
      <div>
        <img
          src={ picture }
          alt="Profile"
          data-testid="header-profile-picture"
        />
        <h3>
          Name:
          <span data-testid="header-player-name">{name}</span>
        </h3>
        <h3>
          Score:
          <span data-testid="header-score">{ score || '0' }</span>
        </h3>
      </div>
    );
  }
}

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.user.player,
});

export default connect(mapStateToProps)(Header);
