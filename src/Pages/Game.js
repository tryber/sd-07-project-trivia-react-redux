import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.redirectRanking = this.redirectRanking.bind(this);
  }

  redirectRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ver Ranking
        </button>
        <Questions />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
