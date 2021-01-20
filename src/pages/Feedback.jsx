import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.showMsg = this.showMsg.bind(this);
  }

  showMsg(assertions) {
    const minAssertions = 3;
    if (assertions >= minAssertions) {
      return <h1 data-testid="feedback-text">Mandou bem!</h1>;
    }
    return <h1 data-testid="feedback-text">Podia ser melhor...</h1>;
  }

  render() {
    const { assertions, score, history } = this.props;
    console.log(score);
    return (
      <div>
        <Header />
        <p>{this.showMsg(assertions)}</p>
        <h5>Placar Final</h5>
        <p data-testid="feedback-total-score">{score}</p>
        <h5>Pergutas acertadas:</h5>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button type="submit" data-testid="btn-play-again">
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
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.timer.acertos,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
