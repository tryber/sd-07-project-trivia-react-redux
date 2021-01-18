import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { getStorage, setStorage } from '../../services';
import './style.css';

class ConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '5',
      difficulty: '',
      category: '',
      type: '',
      url: 'https://opentdb.com/api.php?amount=5&token=',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const state = await getStorage('state');
    const { email } = state.player;
    const token = await getStorage('token');

    const gravatarHash = md5(email);

    const ranking = {
      name: state.player.name,
      score: 0,
      picture: `https://www.gravatar.com/avatar/${gravatarHash}`,
    };

    const config = await getStorage('config');

    const oldRanking = getStorage('ranking');
    const newRanking = [...oldRanking];
    newRanking.push(ranking);

    const baseURL = 'https://opentdb.com/api.php?';
    const { amount, difficulty, category, type } = this.state;
    let dif = '';
    if (difficulty) (dif = `&difficult=${difficulty}`);
    let cat = '';
    if (category) (cat = `&category=${category}`);
    let ty = '';
    if (type) (ty = `&type=${type}`);
    const endURL = '&token=';
    const custom = `${baseURL}amount=${amount}${cat}${dif}${ty}${endURL}`;
    config.url = custom;

    setStorage('state', state);
    setStorage('token', token);
    setStorage('ranking', newRanking);
    setStorage('config', config);
  }

  handleChange({ name, value }) {
    this.setState({ [name]: value });
  }

  renderDificult() {
    return (
      <div className="config-item">
        <div>
          Configurações
        </div>
        <div>
          <select
            name="difficulty"
            onChange={ ({ target }) => this.handleChange(target) }
          >
            <option value="">Qualquer Dificuldade</option>
            <option value="easy">Fácil</option>
            <option value="medium">Mediana</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
      </div>
    );
  }

  renderType() {
    return (
      <div className="config-item">
        <div>
          Tipo da questão
        </div>
        <select name="type" onChange={ ({ target }) => this.handleChange(target) }>
          <option value="">Qualquer tipo</option>
          <option value="multiple">Multipla escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </div>
    );
  }

  renderQuantity() {
    return (
      <div className="config-item">
        <div>
          Quantidade de questões
        </div>
        <select name="amount" onChange={ ({ target }) => this.handleChange(target) }>
          <option value="5">5 Questões</option>
          <option value="10">10 Questões</option>
          <option value="20">20 Questões</option>
          <option value="30">30 Questões</option>
          <option value="40">40 Questões</option>
          <option value="50">50 Questões</option>
        </select>
      </div>
    );
  }

  renderCategory() {
    return (
      <div className="config-item">
        <div>
          Categoria
        </div>
        <select name="category" onChange={ ({ target }) => this.handleChange(target) }>
          <option value="">Qualquer Categoria</option>
          <option value="9">Conhecimentos Gerais</option>
          <option value="10">Entretenimento: Livros</option>
          <option value="11">Entretenimento: Filmes</option>
          <option value="12">Entretenimento: Musica</option>
          <option value="13">Entretenimento: Musicais &amp; Teatro</option>
          <option value="14">Entretenimento: Televisão</option>
          <option value="15">Entretenimento: Video Games</option>
          <option value="16">Entretenimento: Board Games</option>
          <option value="17">Ciência &amp; Natureza</option>
          <option value="18">Ciência: Computedores</option>
          <option value="19">Ciência: Mathematica</option>
          <option value="20">Mitologia</option>
          <option value="21">Esportes</option>
          <option value="22">Geografia</option>
          <option value="23">Historia</option>
          <option value="24">Politica</option>
          <option value="25">Artes</option>
          <option value="26">Celebridades</option>
          <option value="27">Animai</option>
          <option value="28">Veículos</option>
          <option value="29">Entretenimento: Comics</option>
          <option value="30">Ciência: Gadgets</option>
          <option value="31">Entretenimento: Animes Japoneses &amp; Manga</option>
          <option value="32">Entretenimento: Cartoon &amp; Animações</option>
        </select>
      </div>
    );
  }

  renderPlay() {
    return (
      <div className="field">
        <Link to="/">
          <button
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleClick }
            onKeyPress={ this.handleClick }
          >
            Logar novamente!
          </button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="config-form">
        {this.renderCategory()}
        {this.renderDificult()}
        {this.renderType()}
        {this.renderQuantity()}
        {this.renderPlay()}
      </div>
    );
  }
}

export default ConfigForm;
