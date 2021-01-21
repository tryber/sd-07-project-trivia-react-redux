import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();

    this.rankingStorage = this.rankingStorage.bind(this);
  }

  rankingStorage() {
    const rankingShow = JSON.parse(localStorage.getItem('ranking')) || [];

    const playerStorage = JSON.parse(localStorage.getItem('state'));
    const { player } = playerStorage;
    const { name, score } = player;

    const { user } = this.props;

    rankingShow.push({ name, score, picture: user.gravatarUrl });

    localStorage.setItem('ranking', JSON.stringify(rankingShow));

    return rankingShow.sort((a, b) => {
      const menosUm = -1;
      if (a.score < b.score) return 1;
      if (a.score > b.score) return menosUm;
      return 0;
    });
  }

  render() {
    const rankingArray = this.rankingStorage();
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        <ul>
          {rankingArray.map((element, index) => (
            <li key={ index }>
              <img src={ element.picture } alt="gravatar" />
              <div data-testid={ `player-name-${index}` }>{element.name}</div>
              <div data-testid={ `player-score-${index}` }>{element.score}</div>
            </li>
          ))}
        </ul>
        <Link to="/" data-testid="btn-go-home">
          Jogar Novamente
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Ranking.propTypes = {
  user: PropTypes.shape({
    gravatarUrl: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
