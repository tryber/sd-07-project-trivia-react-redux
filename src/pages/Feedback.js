import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      score: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.messageFeedback = this.messageFeedback.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    this.setState({
      assertions,
      score,
    });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  messageFeedback() {
    const { assertions } = this.state;
    const controlMessage = 3;
    if (assertions < controlMessage) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.state;
    return (
      <div className="feedback-screen">
        <div className="feedback-header">
          <Header />
        </div>

        <div data-testid="feedback-text">
          { this.messageFeedback() }
        </div>

        <div className="feedback-score">
          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>

        <button
          onClick={ this.handleClick }
          data-testid="btn-ranking"
          type="button"
        >
          Ver Ranking
        </button>

        <Link data-testid="btn-play-again" to="/">Jogar novamente</Link>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
