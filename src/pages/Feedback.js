import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeedbackMSG from '../components/FeedbackMSG';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.getPlayerProfile = this.getPlayerProfile.bind(this);
    this.renderMSG = this.renderMSG.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  getPlayerProfile() {
    return JSON.parse(localStorage.getItem('state'));
  }

  handlePlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  renderMSG() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player } = state;
    return player;
  }

  render() {
    return (
      <div>
        <Header playerProfile={ this.getPlayerProfile() } />
        <FeedbackMSG
          player={ this.renderMSG() }
          handlePlayAgain={ this.handlePlayAgain }
          handleRanking={ this.handleRanking }
        />
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
