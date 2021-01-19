import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { indexInitial } from '../redux/actions';

class Feedback extends Component {
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);

    this.state = {
      redirectState: false,
    };
  }

  componentDidMount() {
    const { name, score, avatar } = this.props;

    const player = { name, score, picture: avatar };
    const array = JSON.parse(localStorage.getItem('ranking'));
    const players = [...array, player];
    localStorage.setItem('ranking', JSON.stringify(players));
  }

  returnFeedback() {
    const { assertions } = this.props;
    const numberToComper = 3;
    if (assertions < numberToComper) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    const { assertions, score, index } = this.props;
    const { redirectState } = this.state;

    return (
      <div>
        {redirectState ? <Redirect to="/" />
          : (
            <div>
              <Header />
              <p data-testid="feedback-total-question">{assertions}</p>
              <p data-testid="feedback-total-score">{score}</p>
              <p data-testid="feedback-text" />
              {this.returnFeedback()}
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ () => {
                  this.setState({ redirectState: true });
                  index();
                } }
              >
                Jogar novamente
              </button>
              <Link to="/ranking">
                <button
                  type="button"
                  data-testid="btn-ranking"
                >
                  Ver Ranking
                </button>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.login.score,
  assertions: state.login.assertions,
  avatar: state.login.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  index: () => dispatch(indexInitial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  index: PropTypes.func.isRequired,
};
