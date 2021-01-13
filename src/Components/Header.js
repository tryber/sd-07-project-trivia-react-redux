import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name } = this.props;
    return (
      <header>
        <img
          alt="Imagem do Gravatar"
          data-testid="header-profile-picture"
          src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both"
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
