import React from 'react';
import Header from '../Components/Header';
import MessageFeedback from '../Components/MessageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1>Tela de Feedback</h1>
        <Header />
        <MessageFeedback />
      </>
    );
  }
}

export default Feedback;
