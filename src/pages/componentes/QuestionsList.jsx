import React from 'react';
import PropTypes from 'prop-types';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      nameClassCorrect: '',
      nameClassWrong: '',
      time: 30,
      disableButon: false,
    };

    this.shuffle = this.shuffle.bind(this);
    this.mountArrayOfAnswer = this.mountArrayOfAnswer.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    const { disableButon } = this.state;
    let { time } = this.state;
    const interval = 1000;
    const timeOut = 30000;
    this.mountArrayOfAnswer();
    setInterval(() => {
      if (!disableButon && time > 0) {
        this.setState({ time: (time -= 1) });
      }
    }, interval);
    setTimeout(() => { this.setState({ disableButon: true }); }, timeOut);
  }

  handleButton() {
    this.setState({ disableButon: true });
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

  answers() {
    this.setState({ nameClassCorrect: 'correctAnswer' });
    this.setState({ nameClassWrong: 'wrongAnswer' });
  }

  render() {
    const { array, nameClassCorrect, nameClassWrong, time, disableButon  } = this.state;
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
                className={ nameClassCorrect }
                onClick={ () => this.answers() }
                onClick={ this.handleButton }
                disabled={ disableButon }
                type="button"
                data-testid="correct-answer"
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
              className={ nameClassWrong }
              onClick={ () => this.answers() }
              onClick={ this.handleButton }
              disabled={ disableButon }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              { answers }
            </button>
          );
        })}
        <span>
          {time}
        </span>
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
