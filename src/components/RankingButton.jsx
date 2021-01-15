import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { savePlayer, scores, assertion } from '../actions';

class RankingButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
    this.click = this.click.bind(this);
  }

  click() {
    const { name, score, picture, toPlayer, zeroScore, zeroAssertions } = this.props;
    const objeto = {
      name,
      score,
      picture,
    };
    toPlayer(objeto);
    this.setState({ redirect: '/ranking' });
    zeroScore(0);
    zeroAssertions(0);
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        {(redirect
          ? <Redirect to={ redirect } />
          : (
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.click() }
            >
              Ver Ranking
            </button>
          )
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toPlayer: (rank) => dispatch(savePlayer(rank)),
  zeroScore: (score) => dispatch(scores(score)),
  zeroAssertions: (assertions) => dispatch(assertion(assertions)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.gravatarEmail,
});

RankingButton.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  toPlayer: PropTypes.func.isRequired,
  zeroScore: PropTypes.func.isRequired,
  zeroAssertions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingButton);
