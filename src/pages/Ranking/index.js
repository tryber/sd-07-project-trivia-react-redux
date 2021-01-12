import React from 'react';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: JSON.parse(localStorage.getItem('ranking')) || [],
    };
  }

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1>Ranking</h1>
        {rankings.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt="perfil" />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Ranking;
