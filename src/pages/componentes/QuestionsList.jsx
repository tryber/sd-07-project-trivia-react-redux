import React from 'react';
import PropTypes from 'prop-types';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };

    this.shuffle = this.shuffle.bind(this);
    this.mountArrayOfAnswer = this.mountArrayOfAnswer.bind(this);

    this.scoreCalculete = this.scoreCalculete.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
  }

  componentDidMount() {
    this.mountArrayOfAnswer();
  }

  shuffle(array) {
    for (
      let j, x, i = array.length; i; j = Math
        .floor(Math.random() * i), x = array[i -= 1], array[i] = array[j], array[j] = x
    );
    return array;
  }

  mountArrayOfAnswer() {
    const { question } = this.props;
    const correct = question.results[0].correct_answer;
    const incorrect = question.results[0].incorrect_answers;
    const array = [correct, ...incorrect];
    const randomArray = this.shuffle(array);
    this.setState({ array: randomArray });
  }

  scoreCalculete() {
    const { question } = this.props;
    const scoreStorege = localStorage.getItem('playerScore');
    console.log(scoreStorege);
    const timer = 30; /* n sei ainda */

    if (question.results[0].difficulty === 'easy') {
      const difficultyNum = 1;
      const pointForHit = 10;
      const newScore = parseInt(scoreStorege, 10) + pointForHit + (timer * difficultyNum);

      return localStorage.setItem('playerScore', newScore);
    }

    if (question.results[0].difficulty === 'medium') {
      const difficultyNum = 2;
      const pointForHit = 10;
      const newScore = parseInt(scoreStorege, 10) + pointForHit + (timer * difficultyNum);

      return localStorage.setItem('playerScore', newScore);
    }
    if (question.results[0].difficulty === 'hard') {
      const difficultyNum = 3;
      const pointForHit = 10;
      const newScore = parseInt(scoreStorege, 10) + pointForHit + (timer * difficultyNum);

      return localStorage.setItem('playerScore', newScore);
    }
  }

  wrongAnswer() {
    console.log('Game Over :(');
  }

  render() {
    const { array } = this.state;
    const { question } = this.props;
    const correto = question.results[0].correct_answer;
    const numberForIterat = -1;
    let index = numberForIterat;
    return (
      <div>
        { array.map((answers) => {
          if (answers === correto) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.scoreCalculete }
              >
                { answers }
              </button>
            );
          }
          index += 1;
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.wrongAnswer }
            >
              { answers }
            </button>
          );
        })}
      </div>
    );
  }
}

QuestionsList.propTypes = {
  name: PropTypes.string,
  assertions: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.bool,
  loading: PropTypes.number,
  token: PropTypes.string,
  question: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;

export default QuestionsList;
