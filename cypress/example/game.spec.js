const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const HEADER_IMAGE_SELECTOR = '[data-testid="header-profile-picture"]';
const HEADER_NAME_SELECTOR = '[data-testid="header-player-name"]';
const HEADER_SCORE_SELECTOR = '[data-testid="header-score"]';
const QUESTION_CATEGORY_SELECTOR = '[data-testid="question-category"]';
const QUESTION_TEXT_SELECTOR = '[data-testid="question-text"]';
const CORRECT_ALTERNATIVE_SELECTOR = '[data-testid="correct-answer"]';
const WRONG_ALTERNATIVES_SELECTOR = '[data-testid*="wrong-answer"]';
const LOCAL_STORAGE_STATE_KEY = 'state';
const BUTTON_NEXT_QUESTION_SELECTOR = '[data-testid="btn-next"]';
const FEEDBACK_TEXT_SELECTOR = '[data-testid="feedback-text"]';

const name = 'Nome da pessoa';
const email = 'email@pessoa.com';

describe('O _header_ deve conter as informações da pessoa jogadora', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('a imagem do Gravatar está presente no header', () => {
    cy.get(HEADER_IMAGE_SELECTOR).should('exist');
  });

  it('o nome da pessoa está presente no header', () => {
    cy.get(HEADER_NAME_SELECTOR).contains(name);
  });

  it('o placar zerado está presente no header', () => {
    cy.get(HEADER_SCORE_SELECTOR).contains('0');
  });
});

describe('A página deve conter as informações relacionadas à pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('a categoria da pergunta está presente', () => {
    cy.get(QUESTION_CATEGORY_SELECTOR).should('exist');
  });

  it('o texto da pergunta está presente', () => {
    cy.get(QUESTION_TEXT_SELECTOR).should('exist');
  });

  it('as alternativas devem estar presentes', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('exist');
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('exist');
  });
});


describe('Só deve ser possível escolher uma resposta correta por pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('a quantidade de respostas corretas deve ser 1', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.length', 1);
  });
});

describe('Ao clicar em uma resposta, a resposta correta deve ficar verde e as incorretas, vermelhas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('verifica cor da alternativa correta quando acerta a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border', '3px solid rgb(6, 240, 15)');
  });

  it('verifica a cor das alternativas incorretas quando acerta a questão', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border', '3px solid rgb(255, 0, 0)');
  });

  it('verifica cor da alternativa correta quando erra a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('have.css', 'border', '3px solid rgb(6, 240, 15)');
  });

  it('verifica a cor das alternativas incorretas quando erra a questão', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).should('have.css', 'border', '3px solid rgb(255, 0, 0)');
  });
});

describe('A pessoa que joga tem 30 segundos para responder cada pergunta', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('aguarda 5 segundos e responde a alternativa correta', () => {
    cy.wait(5000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('not.be.disabled').click();
  });

  it('aguarda mais de 30 segundos para responder', () => {
    cy.wait(32000);
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).should('be.disabled');
  });
});

describe('Ao clicar na resposta correta, pontos devem ser somados no placar da pessoa que está jogando', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('soma pontos ao acertar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.lt(now.player.score);
    });
  });

  it('não soma pontos ao errar uma questão', () => {
    const then = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const now = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(then.player.score).to.be.eq(now.player.score);
    });
  });
});

describe('Após a resposta ser dada, o botão "Próxima" deve aparecer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('o botão de próxima pergunta não deve ser visível o início do jogo', () => {
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('not.be.visible');
  });

  it('botão de próxima pergunta é visível quando a pergunta é respondida corretamente', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });

  it('botão de próxima pergunta é visível quando a pergunta é respondida incorretamente', () => {
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).should('be.visible');
  });
});

describe('A pessoa que joga deve responder 5 perguntas no total', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type(name);
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type(email);
    cy.get(BUTTON_PLAY_SELECTOR).click();
  });

  it('acerta todas as perguntas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.lt(after.player.score);
    });
  });

  it('erra todas as perguntas', () => {
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(WRONG_ALTERNATIVES_SELECTOR).first().click().then(() => {
      const after = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
      expect(before.player.score).to.be.eq(after.player.score);
    });
  });

  it('redireciona para a tela de _ranking_ após a quinta pergunta', () => {
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(CORRECT_ALTERNATIVE_SELECTOR).click();
    cy.get(BUTTON_NEXT_QUESTION_SELECTOR).click();
    cy.get(FEEDBACK_TEXT_SELECTOR).should('exist');
  });
});
