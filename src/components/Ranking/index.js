import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PlayerActions from '../../store/ducks/player/actions';
import './RankingComponent.css';

class RankingComponent extends Component {
  constructor() {
    super();

    this.state = {
      orderedRankig: [],
    };

    this.orderRankig = this.orderRankig.bind(this);
  }

  componentDidMount() {
    this.orderRankig();
  }

  componentWillUnmount() {
    const { resetPlayerAction } = this.props;
    resetPlayerAction();
  }

  orderRankig() {
    const { rankingProps } = this.props;
    const orderRankig = rankingProps.sort(
      (player1, player2) => player2.score - player1.score,
    );
    this.setState({ orderedRankig: orderRankig });
  }

  render() {
    const { orderedRankig } = this.state;
    return (
      <div className="ranking-display">
        <h1
          className="ranking-title"
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        { orderedRankig.map((player, index) => (
          <div key={ player.name } className="player">
            <p
              className="playet-item"
              data-testid={ `player-name-${index}` }
            >
              { player.name }
            </p>
            <span
              className="playet-item"
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </span>
            <img
              className="playet-item"
              src={ `${player.picture}` }
              alt={ `${player.name}` }
            />
          </div>
        ))}
        <Link
          to="/"
          data-testid="btn-go-home"
          type="button"
          className="jogar-novamente-button"
        >
          Jogar Novamente
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rankingProps: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerAction: (() => dispatch(PlayerActions.resetPlayer())),
});

RankingComponent.propTypes = {
  rankingProps: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetPlayerAction: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(RankingComponent);
