import React from 'react';
import Header from '../components/header';

class Feedback extends React.Component {
  render() {
    return (
      <div className="feedback-screen">
        <div className="feedback-header">
          <Header />
        </div>
      </div>
    );
  }
}

export default Feedback;