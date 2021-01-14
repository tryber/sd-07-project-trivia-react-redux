import React from 'react';
import PropTypes from 'prop-types';
import Questions from './Questions';
import Header from '../components/header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      shouldLoadQuestions: false,
    };
  }

  componentDidMount() {
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify({ player }));
    this.fetchQuestions();
  }

  fetchQuestions() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        questions: data.results,
      }, () => {
        this.setState({ shouldLoadQuestions: true });
      }));
  }

  render() {
    const { shouldLoadQuestions, questions } = this.state;
    const { history: { push } } = this.props;
    if (!shouldLoadQuestions) {
      return '';
    }

    return (
      <div>
        Página do Jogo
        <Header />
        <Questions push={ push } questions={ questions } />
      </div>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
