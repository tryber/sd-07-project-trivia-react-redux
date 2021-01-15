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
      disableButon: false,
      nameClassCorrect: '',
      nameClassWrong: '',
    };

    this.shuffle = this.shuffle.bind(this);
    this.mountArrayOfAnswer = this.mountArrayOfAnswer.bind(this);
    this.scoreCalculete = this.scoreCalculete.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.answers = this.answers.bind(this);
  }

  componentDidMount() {
    const { disableButon } = this.state;
    let { time } = this.state;
    const initialScore = 0;
    const interval = 1000;
    const timeOut = 30000;
    this.mountArrayOfAnswer();
    localStorage.setItem('playerScore', initialScore);
    setInterval(() => {
      if (!disableButon && time > 0) {
        this.setState({ time: (time -= 1) });
      }
    }, interval);
    setTimeout(() => { this.setState({ disableButon: true }); }, timeOut);
  }

  handleButton() {
    this.setState({ disableButon: true });
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
    const { question } = this.props;
    const correct = question.results[0].correct_answer;
    const incorrect = question.results[0].incorrect_answers;
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
      
  answers() {
    this.setState({ nameClassCorrect: 'correctAnswer' });
    this.setState({ nameClassWrong: 'wrongAnswer' });
  }

  render() {
    const { array, time, disableButon, nameClassCorrect, nameClassWrong } = this.state;
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
                className={ nameClassCorrect }
                type="button"
                data-testid="correct-answer"
                disabled={ disableButon }
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
              disabled={ disableButon }
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
            disableButon ? (
              <button data-testid="btn-next" type="button">
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
