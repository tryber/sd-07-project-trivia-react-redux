import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    const { name, score, picture, assertions } = JSON
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
        <div className="score-header">
          <img src={ picture } data-testid="header-profile-picture" alt="gravatar" />
          <p data-testid="header-player-name">
            {`Nome: ${name}`}
          </p>
          <p data-testid="header-score">
            { score }
          </p>

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
            <button type="button" data-testid="btn-play-again" className="button">
              <Link to="/" className="btn">
                Jogar novamente
              </Link>
            </button>
            <button type="button" data-testid="btn-ranking" className="button">
              <Link to="/ranking" className="btn">
                Ranking
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
