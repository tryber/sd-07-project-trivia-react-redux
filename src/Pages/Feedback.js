import React from 'react';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1>Tela de Feedback</h1>
        <Header />
        <h3 data-testid="feedback-text">Texto da tela de feedback</h3>
      </>
    );
  }
}

export default Feedback;
