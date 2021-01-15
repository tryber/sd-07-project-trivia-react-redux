import React, { Component } from 'react';
import FeedbackMSG from '../components/FeedbackMSG';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.getPlayerProfile = this.getPlayerProfile.bind(this);
    this.renderMSG = this.renderMSG.bind(this);
  }

  getPlayerProfile() {
    return JSON.parse(localStorage.getItem('state'));
  }

  renderMSG() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = state;
    return assertions;
  }

  render() {
    return (
      <div>
        <Header playerProfile={ this.getPlayerProfile() } />
        <FeedbackMSG assertions={ this.renderMSG() } />
      </div>
    );
  }
}

export default Feedback;
