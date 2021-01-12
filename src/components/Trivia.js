import React from 'react';
import logo from '../trivia.png';

class Trivia extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default Trivia;
