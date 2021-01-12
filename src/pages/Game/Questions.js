import React, { Component } from 'react';

class Questions extends Component {
  render() {
    return (
      <div>
        <div data-testid="question-category">
          Categoria
        </div>
        <div data-testid="question-text">
          Pergunta
        </div>
        <div>
          Resposta
        </div>
      </div>
    );
  }
}

export default Questions;
