import React from 'react';
import Header from '../Components/Header';
import MessageFeedback from '../Components/MessageFeedback';
import ScoreFeedback from '../Components/ScoreFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1>Tela de Feedback</h1>
        <Header />
        <MessageFeedback />
        <ScoreFeedback />
      </>
    );
  }
}

export default Feedback;
