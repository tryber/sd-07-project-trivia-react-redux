import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getQuestions } from '../actions';

class TelaDeJogo extends Component {
  componentDidMount() {
    const { getAPIQuestions } = this.props;
    getAPIQuestions();
  }

  render() {
    const { email, name, score } = this.props;
    const hash = md5(email);

    return (
      <div>
        <header>
          <h1>Tela de Jogo</h1>
          <img
            data-testid="header-profile-picture"
            alt=""
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <div>
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div>
            <p data-testid="header-score">{score}</p>
          </div>
        </header>
        <div>
          <h3 data-testid="question-category">categoria</h3>
          <label data-testid="question-text">
            pergunta
            <select>
              <option data-testid="correct-answer">resposta correta</option>
              <option data-testid={ `wrong-answer-${index}` }>
                respostas incorretas
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAPIQuestions: () => dispatch(getQuestions()),
});

function mapStateToProps(state) {
  return ({
    email: state.player.gravatarEmail,
    name: state.player.name,
    score: state.player.score,
    questions: state.questions.results,
  });
}

TelaDeJogo.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(TelaDeJogo);
