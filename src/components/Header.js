import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import actions from '../actions';

class Header extends React.Component {
  render() {
    const { name, gravatar } = this.props;
    const { player: { score } } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatar } alt="Profile" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.gamepage.gravatar,
  name: state.login.name,
  score: state.gamepage.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // score: PropTypes.number.isRequired,
//   userEmail: PropTypes.string.isRequired,
};
