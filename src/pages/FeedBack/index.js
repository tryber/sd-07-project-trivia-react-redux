import React, { Component } from 'react';
import { Header, FeedBackScore } from '../../components';
import './FeedBack.css';

class FeedBack extends Component {
  render() {
    return (
      <div className="feedback-page">
        <Header />
        <FeedBackScore />
      </div>
    );
  }
}

export default FeedBack;
