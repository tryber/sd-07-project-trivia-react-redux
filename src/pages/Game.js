import React from 'react';
import { connect } from 'react-redux';
import { requestQuestionAndAnsewrs } from '../actions';

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
        <h2 data-testid="question-category" >Category</h2>

        <h2 data-testid="question-text" >Question</h2>
        <button
          type="button"
          disabled={ this.props.loading === false }
          onClick={ this.testApi }
        >
          Certos e Erraddos
        </button>
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
