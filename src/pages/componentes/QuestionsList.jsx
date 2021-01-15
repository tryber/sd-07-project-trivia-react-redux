import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      time: 30,
      disableButton: false,
      nameClassCorrect: '',
      nameClassWrong: '',
    };

    this.shuffle = this.shuffle.bind(this);
    this.mountArrayOfAnswer = this.mountArrayOfAnswer.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.answers = this.answers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { disableButton } = this.state;
    let { time } = this.state;
    const interval = 1000;
    const timeOut = 30000;
    this.mountArrayOfAnswer();
    setInterval(() => {
      if (!disableButton && time > 0) {
        this.setState({ time: (time -= 1) });
      }
    }, interval);
    setTimeout(() => { this.setState({ disableButton: true }); }, timeOut);
  }

  handleButton() {
    this.setState({ disableButton: true });
    this.answers();
  }

  shuffle(array) {
    for (
      let j, x, i = array.length; i; j = Math
        .floor(Math.random() * i), x = array[i -= 1], array[i] = array[j], array[j] = x
    );
    return array;
  }

  mountArrayOfAnswer() {
    const { question, index } = this.props;
    const correct = question.results[index].correct_answer;
    const incorrect = question.results[index].incorrect_answers;
    const array = [correct, ...incorrect];
    const randomArray = this.shuffle(array);
    this.setState({ array: randomArray });
  }

  answers() {
    this.setState({ nameClassCorrect: 'correctAnswer' });
    this.setState({ nameClassWrong: 'wrongAnswer' });
  }

  nextQuestion(index) {
    const { question, onClick } = this.props;
    const numQuestions = 5;
    index += 1;

    const correct = question.results[index].correct_answer;
    const incorrect = question.results[index].incorrect_answers;
    const array = [correct, ...incorrect];
    const randomArray = this.shuffle(array);
    this.setState({
      array: randomArray,
      time: 30,
      disableButton: false,
      nameClassCorrect: '',
      nameClassWrong: '',
    });
    onClick(index);

    return question.results[index];
  }

  render() {
    const { array, time, disableButton, nameClassCorrect,
      nameClassWrong } = this.state;
    const { question, index: indexQuestions } = this.props;
    const correto = question.results[indexQuestions].correct_answer;
    const numberForIterat = -1;
    let index = numberForIterat;
    console.log('Posição: ', indexQuestions, 'Tamanho: ', question.results.length);
    if (indexQuestions === question.results.length -1 ) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        { array.map((answers) => {
          if (answers === correto) {
            return (
              <button
                className={ nameClassCorrect }
                onClick={ this.handleButton }
                disabled={ disableButton }
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
              onClick={ this.handleButton }
              className={ nameClassWrong }
              disabled={ disableButton }
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
        <div>
          {
            disableButton ? (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ () => this.nextQuestion(indexQuestions) }
              >
                Próxima
              </button>
            ) : (
              <span> </span>
            )
          }
        </div>
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
