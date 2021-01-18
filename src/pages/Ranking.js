import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStorage } from '../services';
import { reloadGame } from '../actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    this.setState({ ranking: getStorage('ranking') });
  }

  render() {
    const { ranking } = this.state;
    const { history: { push }, dispatchReload } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Textinho</h1>
        <ol>
          {ranking.map(({ name, score, gravatarEmail }, index) => (
            <li key={ index }>
              <div>
                <img
                  data-testid="header-profile-picture"
                  src={ gravatarEmail }
                  alt="avatar"
                />
                <spam data-testid={ `player-name-${index}` }>{ name }</spam>
                <spam data-testid={ `player-score-${index}` }>{ score }</spam>
              </div>
            </li>
          ))}
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            dispatchReload();
            push('/');
          } }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchReload: () => dispatch(reloadGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchReload: PropTypes.func.isRequired,
};
