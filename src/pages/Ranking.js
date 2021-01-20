import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.goToLogin = this.goToLogin.bind(this);
  }

  componentDidMount() {
    const { ranking } = this.props;
    localStorage.getItem('ranking', ranking);
  }

  goToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {ranking.length > 0
          && ranking.map((player, index) => (
            <div key={ index }>
              <div
                key={ index }
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </div>
              <div
                key={ index }
                data-testid={ `player-score-${index}` }
              >
                {player.score}
              </div>
              <img
                key={ index }
                data-testid={ `player-img-${index}` }
                src={ player.picture }
                alt={ player.name }
              />
            </div>
          ))}
        </div>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.goToLogin }
        >
          Go to Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  ranking: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps)(Ranking);
