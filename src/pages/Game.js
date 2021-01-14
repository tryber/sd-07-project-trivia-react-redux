import React from 'react';
import { connect } from 'react-redux';
import { requestQuestionAndAnsewrs } from '../actions';
import QuestionsList from './componentes/QuestionsList';

class Game extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.requestQuestions(localStorage.token);
  }

  render() {
    return (
      <div>
        <h3 data-testid="question-category" >{ this.props.question.results[0].category }</h3>
        <p data-testid="question-text" >{ this.props.question.results[0].question }</p>
        <QuestionsList />
      </div>
    );
  }
}

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
