import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.getPlayerProfile = this.getPlayerProfile.bind(this);
  }

  getPlayerProfile() {
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state);
    return JSON.parse(localStorage.getItem('state'));
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header playerProfile={ this.getPlayerProfile() } />
      </div>
    );
  }
}

export default Feedback;
