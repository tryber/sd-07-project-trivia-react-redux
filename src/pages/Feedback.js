import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  messageFeedback() {
    const {
      player: { assertions, score, name },
    } = JSON.parse(localStorage.getItem('state'));
    const controlMessage = 3;
    if (localStorage.getItem('ranking')) {
      const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
      arrayRanking.push({ name: name, score: score, picture: ':-)' });
      localStorage.setItem('ranking', JSON.stringify(arrayRanking));
    } else {
      localStorage.setItem(
        'ranking',
        JSON.stringify([{ name: name, score: score, picture: ':-)' }])
      );
    }

    if (assertions < controlMessage) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
  }

  render() {
    return (
      <div className='feedback-screen'>
        <div className='feedback-header'>
          <Header />
        </div>
        <div data-testid='feedback-text'>{this.messageFeedback()}</div>
        <button
          onClick={this.handleClick}
          data-testid='btn-ranking'
          type='button'
        >
          Ver Ranking
        </button>
        <Link data-testid='btn-play-again' to='/'>
          Jogar novamente
        </Link>
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
