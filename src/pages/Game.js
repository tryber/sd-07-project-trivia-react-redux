import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components';
import Api from '../services/api';
import Answers from '../components/Answers';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questions: [],
    };

    this.increaseIndex = this.increaseIndex.bind(this);
    this.requestAsks = this.requestAsks.bind(this);
  }

  componentDidMount() {
    this.requestAsks();
  }

  questionsSorted() {
    const { questions, index } = this.state;

    if (questions[index]) {
      const {
        correct_answer: correct,
        incorrect_answers: wrong,
      } = questions[index];
      const correctAnswer = { correct, id: true };
      const arrayAnswers = [correctAnswer, ...wrong];
      for (let i = 0; i < arrayAnswers.length; i += 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayAnswers[i], arrayAnswers[j]] = [arrayAnswers[j], arrayAnswers[i]];
      } // Foi pego no stackOverFlow
      return arrayAnswers;
    }
  }

  async requestAsks() {
    const { returnAsks } = Api;
    const { token } = this.props;
    const resultAsks = await returnAsks(token);

    this.setState({
      questions: resultAsks.results,
    });
  }

  increaseIndex() {
    this.setState(({ index }) => ({ index: index + 1 }));
  }

  render() {
    const { questions, index } = this.state;

    if (questions.length === 0) return <p>Carregando...</p>;
    return (
      <div className="game-container">
        <Header />
        <Answers
          index={ index }
          questions={ questions }
          increaseIndex={ this.increaseIndex }
          sortedAnswers={ this.questionsSorted() }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
