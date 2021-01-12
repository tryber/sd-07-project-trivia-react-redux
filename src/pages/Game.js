import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { name } = this.props;
    console.log(name);
    return (
      <div>
        <header>
          <img
            alt="Imagem do Gravatar"
            data-testid="header-profile-picture"
            src="https://img.ibxk.com.br/2014/06/06/06165614150388.jpg?w=1120&h=420&mode=crop&scale=both"
          />
          <h2
            data-testid="header-player-name"
          >
            { name }
          </h2>
          <h2
            data-testid="header-score"
          >
            0
          </h2>
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
});

export default connect(mapStateToProps)(Game);
