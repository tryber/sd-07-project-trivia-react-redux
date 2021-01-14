import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import './Game.css';

export default class Game extends Component {
  render() {
    return (
      <div className="game-div">
        <Header />
        <Question />
      </div>
    );
  }
}
