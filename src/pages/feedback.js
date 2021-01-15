import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';
import HomeButton from '../components/HomeButton';
import RankingButton from '../components/RankingButton';

class Feedback extends Component {
  constructor() {
    super();
    this.renderAssertionsText = this.renderAssertionsText.bind(this);
  }

  renderAssertionsText(assertions) {
    return (
      <p>
        Você acertou
        <span data-testid="feedback-total-question">
          { assertions }
        </span>
        Perguntas
      </p>
    );
  }

  render() {
    const { renderAssertionsText } = this;
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <section data-testid="feedback-text">
          { renderAssertionsText(assertions) }
          { assertions < three ? <h1>Podia ser melhor...</h1> : <h1>Mandou bem!</h1> }
          <h1>
            Você conseguiu
            <span data-testid="feedback-total-score">
              { score }
            </span>
            pontos!!!
          </h1>
        </section>
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <RankingButton />
        <HomeButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
