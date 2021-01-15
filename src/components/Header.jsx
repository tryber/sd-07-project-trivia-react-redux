import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.createGravatarUrl = this.createGravatarUrl.bind(this);
  }

  createGravatarUrl(email) {
    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { user, game } = this.props;
    const gravatarUrl = this.createGravatarUrl(user.email);
    return (
      <header className="header">
       <div> 
         <h1>
           Trivia Game
         </h1>
       </div>
       <div className="user-info">
        <img
            data-testid="header-profile-picture"
            alt={ user.name }
            src={ gravatarUrl }
          />
          <div data-testid="header-player-name">{user.name}</div>
          <div data-testid="header-score">{game.score}</div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  game: state.game,
});

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
