import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import '../style/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.shuffle = this.shuffle.bind(this);
    // this.applyColor = this.applyColor.bind(this);
  }

  async componentDidMount() {
    const { requestQuestions, token } = this.props;
    await requestQuestions(token);
    console.log(token);
  }

  shuffle(answers) {
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  // applyColor(randomAnswers) {
  //   randomAnswers.map((answer) => {
  //     const a = '';
  //     const color = answer.correct ? 'rightGreen' : 'wrongRed';
  //     document.getElementById('button-choice').className = color;
  //     return a;
  //   });
  // }

  render() {
    const { questions } = this.props;
    if (questions === undefined) return <p>Loading...</p>;
    const question = questions[0];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = question;
    const answers = [correctAnswer, ...incorrectAnswers];
    const taggedAnswers = question.type !== 'boolean' ? [{
      correct: true,
      answer: answers[0],
    },
    {
      correct: false,
      answer: answers[1],
      index: 0,
    },
    {
      correct: false,
      answer: answers[2],
      index: 1,
    },
    {
      correct: false,
      answer: answers[3],
      index: 2,
    }]
      : [{
        correct: true,
        answer: answers[0],
      },
      {
        correct: false,
        answer: answers[1],
        index: 0,
      }];
    const randomAnswers = this.shuffle(taggedAnswers);
    // let btnClass = '';
    return (
      <div key={ question.question }>
        <h4 key={ question.category } data-testid="question-category">
          {question.category}
        </h4>
        <h3 data-testid="question-text">
          {question.question}
        </h3>
        {randomAnswers.map((answer) => (
          <button
            id="button-choice"
            className={ answer.correct ? 'rightGreen' : 'wrongRed' }
            type="button"
            key={ answer.answer }
            // onClick={
            //   this.applyColor(randomAnswers)
            // }
            data-testid={ answer.correct
              ? 'correct-answer'
              : `wrong-answer-${answer.index}` }
          >
            {answer.answer}

          </button>
        ))}
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  requestQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (questions) => dispatch(fetchQuestions(questions)),
});

const mapStateToProps = (state) => ({
  isLoading: state.game.isLoading,
  questions: state.game.questions.results,
  token: state.login.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
