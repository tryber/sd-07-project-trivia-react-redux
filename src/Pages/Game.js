import React from 'react';
import PropTypes from 'prop-types';
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
    const { history } = this.props;
    return (
      <div>
        <Questions history={ history } />
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
