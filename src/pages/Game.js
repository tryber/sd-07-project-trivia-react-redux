import React from 'react';

class Game extends React.Component {
  render() {
    // Receber dados das perguntas via API do Trivia
    // Fazer um map das alternativas
    // Atribuir o ${index} = 0 nas alternativas incorretas
    // Exibir as alternativas de forma aleatória
    return (
      <div>
        <div>Comp. Header</div>
        <h1>Joguinho</h1>
        <div>
          <div data-testid="question-category">Categoria da pergunta</div>
          <div data-testid="question-text">Pergunta</div>
        </div>
        <div>
          <div>
            Alternativas
            <button type="button" data-testid="correct-answer">Alt correta</button>
            <button type="button" data-testid="wrong-answer-${index}">Alt incorreta</button>
          </div>
        </div>
        <div>Contagem regressiva</div>
        <button type="button">Próxima</button>
      </div>
    );
  }
}

export default Game;
