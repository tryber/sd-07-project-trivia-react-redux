import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.makeRanking = this.makeRanking.bind(this);
  }

  compare(a, b) {
    const OnePositive = 1;
    const OneNegative = -1;

    if (a.score < b.score) { return OnePositive; }
    if (a.score > b.score) { return OneNegative; }
    return 0;
  }

  makeRanking(ranking) {
    return ranking.sort(this.compare);
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>

        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        {
          (ranking.length)
            ? this.makeRanking(ranking)
              .map(({ image, name, score }, index) => (
                <div key={ image }>
                  <img src={ image } alt="Imagem avatar" />
                  <p data-testid={ `player-name-${index}` }>{name}</p>
                  <p data-testid={ `player-score-${index}` }>{score}</p>
                </div>
              ))
            : <span>Não existe jogadores</span>
        }
      </div>
    );
  }
}

export default Ranking;
