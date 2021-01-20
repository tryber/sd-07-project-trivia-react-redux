import React, { Component } from 'react';
import Header from '../Components/Header';
import QuestionCard from '../Components/QuestionCard';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <section>
          <QuestionCard />
        </section>
      </div>
    );
  }
}

export default Game;
