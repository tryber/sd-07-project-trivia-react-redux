import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { indexInitial } from '../redux/actions';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.savePlayers = this.savePlayers.bind(this);

    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    const array = JSON.parse(localStorage.getItem('ranking'));
    this.savePlayers(array);
  }

  savePlayers(playersList) {
    const list = playersList.sort((a, b) => b.score - a.score);

    this.setState({
      players: list,
    });
  }

  render() {
    const { indexCall } = this.props;
    const { players } = this.state;

    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {players.map((player, index) => (
          <div key={ player.name }>
            <img src={ player.picture } alt={ player.name } />
            <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
            <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => indexCall() }
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  indexCall: () => dispatch(indexInitial()),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  indexCall: PropTypes.func.isRequired,
};
