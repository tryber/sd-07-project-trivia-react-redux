import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    // const state = JSON.parse(localStorage.getItem('state'));
    // const { ranking } = state;
    // {ranking.map((element, index) => {
    //   const {name, score, picture } = element;
    //   return (
    //     <div>
    //       <h1 data-testid="ranking-title">Ranking</h1>
    //       <ul>
    //         <li>
    //           <img
    //             src={picture}
    //             alt="Gravatar"
    //           />
    //           {" Nome: "}
    //           <span data-testid='${player-name-index}`>{name} - </span>
    //           {" score: "}
    //           <span data-testid=`${player-score-index}`>{score}</span>
    //         </li>
    //       </ul>
    //     </div>
    //   )
    // })}
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          <li>
            <img
              src="https://www.gravatar.com/avatar/9a0bc9acd846b56c34b788e34ad2c365"
              alt="Gravatar"
            />
            {' Nome: '}
            <span data-testid="player-name-1">Breno - </span>
            {' score: '}
            <span data-testid="player-score-1">2000</span>
          </li>
          <li>
            <img
              src="https://www.gravatar.com/avatar/b463ad6c517f53d7b179ece3079c23ed"
              alt="Gravatar"
            />
            {' Nome: '}
            <span data-testid="player-name-1">Vitor - </span>
            {' score: '}
            <span data-testid="player-score-1">1000</span>
          </li>
          <li>
            <img
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              alt="Gravatar"
            />
            {' Nome: '}
            <span data-testid="player-name-1">Fulano - </span>
            {' score: '}
            <span data-testid="player-score-1">100</span>
          </li>
        </ul>
        <Link to="/" data-testid="btn-go-home">
          <button type="button">Login</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
