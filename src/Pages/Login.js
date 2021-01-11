import React from 'react';
import logo from '../trivia.png';
import '../App.css';
import LoginForm from '../Components/LoginForm';

export default function Login() {
  return (
    <div>
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        <LoginForm />
      </header>
    </div>
  );
}
