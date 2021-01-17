import React from 'react';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import '../App.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
    this.handlerInit = this.handlerInit.bind(this);
  }

  handlerInit() {
    this.setState({
      login: true,
    });
  }

  render() {
    const { login } = this.state;

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

    const ranking = [...JSON.parse(localStorage.getItem('ranking')), rank];

    localStorage.setItem('ranking', JSON.stringify(ranking));

    const requestRanking = JSON.parse(localStorage.getItem('ranking'));

    const localRanking = requestRanking.sort((a, b) => a.score - b.score);

    if (login) return <Redirect to="/" />;
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
                <span data-testid={ `player-name-${index}` }>
                  Nome:
                  {' '}
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
            data-testid="btn-go-home"
            onClick={ this.handlerInit }
          >
            Home
          </button>
        </header>
      </div>
    );
  }
}

export default Ranking;
