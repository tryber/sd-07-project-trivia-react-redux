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
  }

  isClicked() {
    this.setState({
      clicked: true,
      nextUp: true,
    });
  }

  nextButton() {
    const { newCounter } = this.state;
    const { increaseIndex, reset } = this.props;

    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => {
          increaseIndex();
          this.setState({
            clicked: false,
            next: true,
            newCounter: newCounter + 1,
            nextUp: false,
          });
          reset();
        } }
      >
        Próxima
      </button>);
  }

  handleCorrectClick(difficulty) {
    this.isClicked();
    const { add } = this.props;
    let difficultyValue = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (difficulty === 'easy') {
      difficultyValue = easy;
    } else if (difficulty === 'medium') {
      difficultyValue = medium;
    } else {
      difficultyValue = hard;
    }
    add(difficultyValue);
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

    return (
      <div>
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
          <div>
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

    return (
      <div>
        <Header />
        <h1>Joguinho</h1>
        { this.mountAnswers()}
        <Counter
          key={ newCounter }
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
