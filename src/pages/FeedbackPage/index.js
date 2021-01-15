import React, { Component } from 'react';
import Header from '../../components/Header';
import Feedback from '../../components/Feedback';

class FeedbackPage extends Component {
  render() {
    return (
      <>
        <Header />
        <Feedback />
        {/* <h1 data-testid="feedback-text">Feedback Page</h1> */}
      </>
    );
  }
}

export default FeedbackPage;
