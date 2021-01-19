import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class ConfigForm extends Component {
  renderDificult() {
    const { change } = this.props;
    return (
      <div className="config-item">
        <div>
          Configurações
        </div>
        <div>
          <select
            name="difficulty"
            onChange={ (event) => { change(event.target); } }
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
    const { change } = this.props;
    return (
      <div className="config-item">
        <div>
          Tipo da questão
        </div>
        <select name="type" onChange={ (event) => { change(event.target); } }>
          <option value="">Qualquer tipo</option>
          <option value="multiple">Multipla escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </div>
    );
  }

  renderQuantity() {
    const { change } = this.props;
    return (
      <div className="config-item">
        <div>
          Quantidade de questões
        </div>
        <select name="amount" onChange={ (event) => { change(event.target); } }>
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
    const { change } = this.props;
    return (
      <div className="config-item">
        <div>
          Categoria
        </div>
        <select name="category" onChange={ (event) => { change(event.target); } }>
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

  render() {
    return (
      <div className="config-form">
        {this.renderCategory()}
        {this.renderDificult()}
        {this.renderType()}
        {this.renderQuantity()}
      </div>
    );
  }
}

ConfigForm.propTypes = {
  change: PropTypes.func.isRequired,
};

export default ConfigForm;
