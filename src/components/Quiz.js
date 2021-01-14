import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import { playerAction } from '../actions/playerAction';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.showAnswer = this.showAnswer.bind(this);
    this.setScore = this.setScore.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setStorageRanking = this.setStorageRanking.bind(this);
  }

  setStorageRanking(index) {
    const numberFour = 4;
    if (index === numberFour) {
      const { player } = this.props;
      const newRanking = {
        name: player.name,
        score: player.score,
        picture: player.gravatarEmail,
      };
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      ranking.push(newRanking);
      const rankingSorted = ranking.sort((a, b) => {
        const number = -1;
        if (a.score > b.score) return number;
        if (a.score < b.score) return 1;
        return 0;
      });
      localStorage.setItem('ranking', JSON.stringify([
        ...rankingSorted,
      ]));
    }
  }

  setScore() {
    const { count, difficulty, player, setPlayer } = this.props;
    let score = player.score || 0;
    const difficult = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const num = 10;
    score += count * difficult[difficulty] + num;
    player.score = score;
    player.assertions += 1;
    setPlayer(player);
  }

  showAnswer(event) {
    const rightAnswer = document.querySelector('#rightAnswer');
    const incorrectAnswers = document.querySelectorAll('#wrongAnswer');
    const buttonNext = document.querySelector('.button-next-deactive');
    buttonNext.className = 'button-next-active';
    rightAnswer.className = 'correct-answer';
    incorrectAnswers.forEach((incorrectAnswer) => {
      incorrectAnswer.className = 'incorrect-answer';
    });
    if (rightAnswer === event.target) {
      this.setScore();
    }
  }

  nextQuestion() {
    const {
      updateIndex,
      index,
    } = this.props;
    updateIndex(index + 1);
    const buttonNext = document.querySelector('.button-next-active');
    buttonNext.className = 'button-next-deactive';
    this.setStorageRanking(index);
  }

  render() {
    const {
      category,
      question,
      correctAnswer,
      incorrectAnswers,
    } = this.props;

    const i = 0;
    const { showAnswer } = this;

    return (
      <div>
        <h3 data-testid="question-category" key={ `category${i}` }>{ category }</h3>
        <p data-testid="question-text" key={ `question${i}` }>{ question }</p>
        {incorrectAnswers.map((incorrectAnswer, index) => (
          <button
            type="button"
            id="wrongAnswer"
            onClick={ showAnswer }
            key={ incorrectAnswer }
            data-testid={ `wrong-answer-${index}` }
          >
            { incorrectAnswer }
          </button>
        ))}
        <button
          type="button"
          id="rightAnswer"
          data-testid="correct-answer"
          key={ correctAnswer }
          onClick={ showAnswer }
        >
          { correctAnswer }
        </button>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
          className="button-next-deactive"
        >
          Próxima
        </button>
      </div>
    );
  }
}

Quiz.propTypes = {
  count: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulty: PropTypes.string.isRequired,
  setPlayer: PropTypes.func.isRequired,
  player: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  updateIndex: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (player) => dispatch(playerAction(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
