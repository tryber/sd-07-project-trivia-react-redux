const INPUT_PLAYER_NAME_SELECTOR = '[data-testid="input-player-name"]';
const INPUT_PLAYER_EMAIL_SELECTOR = '[data-testid="input-gravatar-email"]';
const BUTTON_PLAY_SELECTOR = '[data-testid="btn-play"]';
const BUTTON_SETTINGS_SELECTOR = '[data-testid="btn-settings"]';
const SETTINGS_TITLE_SELECTOR = '[data-testid="settings-title"]';
const TOKEN_KEY = 'token';

describe('A pessoa que joga deve preencher as informações para iniciar um jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('escreve o nome da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
  });

  it('escreve o email da pessoa jogadora', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
  });

  it('botão Jogar desabilitado quando pessoa jogadora não preencher nenhum campo', () => {
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('botão Jogar desabilitado quando pessoa jogadora escrever apenas o nome', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('botão Jogar desabilitado quando pessoa jogadora escrever apenas o email', () => {
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('be.disabled');
  });

  it('botão Jogar habilitado quando pessoa jogadora preencher os campos de nome e email', () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).should('not.be.disabled');
  });
});

describe('A pessoa que joga deve ter acesso à tela de configurações através da tela inicial', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('o botão deve existir na página', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).should('exist');
  });

  it('a tela de configurações deve possuir um título', () => {
    cy.get(BUTTON_SETTINGS_SELECTOR).click();
    cy.get(SETTINGS_TITLE_SELECTOR).should('exist');
  });
});

describe('A pessoa jogadora deve iniciar um jogo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.clearLocalStorage();
  });

  it('inicia jogo salvando um token de jogador', async () => {
    cy.get(INPUT_PLAYER_NAME_SELECTOR).type('Nome da pessoa');
    cy.get(INPUT_PLAYER_EMAIL_SELECTOR).type('email@pessoa.com');
    cy.get(BUTTON_PLAY_SELECTOR).click().should(() => {
      expect(localStorage.getItem(TOKEN_KEY)).not.to.be.null;
    });
  });
});
