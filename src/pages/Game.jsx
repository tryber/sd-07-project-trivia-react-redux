import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Empty from '../components/Empty';
import * as Actions from '../actions';
import store from '../store';

let score = 0;
let sum = 0;

const Game = (props) => {
  const [counter, setCounter] = useState(0);
  const [isEnable, setIsEnable] = useState(false);
  const [color, setColor] = useState({
    style1: '',
    style2: '',
  });
  const [assertions, setAssertion] = useState('');
  const tempMax = 30;
  const [time, setTime] = useState(tempMax);
  const [showButton, setshowButton] = useState(false);

  const calculateScore = () => {
    let convertedDifficulty;
    let i = 0;
    const three = 3;
    const two = 2;
    const one = 1;
    const ten = 10;
    const { gameScore } = props;
    const { data, time2 } = store.getState().game;
    const { difficulty } = data.results[i];
    // console.log(difficulty);
    // console.log(assertions);
    // console.log(time2);

    if (difficulty === 'hard') {
      convertedDifficulty = three;
    } else if (difficulty === 'medium') {
      convertedDifficulty = two;
    } else {
      convertedDifficulty = one;
    }

    score += ten + time2 * convertedDifficulty;
    gameScore(score);
    i += 1;
  };

  const handleQuestion = async () => {
    const { history } = props;

    const maxQuestions = 4;
    if (counter === maxQuestions) {
      history.push('/feedback');
    } else {
      setCounter(counter + 1);
    }
    setColor({
      style1: 'border-neutral',
      style2: 'border-neutral',
    });

    setTime(tempMax);
    setIsEnable(false);
    setshowButton(false);
  };

  let intervalId;
  const handleClickAnswer = async ({ target }) => {
    setColor({
      style1: 'border-correct',
      style2: 'border-incorrect',
    });
    setshowButton(true);

    if (target.value === 'correct') {
      setAssertion(true);

      const { user, gameStatus } = props;
      await gameStatus(assertions, time);
      calculateScore();
      sum += 1;

      localStorage.setItem(
        'state',
        JSON.stringify({
          player: {
            name: user.name,
            assertions: sum,
            score,
            email: user.email,
          },
        }),
      );
    } else {
      setAssertion(false);
    }
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (!time) {
      setIsEnable(true);
      setAssertion(false);
      setshowButton(true);
      return;
    }

    const maxTime = 1000;
    intervalId = setInterval(() => {
      setTime(time - 1);
    }, maxTime);

    if (time === 0) {
      setAssertion(false);
      // return clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  useEffect(() => () => {
    score = 0;
    sum = 0;
  }, []);

  const dataGame = useSelector((state) => state.game);
  const { results } = dataGame.data;

  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="question-category">{results[counter].category}</h3>
      </div>
      <div>
        <p data-testid="question-text">{results[counter].question}</p>
      </div>
      <div>
        <button
          value="correct"
          type="button"
          data-testid="correct-answer"
          className={ color.style1 }
          onClick={ handleClickAnswer }
          disabled={ isEnable }
        >
          {results[counter].correct_answer}
        </button>
      </div>
      <div>
        {results[counter].incorrect_answers.map((answer, index) => (
          <button
            value="incorrect"
            key={ answer }
            type="button"
            data-testid={ `wrong-answer-${index}` }
            className={ color.style2 }
            onClick={ handleClickAnswer }
            disabled={ isEnable }
          >
            {answer}
          </button>
        ))}
      </div>
      <div>
        {showButton ? (
          <button type="button" data-testid="btn-next" onClick={ handleQuestion }>
            Próxima
          </button>
        ) : (
          <Empty />
        )}
      </div>
      <div>{time}</div>
    </div>
  );
};

Game.propTypes = {
  gameStatus: PropTypes.func.isRequired,
  gameScore: PropTypes.func.isRequired,
  game: PropTypes.shape({
    assertions2: PropTypes.bool.isRequired,
    time2: PropTypes.number.isRequired,
    data: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          difficulty: PropTypes.string,
        }),
      ),
    }),
    score: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = {
  gameStatus: Actions.gameStatus,
  gameScore: Actions.gameScore,
};

const mapStateToProps = (state) => ({
  game: state.game,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
