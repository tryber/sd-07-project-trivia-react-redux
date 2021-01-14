import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import '../App.css';
import QuestionForm from '../Components/QuestionForm';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.getQuestions = this.getQuestions.bind(this);
    this.setQuestions = this.setQuestions.bind(this);
    this.createArray = this.createArray.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      currentLevel: 0,
      category: '',
      questionText: '',
      answers: [],
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
      const arrayOfAnswers = this.createArray(
        questions[currentLevel].correct_answer,
        questions[currentLevel].incorrect_answers,
      );
      const newState = {
        category: questions[currentLevel].category,
        questionText: questions[currentLevel].question,
        answers: arrayOfAnswers,
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

  // An implementation of Fisher-Yates (aka Knuth) Shuffle algorithm
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    // console.log(array);
    let currentIndex = array.length; let temporaryValue; let
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // console.log(array);
    return array;
  }

  createArray(correct, incorrect) {
    const newArray = [];
    const correctValue = {
      answer: correct,
      status: 'correct',
    };
    newArray.push(correctValue);
    for (let i = 0; i < incorrect.length; i += 1) {
      const wrong = {
        answer: incorrect[i],
        status: 'wrong',
      };
      newArray.push(wrong);
    }

    const shuffledArray = this.shuffle(newArray);

    return shuffledArray;
  }

  render() {
    const { category, questionText, answers } = this.state;
    return (
      <div className="container-fluid">
        <div className="container-form">
          <QuestionForm
            category={ category }
            questionText={ questionText }
            answer={ answers }
          />
        </div>
        <div className="bottom-content">
          <p>Todos os direitos reservados </p>
        </div>
      </div>
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
