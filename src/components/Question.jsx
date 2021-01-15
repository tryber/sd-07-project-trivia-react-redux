import React, { Component } from "react";

// import { Container } from './styles';

class Question extends Component {
  render() {
    const {
      questionProp,
      onClickHandler,
      onClickQuestion,
      enable,
    } = this.props;
    const {
      category,
      question,
      correct_answer,
      incorrect_answers,
    } = questionProp;

    const allAnswers = [...incorrect_answers, correct_answer];

    return (
      <div>
        <div>
          <h2 data-testid="question-category">{category}</h2>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {allAnswers.map((answer, index) => {
            if (answer === correct_answer) {
              return (
                <button
                  key={index}
                  type="button"
                  data-testid={`wrong-answer-${index}`}
                  onClick={onClickQuestion}
                >
                  {answer}
                </button>
              );
            }
            return (
              <button
                key="correct"
                type="button"
                data-testid="correct-answer"
                onClick={onClickQuestion}
              >
                {answer}
              </button>
            );
          })}
          {!enable && (
            <button
              type="button"
              onClick={onClickHandler}
              data-testid="btn-next"
            >
              Próxima pergunta!
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Question;
