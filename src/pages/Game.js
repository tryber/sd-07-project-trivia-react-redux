import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestQuestionAndAnsewrs } from '../actions';
import QuestionsList from './componentes/QuestionsList';
import Header from './componentes/Header';
import Loading from './componentes/Loading';
import player from '../reducers/player';

class Game extends React.Component {
  componentDidMount() {
    const { requestQuestions, name, score, email } = this.props;
    const objPlayer = { 
      player: {
        name: name,
        assertions: '',
        score: score,
        gravatarEmail: email,
      }
    };
    requestQuestions(localStorage.token);
    localStorage.setItem('player', JSON.stringify(objPlayer));
  }

  render() {
    const { question, loading } = this.props;
    return (
      loading ? <Loading />
        : (
          <div>
            <Header />
            <h3>Category:</h3>
            <p data-testid="question-category">{ question.results[0].category }</p>
            <h3>Question:</h3>
            <p data-testid="question-text">{ question.results[0].question }</p>
            <QuestionsList question={ question } />
          </div>)
    );
  }
}

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.string,
    score: PropTypes.number,
    gravatarEmail: PropTypes.bool,
    loading: PropTypes.number,
    token: PropTypes.string,
    question: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.string),
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(requestQuestionAndAnsewrs(token)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  loading: state.player.loading,
  token: state.player.token,
  question: state.player.question,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
