import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(assertions) {
    const parameter = 3;
    if (assertions >= parameter) {
      return (<h1 data-testid="feedback-text">Mandou bem!</h1>);
    }
    return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>);
  }

  render() {
    const { history, score, assertions } = this.props;
    console.log(this.props);
    return (
      <div>
        <Header />
        { this.renderMessage(assertions) }
        <div className="score-questions-container">
          <h3 data-testid="feedback-total-quesiton">
            { `Você acertou ${assertions} questões!` }
          </h3>
          <h3 data-testid="feedback-total-score">
            { `Um total de ${score} pontos!` }
          </h3>
        </div>
        <button
          type="submit"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <div>
          <Link data-testid="btn-ranking" to="/ranking">
            Ver Ranking
          </Link>
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

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
