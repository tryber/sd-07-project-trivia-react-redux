import React from 'react';
import { Redirect } from 'react-router-dom';
import rank from '../mock/dataRank';
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
    localStorage.setItem('ranking', JSON.stringify(rank));

    const localRanking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => a.score > b.score ? -1 : a.score < b.score ? 1 : 0);

    const { login } = this.state;
    if (login) return <Redirect to="/" />;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            Ranking
          </p>
          <div className="class-ranking">
            {localRanking.map(({ picture, nome, score }, index = 1) => (
              <div key={ nome }>
                <img src={ picture } className="imagem-ranking" alt="ranking" />
                {' '}
                <span data-testid={ `player-name-${index}` }>
                  Nome:
                  {' '}
                  { nome }
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
