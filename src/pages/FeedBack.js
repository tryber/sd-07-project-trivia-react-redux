import React, { Component } from 'react';
import Header from '../components/Header';

export default class FeedBack extends Component {
  render() {
    return (
      <div>
        <Header />
        feedback
        <p data-testid="feedback-text"> voce é top</p>
      </div>
    );
  }
}
