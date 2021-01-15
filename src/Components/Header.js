import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchGravatar } from '../actions';

class Header extends Component {
  componentDidMount() {
    const { gravatarImage, email } = this.props;
    gravatarImage(email);
  }

  render() {
    const { name, avatar, points } = this.props;
    return (
      <header>
        <img
          alt="user-info"
          data-testid="header-profile-picture"
          src={ avatar }
        />
        <p>
          Player:
          <span data-testid="header-player-name">{ name }</span>
        </p>
        <p>
          Score:
          <span data-testid="header-score">{ points }</span>
        </p>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  gravatarImage: (email) => dispatch(fetchGravatar({ email })),
});

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  avatar: state.login.avatar,
  points: state.score.points,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatarImage: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
