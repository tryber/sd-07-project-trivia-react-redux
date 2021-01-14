import React, { Component } from 'react';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Play extends Component {
  render() {
    return (
      <div>
        <Header />
        <Trivia />
      </div>
    );
  }
}

export default Play;
