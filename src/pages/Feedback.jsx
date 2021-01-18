import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);

    this.state = {
      redirectState: false,
    };
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
    const { assertions, score } = this.props;
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
                onClick={ () => this.setState({ redirectState: true }) }
              >
                Jogar novamente
              </button>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.login.score,
  assertions: state.login.assertions,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
