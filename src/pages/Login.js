import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
      </div>
    );
  }
}

export default Login;
