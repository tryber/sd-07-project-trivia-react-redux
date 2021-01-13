import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setQuestions } from '../actions';
import Question from './Question';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.clickAnswered = this.clickAnswered.bind(this);
    this.clickNext = this.clickNext.bind(this);

    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
      answered: false,
      timer: 30,
      isDisable: false,
      redirect: false,
    };
  }

  componentDidMount() {
    const { setQuestionsProps } = this.props;
    const { token } = this.state;
    setQuestionsProps(token);
  }

  // timeout = () => {
  //   const { timer } = this.state;
  // return setTimeout(() => {
  //   this.setState({
  //     timer: timer - 1
  //   })
  // }, 1000);}

  componentDidUpdate() {
    const time = 1000;
    const { timer } = this.state;
    this.timeout = setTimeout(() => {
      if (timer > 0) {
        this.setState({
          timer: timer - 1,
        });
      } else {
        this.setState({ isDisable: true });
        clearInterval(this.timeout);
      }
    }, time);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  clickAnswered() {
    this.setState({ answered: true });
  }

  clickNext() {
    const { currentQuestion } = this.state;
    const quantQuestions = 4;
    if (currentQuestion < quantQuestions) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        answered: false,
        timer: 30,
        isDisable: false,
      });
    } else if (currentQuestion === quantQuestions) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion, answered, timer, isDisable, redirect } = this.state;
    if (questions.length === 0) {
      return <div>carregando...</div>;
    }
    return (
      <div>
        <Question
          currentQuestion={ currentQuestion }
          answered={ answered }
          clickAnswered={ this.clickAnswered }
          isDisable={ isDisable }
        />
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.clickNext() }
        >
          Próxima Questão
        </button>
        <h1>{timer}</h1>
        {redirect && <Redirect to="/feedback" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuestionsProps: (token) => dispatch(setQuestions(token)),
});

GameScreen.propTypes = {
  setQuestionsProps: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      type: PropTypes.string,
      difficulty: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf,
    }).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
