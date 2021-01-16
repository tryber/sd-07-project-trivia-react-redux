import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const avatar = `https://www.gravatar.com/avatar/${md5(gravatarEmail)}`;
    return (
      <header>
        {console.log('Name em Header: ', name)}
        <img data-testid="header-profile-picture" src={ avatar } alt="avatar" />
        <h3>
          Player:
          <span data-testid="header-player-name">{ name }</span>
        </h3>
        <h3>
          Score:
          <span data-testid="header-score">{ score }</span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  loading: state.player.loading,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
