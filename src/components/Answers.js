import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Counter from './Counter';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      clicked: false,
      sort: true,
      next: true,
      newCounter: 0,
      nextUp: false,
      sortedAnswers: [],
    };

    this.nextButton = this.nextButton.bind(this);
    this.mountAnswers = this.mountAnswers.bind(this);
    this.questionsSorted = this.questionsSorted.bind(this);
  }

  questionsSorted() {
    const { questions } = this.props;
    const { index } = this.state;
    if (questions[index]) {
      const {
        correct_answer: correct,
        incorrect_answers: wrong,
      } = questions[index];
      const correctAnswer = { correct, id: true };
      const arrayAnswers = [correctAnswer, ...wrong];
      for (let i = 0; i < arrayAnswers.length; i += 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayAnswers[i], arrayAnswers[j]] = [arrayAnswers[j], arrayAnswers[i]];
      } // Foi pego no stackOverFlow
      return arrayAnswers;
    }
  }


  nextButton() {
    const { index, newCounter } = this.state;

    return (
      <button
        type="button"
        onClick={() => {
          this.setState({
            index: index + 1,
            clicked: false,
            sort: true,
            next: true,
            newCounter: newCounter + 1,
            nextUp: false,
          });
        }}
      >
        Próxima
      </button>);
  }

  mountAnswers() {
    const { index } = this.state;
    if (!this.props.questions[index]) return 'acabou';

    const {
      category,
      correct_answer: correct,
      question,
    } = this.props.questions[index];

    return (
      <div>
          <div>
            <h3
              key={`category${index}`}
              data-testid="question-category"
            >
              {category}
            </h3>
            <h2 key={`question${index}`} data-testid="question-text">{question}</h2>
          </div>
          <div>
            <div>
              {this.questionsSorted().map((element, set) => {
                const { clicked } = this.state;
                if (element.id) {
                  return (
                    <button
                      className={clicked ? 'wright-answer' : ''}
                      key={`correct${set}`}
                      type="button"
                      data-testid="correct-answer"
                      onClick={() => this.setState({ clicked: true, nextUp: true })}
                    >
                      { correct }
                    </button>
                  );
                }
                return (
                  <button
                    className={clicked ? 'wrong-answer' : ''}
                    key={`wrong${set}`}
                    type="button"
                    data-testid={`wrong-answer-${'0'}`}
                    onClick={() => this.setState({ clicked: true, nextUp: true })}
                  >
                    { element }
                  </button>
                );
              })}
            </div>
          </div>
        </div>
    )
  }

  render() {
    const { clicked, next, newCounter, nextUp } = this.state;

    return (
      <div>
        <Header />
        <h1>Joguinho</h1>
        { this.mountAnswers() }
        <Counter key={newCounter} clicked={clicked} next={next} />
        { nextUp && this.nextButton()}
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
};

export default connect(mapStateToProps)(Answers);
