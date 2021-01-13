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
    const { name, avatar } = this.props;
    const initialScore = 0;
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
          <span data-testid="header-score">{ initialScore }</span>
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
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatarImage: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
