import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div>
        <h1>player info</h1>
        <h1>Token da requisição</h1>
        {localStorage.token}
      </div>
    );
  }
}

export default Game;
