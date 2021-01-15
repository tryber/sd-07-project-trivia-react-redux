import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RankScreen extends Component {
  // componentDidMount() {
  //   this.createRank();
  // }

  createRank() {
    const stringRank = localStorage.getItem('ranking');

    const arrayRank = JSON.parse(stringRank);

    const sortedRank = arrayRank.sort((act, next) => {
      const order = -1;
      if (act.score > next.score) {
        return order;
      }
      if (act.score < next.score) {
        return -order;
      }
      return 0;
    });

    localStorage.setItem('ranking', JSON.stringify(sortedRank));

    return sortedRank.map((elem, index) => (
      <div key={ elem.picture }>
        <img src={ elem.picture } alt={ elem.picture } />
        <p data-testid={ `player-name-${index}` }>{elem.name}</p>
        <p data-testid={ `player-score-${index}` }>{elem.score}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.createRank()}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            Go Home
          </button>
        </Link>
      </div>
    );
  }
}

export default RankScreen;
