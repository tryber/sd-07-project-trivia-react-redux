import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: false };

    this.renderMessage = this.renderMessage.bind(this);
    this.toRanking = this.toRanking.bind(this);
  }

  toRanking() {
    this.setState({ redirect: true });
  }

  renderMessage(assertions) {
    const parameter = 3;
    if (assertions < parameter) {
      return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>);
    }
    return (<h1 data-testid="feedback-text">Mandou bem!</h1>);
  }

  render() {
    const { score, assertions } = this.props;
    const { redirect } = this.state;
    if (redirect) return (<Redirect to="/ranking" />);
    return (
      <div>
        <Header />
        { this.renderMessage(assertions) }
        <div className="score-questions-container">
          <h3
            data-testid="feedback-total-quesiton"
          >
            { `Você acertou ${assertions} questões!` }
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            { `Um total de ${score} pontos!` }
          </h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.toRanking }
          >
            Ver Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;

export default Feedback;
