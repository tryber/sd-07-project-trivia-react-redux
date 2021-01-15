import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor() {
    super();
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    const score = JSON.parse(localStorage.getItem('state'));
    console.log('score', score);
    return score.player.score;
  }

  render() {
    const { assertions } = this.props;
    const three = 3;
    console.log('quest', assertions);
    return (
      <div data-testid="feedback-text">
        <Header />
        { assertions < three
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.QuestionRequest.assertions,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  assertions: PropTypes.string.isRequired,
};
