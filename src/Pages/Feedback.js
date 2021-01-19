import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoRanking from '../Components/GoRanking';
import Header from '../Components/Header';
import PlayAgain from '../Components/PlayAgain';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { correctAnswers } = this.props;
    const message1 = 'Podia ser melhor...';
    const message2 = 'Mandou bem!';
    const minScore = 3;
    return (correctAnswers >= minScore) ? message2 : message1;
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        <PlayAgain { ...this.props } />
        <GoRanking { ...this.props } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswers: state.score.correctAnswers,
});

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);

// const playerObject = JSON.parse(localStorage.getItem('state'));
// const score = playerObject.player.score
