import React from "react";
import PropTypes from "prop-types";
import { scrambler } from "../services";

const CustomGame = ({ challenge, correct }) => {
  console.log(challenge[0]);
  const quiz = challenge[0];
  const { category, question, correct_answer, incorrect_answers } = quiz;
  const answersArray = scrambler([...incorrect_answers, correct_answer]);

  return (
    <div>
      <p data-testid="question-category">{category}</p>
      <p data-testid="question-text">{question}</p>
      {answersArray.map((item, index) => {
        return (
          <button
            key={index}
            onClick={correct}
            data-testid={
              item === correct_answer
                ? "correct-answer"
                : `wrong-answer-${index}`
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

CustomGame.propTypes = {
  challenge: PropTypes.shape(PropTypes.array).isRequired,
};

export default CustomGame;
