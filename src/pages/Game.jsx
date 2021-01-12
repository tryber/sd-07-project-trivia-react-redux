import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Game = () => {
  const [counter, setCounter] = useState(0);
  const handleQuestion = () => {
    const maxQuestions = 4;
    if (counter === maxQuestions) {
      setCounter(counter - maxQuestions);
    } else {
      setCounter(counter + 1);
    }
  };

  const dataGame = useSelector((state) => state.game);
  const { results } = dataGame.data;
  console.log(results[counter]);

  return (
    <div>
      <div>
        <h3 data-testid="question-category">{results[counter].category}</h3>
      </div>
      <div>
        <p data-testid="question-text">{results[counter].question}</p>
      </div>
      <div>
        <button type="button" data-testid="correct-answer">
          {results[counter].correct_answer}
        </button>
      </div>
      <div>
        {results[counter].incorrect_answers.map((answer, index) => (
          <button key={ answer } type="button" data-testid={ `wrong-answer-${index}` }>
            {answer}
          </button>
        ))}
      </div>
      <div>
        <button type="button" data-testid="btn-next" onClick={ () => handleQuestion() }>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Game;
