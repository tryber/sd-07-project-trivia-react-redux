import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import '../App.css';

class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <header className="App-header">
        <img
          alt="Imagem do Gravatar"
          data-testid="header-profile-picture"
          className="App-logo"
          src={ logo }
        />
        <h2
          data-testid="header-player-name"
        >
          {name}
        </h2>
        <h2
          data-testid="header-score"
        >
          0
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
