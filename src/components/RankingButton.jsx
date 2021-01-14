import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { savePlayer } from '../actions';

class RankingButton extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
    this.click = this.click.bind(this);
  }

  click() {
    const { name, score, picture, toPlayer } = this.props;
    const objeto = {
      name,
      score,
      picture,
    };
    toPlayer(objeto);
    this.setState({ redirect: '/ranking' });
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
});

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.user.score,
  picture: state.user.gravatarEmail,
});

RankingButton.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  toPlayer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingButton);
