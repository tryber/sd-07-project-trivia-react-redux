import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Counter from './Counter';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      counter: 30,
    };

    this.mountQuestion = this.mountQuestion.bind(this);
  }

  mountQuestion(quest, index) {
    if (quest[index]) {
      const {
        category,
        correct_answer: correct,
        incorrect_answers: wrong,
        question,
      } = quest[index];
      const correctAnswer = { correct, id: true };
      const arrayAnswers = [correctAnswer, ...wrong];
      for (let i = 0; i < arrayAnswers.length; i += 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayAnswers[i], arrayAnswers[j]] = [arrayAnswers[j], arrayAnswers[i]]; // Foi pego no stackOverFlow
      }
      console.log(arrayAnswers);
      return (
        <div>
          <div>
            <h3 key={ `category${index}` } data-testid="question-category">{ category }</h3>
            <h2 key={ `question${index}` } data-testid="question-text">{ question }</h2>
          </div>
          <div>
            <div>
              {arrayAnswers.map((element, set) => {
                if (element.id) {
                  return (
                    <button
                      key={ `correct${set}` }
                      type="button"
                      data-testid="correct-answer"
                      onClick={ () => this.setState({ index: index + 1 }) }
                    >
                      { correct }
                    </button>
                  );
                }
                return (
                  <button
                    key={ `wrong${set}` }
                    type="button"
                    data-testid={ `wrong-answer-${'0'}` }
                    onClick={ () => this.setState({ index: index + 1 }) }
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
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    console.log(questions);
    console.log(this.props);
    return (
      <div>
        <Header />
        <h1>Joguinho</h1>
        { this.mountQuestion(questions, index) }
        <Counter />
        <button type="button">Próxima</button>
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
