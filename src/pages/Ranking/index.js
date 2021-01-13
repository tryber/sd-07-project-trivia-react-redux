import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankings: JSON.parse(localStorage.getItem('ranking')) || [],
    };
    this.redirectForHome = this.redirectForHome.bind(this);
  }

  redirectForHome(event) {
    event.preventDefault();
    const { history } = this.props;
    if (history) history.push('/');
  }

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankings.map(({ name, score, picture }, index) => (
          <div key={ index }>
            <img src={ picture } alt="perfil" />
            <p data-testid={ `player-name-${index}` }>{ name }</p>
            <span data-testid={ `player-score-${index}` }>{ score }</span>
          </div>
        ))}
        <button
          onClick={ this.redirectForHome }
          data-testid="btn-go-home"
        >
          Voltar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
