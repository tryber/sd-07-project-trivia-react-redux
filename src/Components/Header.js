import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends Component {
  render() {
    const { name, hash } = this.props;
    return (
      <header className="App-header">
        <img
          alt="Imagem do Gravatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
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
  hash: state.questionsReducer.hash,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
