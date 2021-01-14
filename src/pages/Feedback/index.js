import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import './index.css';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const sufficientAssertion = 3;
    console.log(assertions);
    return (
      <main className="wrapper">
        <Header />
        <div className="feedback__container">
          <div className="feedback__content">
            <div className="feedback__result__container">
              <p
                className="feedback__result feedback__title"
                data-testid="feedback-text"
              >
                {
                  assertions < sufficientAssertion
                    ? ('Podia ser melhor...')
                    : ('Mandou bem!')
                }
              </p>
              <div className="feedback__result">
                <p>Acertos:</p>
                <p
                  className="feedback__number"
                  data-testid="feedback-total-question"
                >
                  {assertions}
                </p>
              </div>
              <div className="feedback__result">
                <p>Pontos:</p>
                <p
                  className="feedback__number"
                  data-testid="feedback-total-score"
                >
                  {score}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
