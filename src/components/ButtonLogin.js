import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ButtonLogin extends Component {
  render() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
          className="login-buttons button-home"
        >
          Home
        </button>
      </Link>
    );
  }
}

export default ButtonLogin;
