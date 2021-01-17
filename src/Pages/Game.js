import React from 'react';
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
        <Questions history={ this.props.history } />
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
