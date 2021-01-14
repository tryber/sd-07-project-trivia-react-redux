import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Counter from './Counter';

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
  }

  isClicked() {
    this.setState({
      clicked: true,
      nextUp: true,
    });
  }

  nextButton() {
    const { newCounter } = this.state;
    const { increaseIndex } = this.props;

    return (
      <button
        type="button"
        onClick={ () => {
          increaseIndex();
          this.setState({
            clicked: false,
            next: true,
            newCounter: newCounter + 1,
            nextUp: false,
          });
        } }
      >
        Próxima
      </button>);
  }

  mountAnswers() {
    const { clicked } = this.state;
    const { questions, sortedAnswers, index } = this.props;
    if (!questions[index]) return 'acabou';
    console.log(sortedAnswers);
    const {
      category,
      correct_answer: correct,
      question,
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
                    onClick={ () => this.isClicked() }
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

Answers.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string.isRequired,
  })).isRequired,
  increaseIndex: PropTypes.func.isRequired,
  sortedAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Answers);
