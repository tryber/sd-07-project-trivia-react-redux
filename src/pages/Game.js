import React from 'react';
import { connect } from 'react-redux';
import Question from '../components/question';
import Header from '../components/header';

class Game extends React.Component {
  componentDidMount() {
    localStorage.setItem('state', JSON.stringify({ player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    } }));
  }

  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.trivia.questions,
});

export default connect(mapStateToProps)(Game);
