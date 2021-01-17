import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;

    return (
      <div>
        <header className="header">
          <div className="user-infos">
            <img
              alt="user avatar"
              data-testid="header-profile-picture"
              src={ gravatarEmail }
            />
            <span>
              <h3>Jogador: </h3>
              <span data-testid="header-player-name">
                { name }
              </span>
            </span>
            <span>
              <h3>Score: </h3>
              <span data-testid="header-score">
                { score }
              </span>
            </span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
