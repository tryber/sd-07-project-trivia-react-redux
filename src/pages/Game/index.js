import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Questions from './Questions';
import './index.css';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
