import React, { Component } from 'react';

class EndGame extends Component {
  constructor() {
    super();

    this.changeMessage = this.changeMessage.bind(this);
  }

  changeMessage() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const correctAnswers = getLocalStorage.player.assertions;
    console.log(correctAnswers);
    const congratulations = 3;
    if (correctAnswers >= congratulations) {
      return 'Mandou bem!';
    }
    return 'Podia ser melhor...';
  }

  render() {
    return (
      <div>
        <span data-testid="feedback-text">{ this.changeMessage() }</span>
      </div>
    );
  }
}

export default EndGame;
