import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

class Ranking extends React.Component {
  render() {
    const getRankingSaved = JSON.parse(localStorage.getItem('ranking'));
    const toOrdenate = (a, b) => {
      const falseNegative = -1;
      const truePositive = 1;
      if (a.score > b.score) return falseNegative;
      if (a.score < b.score) return truePositive;
      return 0;
    };

    getRankingSaved.sort(toOrdenate);
    return (
      <div>
        <Header />
        <p data-testid="feedback-text" />
        <h1 data-testid="ranking-title">Ranking</h1>
        {getRankingSaved.map((element, index) => {
          const { name, score, picture } = element;
          return (
            <div key={ index }>
              <ul>
                <li>
                  <img src={ picture } alt="Gravatar" />
                  {' Nome: '}
                  <span data-testid={ `player-name-${index}` }>
                    {`${name} -`}
                  </span>
                  {' score: '}
                  <span data-testid={ `player-score-${index}` }>
                    {score}
                  </span>
                </li>
              </ul>
            </div>
          );
        })}
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Login</button>
        </Link>
      </div>
    );
  }
}
export default Ranking;
