import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setQuestions } from '../actions';
import Question from './Question';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
    };
  }

  componentDidMount() {
    const { setQuestionsProps } = this.props;
    const { token } = this.state;
    setQuestionsProps(token);
  }

  render() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    const quantWongQuestions = questions.incorrect_answers.length;
    if (questions.length === 0) {
      return <div>carregando...</div>;
    }
    return (
      <div>
        <Question currentQuestion={ currentQuestion } />
        <button
          type="button"
          onClick={ () => currentQuestion < quantWongQuestions && this.setState(
            { currentQuestion: currentQuestion + 1 },
          ) }
        >
          Próxima Questão
        </button>
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
  questions: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
