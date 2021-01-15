import React, { Component } from 'react';
import '../css/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
    this.goToRaking = this.goToRaking.bind(this);
  }

  goToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  goToRaking() {
    const { history } = this.props;
    history.push('/ranking');
  }
  
  render() {
    return (
      <div className="feedback-container">
        <h1>FEEDBACK SCREEN</h1>
        <p data-testid="feedback-text">texto de feedback dos acertos</p>
        <button data-testid="btn-ranking" onClick={ this.goToRaking } >VER RANKING</button>
        <button data-testid="btn-go-home" onClick={ this.goToLogin } >JOGAR NOVAMENTE</button>
      </div>
    );
  }
}

export default Feedback;
