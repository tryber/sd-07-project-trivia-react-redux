import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const getRakingSaved = JSON.parse(localStorage.getItem('ranking'));
    const { name, picture } = getRakingSaved[getRakingSaved.length - 1];
    return (
      <div>
        <h1>TRIVIA</h1>
        <img src={ picture } alt="profile-player" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <span data-testid="header-score">00</span>
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
