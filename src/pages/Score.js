import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newGame } from '../actions';
import Header from '../components/Header';
// import './Score.css';

class Score extends Component {
  render() {
    // Mock Local Storage para testes locais
    // const localStorageItem = JSON.stringify({
    //   player:{
    //     name: 'Nome da pessoa',
    //     assertions: 4,
    //     score: 300,
    //     picture: 'https://br.pinterest.com/pin/711568809856585527/',
    //   }});
    // localStorage.setItem('state',localStorageItem)
    // ----------------
    const { playAgain } = this.props;
    const { score, assertions } = JSON
      .parse(localStorage
        .getItem('state')).player;
    const limit = 3;
    let assertionMessage;

    switch (true) {
    case assertions < limit:
      assertionMessage = 'Podia ser melhor...';
      break;
    default:
      assertionMessage = 'Mandou bem!';
      break;
    }

    return (

      <div className="score-grid">
        <Header />
        <div className="score-notice">
          <p data-testid="feedback-text">
            { assertionMessage }
          </p>
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
        </div>
        <div className="score-buttons">
          <button type="button" className="button">
            <Link
              to="/"
              data-testid="btn-play-again"
              onClick={ playAgain }
              className="btn"
            >
              Jogar novamente
            </Link>
          </button>
          <button type="button" className="button">
            <Link data-testid="btn-ranking" to="/ranking" className="btn">
              Ranking
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  playAgain: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ playAgain: () => dispatch(newGame()) });

export default connect(null, mapDispatchToProps)(Score);
