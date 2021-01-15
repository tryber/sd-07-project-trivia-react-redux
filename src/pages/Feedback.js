import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.handleAssertions = this.handleAssertions.bind(this);
    this.handleTotalQuestions = this.handleTotalQuestions.bind(this);
  }

  handleAssertions() {
    const { assertions } = this.props;
    const lowScore = 3;

    if (assertions < lowScore) {
      return <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
    }
    return <h2 data-testid="feedback-text">Mandou bem!</h2>;
  }

  handleTotalQuestions() {
    const { assertions } = this.props;

    return (
      <p data-testid="feedback-total-question">
        {assertions}
      </p>
    );
  }

  render() {
    const { points, history } = this.props;

    return (
      <div>
        <Header />
        <main>
          {this.handleAssertions()}
          {this.handleTotalQuestions()}
          <h2 data-testid="feedback-total-score">
            {points}
          </h2>
          <button data-testid="btn-ranking" type="button">Ver ranking</button>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.token.assertions,
  points: state.token.points,
});

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(FeedBack);
