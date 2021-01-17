import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Questions, Header } from '../components';
import { fetchQuestionsTrivia } from '../actions/fetchQuestionsTrivia';
import './Game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      next: 0,
      disable: true,
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleNext = this.handleNext.bind(this);
    // this.lendoPlayer = this.lendoPlayer.bind(this);
  }

  componentDidMount() {
    this.fetchAPI();
  }

  async fetchAPI() {
    const { questionsAction } = this.props;
    await questionsAction();
  }

  disableButton() {
    this.setState({
      disable: false,
    });
  }

  handleNext() {
    const { next } = this.state;
    let nextQuestion;
    const maxQuestion = 5;

    if (next > maxQuestion) {
      nextQuestion = 0;
      const { history } = this.props;
      history.push('/endgame');
    } else {
      nextQuestion = next + 1;
    }
    this.setState({
      next: nextQuestion,
      disable: true,
    });
  }

  // lendoPlayer() {
  //   // const player = JSON.parse(localStorage.getItem('state'));
  //   // chave: player.player.name
  //   console.log('vai ser utilizado na 12')
  // }

  render() {
    const { next, disable } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        <div>
          <Questions
            history={ history }
            next={ next }
            disableButton={ this.disableButton }
          />
          <button
            className={ !disable ? 'btn-visible' : 'btn-visible-hidden' }
            data-testid="btn-next"
            onClick={ this.handleNext }
            type="button"
          >
            Próxima
          </button>
          <div />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questionsAction: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.receiveQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  questionsAction: (questions) => dispatch(fetchQuestionsTrivia(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
