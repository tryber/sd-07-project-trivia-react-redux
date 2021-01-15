import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { gravatar } = this.props;
    const { hashData } = gravatar;
    const getStateSaved = JSON.parse(localStorage.getItem('state'));
    const { score, name } = getStateSaved.player;
    return (
      <div>
        <h1>TRIVIA</h1>
        <img src={ hashData } alt="profile-player" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.gravatar,
});

Header.propTypes = {
  gravatar: PropTypes.shape({
    hashData: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
