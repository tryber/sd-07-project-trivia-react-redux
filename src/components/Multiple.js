import React from 'react';

export default class Multiple extends React.Component {
  render() {
    return (
      <div>
        <div id="categoria-pergunta">
          <span data-testid="question-category">
            Categoria
          </span>
        </div>
        <div>Pergunta</div>
        <button type="button">Alternativa 1</button>
        <button type="button">Alternativa 1</button>
      </div>
    );
  }
};