import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { fetchQuestions } from '../actions';
import '../App.css';
// import QuestionForm from '../Components/QuestionForm';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.setQuestions = this.setQuestions.bind(this);
    this.state = {
      currentLevel: 0,
      // questionsData: [],
      category: '',
      questionText: '',
      currentAnswers: [],
      // template: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate(previous) {
    const { game } = this.props;
    if (previous.game !== game) {
      const { questions } = game;
      const { currentLevel } = this.state;
      const newState = {
        category: questions[currentLevel].category,
        questionText: questions[currentLevel].question,
        currentAnswers:
          [questions[currentLevel].correct_answer,
            ...questions[currentLevel].incorrect_answers],
        template:
          ['correct', 'wrong', 'wrong', 'wrong'],
      };
      this.setQuestions(newState);
    }
  }

  setQuestions(state) {
    this.setState(state);
  }

  async getQuestions() {
    const { apiFetchQuestions } = this.props;
    await apiFetchQuestions();
  }

  render() {
    const { category, questionText } = this.state;
    const { currentAnswers } = this.state;

    return (
      <div>
        <Header />
        <h1>Play</h1>
        <p>{category}</p>
        <p>{questionText}</p>
        { currentAnswers.map((answer) => (
          <button
            key={ answer }
            type="button"
          >
            {answer}
          </button>
        ))}
      </div>
      /*
      <div className="container-fluid">
        <div className="container-form">
          <QuestionForm />
        </div>
        <div className="bottom-content">
          <p>Todos os direitos reservados </p>
        </div>
      </div>
      */
    );
  }
}

const mapStateToProps = (state) => ({
  game: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetchQuestions: () => dispatch(fetchQuestions()),
});

Play.propTypes = {
  apiFetchQuestions: PropTypes.func.isRequired,
  game: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
