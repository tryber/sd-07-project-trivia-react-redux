import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatar, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatar }
            alt="Avatar do usuário"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">
            Nome:
            { name }
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  gravatar: state.gravatar.gravatar,
  score: state.score.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
