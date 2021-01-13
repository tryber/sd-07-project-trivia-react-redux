import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      totalQuestion: 0,
      score: 0,
    };
    this.handleAssertions = this.handleAssertions.bind(this);
  }

  componentDidMount() {
    this.handleAssertions();
  }

  handleAssertions() {
    const finalResult = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = finalResult.player;
    this.setState({
      totalQuestion: assertions,
      score,
    });
  }

  render() {
    const { totalQuestion, score } = this.state;
    const TRES = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          { totalQuestion >= TRES ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h2>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ totalQuestion }</p>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
      </div>
    );
  }
}

export default Feedback;
