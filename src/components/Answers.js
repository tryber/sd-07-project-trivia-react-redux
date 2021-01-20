import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Counter from './Counter';
import { addPoint, resetCounter } from '../actions';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      next: true,
      newCounter: 0,
      nextUp: false,
    };

    this.nextButton = this.nextButton.bind(this);
    this.mountAnswers = this.mountAnswers.bind(this);
    this.isClicked = this.isClicked.bind(this);
    this.handleCorrectClick = this.handleCorrectClick.bind(this);
    this.resetNextQuestion = this.resetNextQuestion.bind(this);
  }

  isClicked() {
    this.setState({
      clicked: true,
      nextUp: true,
    });
  }

  resetNextQuestion() {
    const { newCounter } = this.state;
    const { increaseIndex, reset } = this.props;

    increaseIndex();
    this.setState({
      clicked: false,
      next: true,
      newCounter: newCounter + 1,
      nextUp: false,
    });
    reset();
  }

  nextButton() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.resetNextQuestion }
      >
        Próxima
      </button>);
  }

  handleCorrectClick(difficulty) {
    const { add } = this.props;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let difficultyValue = 0;

    if (difficulty === 'easy') {
      difficultyValue = easy;
    } else if (difficulty === 'medium') {
      difficultyValue = medium;
    } else {
      difficultyValue = hard;
    }

    add(difficultyValue);
    this.isClicked();
  }

  mountAnswers() {
    const { clicked } = this.state;
    const { questions, sortedAnswers, index } = this.props;
    if (!questions[index]) {
      return <Redirect to="/feedback" />;
    }
    const {
      category,
      correct_answer: correct,
      question,
      difficulty,
    } = questions[index];
    console.log(correct);

    return (
      <div className="answer-container">
        <div>
          <h3
            key={ `category${index}` }
            data-testid="question-category"
          >
            { category }
          </h3>
          <h2 key={ `question${index}` } data-testid="question-text">{ question }</h2>
        </div>
        <div>
          <div className="answer-btn">
            { sortedAnswers.map((element, set) => {
              if (element.id) {
                return (
                  <button
                    className={ clicked ? 'wright-answer' : '' }
                    key={ `correct${set}` }
                    type="button"
                    data-testid="correct-answer"
                    onClick={ () => this.handleCorrectClick(difficulty) }
                    disabled={ clicked }
                  >
                    { correct }
                  </button>
                );
              }
              return (
                <button
                  className={ clicked ? 'wrong-answer' : '' }
                  key={ `wrong${set}` }
                  type="button"
                  data-testid={ `wrong-answer-${'0'}` }
                  onClick={ () => this.isClicked() }
                  disabled={ clicked }
                >
                  { element }
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { clicked, next, newCounter, nextUp } = this.state;
    const maxCounter = 5;
    const setCounter = 4;
    return (
      <div>
        <Header />
        { this.mountAnswers() }
        <Counter
          key={ newCounter === maxCounter ? setCounter : newCounter }
          clicked={ clicked }
          isClicked={ this.isClicked }
          next={ next }
        />
        { nextUp && this.nextButton() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(addPoint(value)),
  reset: () => dispatch(resetCounter()),
});

Answers.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  })).isRequired,
  increaseIndex: PropTypes.func.isRequired,
  sortedAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  index: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
