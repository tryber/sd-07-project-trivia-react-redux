import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeButton from '../components/HomeButton';

// const playerMock = [
//   { name: 'Joel', score: 5, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
//   { name: 'Killer', score: 10, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
//   { name: 'Golimar', score: 8, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
//   { name: 'Supla', score: 1, picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
// ];
class Ranking extends Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {player.map((score) => score)
          .sort((b, a) => a.score - b.score)
          .map((user, index) => (
            <div key={ index }>
              <img src={ user.picture } alt="player-pic" />
              <p data-testid={ `player-name-${index}` }>{user.name}</p>
              <p data-testid={ `player-score-${index}` }>{user.score}</p>
            </div>
          ))}
        <HomeButton />
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  player: state.player,
});

Ranking.propTypes = {
  player: PropTypes.shape(PropTypes.string).isRequired,
};
export default connect(mapDispatchToProps)(Ranking);
