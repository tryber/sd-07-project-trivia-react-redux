import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, name, points } = this.props;
    const hashEmail = md5(email);

    return (
      <header className="header">
        <div className="gamer-stats">
          <img
            className="gamer-avatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="avatar"
          />
          <div className="stats-container">
            <h3 data-testid="header-player-name">{name}</h3>
            <h3>
              Pontos:
              <span data-testid="header-score">{ points }</span>
            </h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.token.email,
  name: state.token.name,
  points: state.token.points,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
