import React from 'react';

class Questions extends React.Component {
  render() {
    const respostas = ['Verdadeiro', 'Falso']
    return (
      <div>
        <h3>Perguntas</h3>
        <div id="bloco-pergunta">
          <div id="categoria-pergunta">
            <span
              data-testid="question-category"
            >
              Categoria
            </span>
          </div>
          <span
            data-testid="question-text"
          >
            *** Pergunta ***
          </span>
        </div>
        <div id="bloco-respostas">
          { respostas.map((resposta) => <button>{ resposta }</button>) }
        </div>
      </div>
    )
  }
}

export default Questions;
