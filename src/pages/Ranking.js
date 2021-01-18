import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { newGame } from '../actions';
import logo from '../trivia.png';
import '../App.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.handlerInit = this.handlerInit.bind(this);
  }

  handlerInit() {
    const { playAgain } = this.props;
    playAgain();
  }

  render() {
    let rankMore = [];

    if (JSON.parse(localStorage.getItem('ranking')) !== null) {
      rankMore = JSON.parse(localStorage.getItem('ranking'));
    }

    const players = JSON.parse(localStorage.getItem('state')).player;

    const { name: nome,
      score: pontos,
      gravatarEmail,
    } = players;

    const rank = {
      name: nome,
      score: pontos,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail)}`,
    };

    const ranking = [...rankMore, rank];

    localStorage.setItem('ranking', JSON.stringify(ranking));

    const requestRanking = JSON.parse(localStorage.getItem('ranking'));

    const localRanking = requestRanking.sort((a, b) => {
      const descend = -1;
      const ascend = 1;
      if (a.score > b.score) return descend;
      return ascend;
    });

    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 data-testid="ranking-title">
            Ranking
          </h1>
          <div className="class-ranking">
            {localRanking.map(({ picture, name, score }, index) => (
              <div key={ nome }>
                <img src={ picture } className="imagem-ranking" alt="ranking" />
                {' '}
                <span>
                  Nome:
                  {' '}
                </span>
                <span data-testid={ `player-name-${index}` }>
                  { name }
                </span>
                {' '}
                {' '}
                <span data-testid={ `player-score-${index}` }>
                  Score:
                  {' '}
                  { score }
                </span>
              </div>
            ))}
          </div>
          <br />
          <button
            type="button"
            onClick={ this.handlerInit }
          >
            <Link data-testid="btn-go-home" to="/">Home</Link>
          </button>
        </header>
      </div>
    );
  }
}

Ranking.propTypes = {
  playAgain: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ playAgain: () => dispatch(newGame()) });

export default connect(null, mapDispatchToProps)(Ranking);
