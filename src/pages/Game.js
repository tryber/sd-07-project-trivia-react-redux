import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestQuestionAndAnsewrs } from '../actions';
import QuestionsList from './componentes/QuestionsList';
import Header from './componentes/Header';
import Loading from './componentes/Loading';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { requestQuestions } = this.props;
    requestQuestions(localStorage.token);
  }

  nextQuestion(index) {
    this.setState({ index });
  }

  render() {
    const { question, loading } = this.props;
    const { index } = this.state;
    console.log(index);
    console.log(question.results);
    // console.log(loading);
    return (
      loading ? <Loading />
        : (
          <div>
            <Header />
            <h3>Category:</h3>
            <p data-testid="question-category">{ question.results[index].category }</p>
            <h3>Question:</h3>
            <p data-testid="question-text">{ question.results[index].question }</p>
            <QuestionsList
              question={ question }
              onClick={ this.nextQuestion }
              index={ index }
            />
          </div>)
    );
  }
}

Game.propTypes = {
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
