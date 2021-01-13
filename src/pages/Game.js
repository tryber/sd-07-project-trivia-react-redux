import React, { Component } from 'react';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { getQuestions } from '../helpers/index';

class Game extends Component {
  // componentDidMount() {
  //   this.getPlayerProfile();
  // }

  getPlayerProfile() {
    return JSON.parse(localStorage.getItem('state'));
    // console.log(playerProfile);
  }

  render() {
    return (
      <div>
        <Header playerProfile={ this.getPlayerProfile() } />
        <Trivia response={ getQuestions() } />
      </div>
    );
  }
}

export default Game;
