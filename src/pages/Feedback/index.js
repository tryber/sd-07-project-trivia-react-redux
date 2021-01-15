import React, { Component } from 'react';
import { Header } from '../../components';

class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">FEEDBACK PAGE</h1>
      </>
    );
  }
}

export default Feedback;
