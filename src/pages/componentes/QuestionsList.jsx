import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeScore } from '../../actions';

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
    this.scoreCalculete = this.scoreCalculete.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.answers = this.answers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { disableButton } = this.state;
    let { time } = this.state;
    const initialScore = 0;
    const interval = 1000;
    const timeOut = 30000;
    this.mountArrayOfAnswer();
    localStorage.setItem('playerScore', initialScore);
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

  scoreCalculete() {
    this.handleButton();
    const { time } = this.state;
    let difficultyNum = 0;
    const { question, dispatchScore, name, gravatarEmail, assertions } = this.props;
    const scoreStorege = localStorage.getItem('playerScore');
    const pointForHit = 10;
    const timer = time;

    if (question.results[0].difficulty === 'easy') {
      const levelDifficult = 1;
      difficultyNum = levelDifficult;
    }

    if (question.results[0].difficulty === 'medium') {
      const levelDifficult = 2;
      difficultyNum = levelDifficult;
    }
    if (question.results[0].difficulty === 'hard') {
      const levelDifficult = 3;
      difficultyNum = levelDifficult;
    }
    const newScore = parseInt(scoreStorege, 10) + pointForHit + (timer * difficultyNum);

    localStorage.setItem('playerScore', newScore);

    localStorage.setItem('state', JSON
      .stringify({ player: { name, assertions, score: newScore, gravatarEmail } }));
    dispatchScore(newScore);
  }

  wrongAnswer() {
    this.handleButton();
    console.log('Game Over :(');
  }

  answers() {
    this.setState({ nameClassCorrect: 'correctAnswer' });
    this.setState({ nameClassWrong: 'wrongAnswer' });
  }

  nextQuestion(index) {
    const { question, onClick } = this.props;
    index += 1;
    if (index < question.results.length) {
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
    }

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
    return (
      <div>
        { array.map((answers) => {
          if (answers === correto) {
            return (
              <button
                className={ nameClassCorrect }
                type="button"
                data-testid="correct-answer"
                disabled={ disableButton }
                onClick={ this.scoreCalculete }
              >
                { answers }
              </button>
            );
          }
          index += 1;
          return (
            <button
              className={ nameClassWrong }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.wrongAnswer }
              disabled={ disableButton }
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

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(changeScore(score)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  loading: state.player.loading,
  token: state.player.token,
  question: state.player.question,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
