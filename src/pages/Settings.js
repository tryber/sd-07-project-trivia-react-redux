import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeSettings } from '../actions';

class Settings extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { changeSetting } = this.props;
    const { name, value } = target;
    changeSetting({ name, value });
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
          <div className="category">
            Categoria:
            <select
              name="category"
              onChange={ this.handleChange }
            >
              <option value="random">Aleatória</option>
              <option value="9">Conhecimentos gerais</option>
              <option value="10">Entretenimento: Livros</option>
              <option value="11">Entretenimento: Filmes</option>
              <option value="12">Entretenimento: Música</option>
              <option value="13">Entretenimento: Musicais</option>
              <option value="14">Entretenimento: Televisão</option>
              <option value="15">Entretenimento: Video Games</option>
              <option value="16">Entretenimento: Jogos de Tabuleiro</option>
              <option value="29">Entretenimento: Quadrinhos</option>
              <option value="31">Entretenimento: Animes e Mangás</option>
              <option value="32">Entretenimento: Desenhos e Animações</option>
              <option value="17">Ciência e Natureza</option>
              <option value="18">Ciência: Computadores</option>
              <option value="19">Ciência: Matemática</option>
              <option value="30">Ciência: Gadgets</option>
              <option value="20">Mitologia</option>
              <option value="21">Esportes</option>
              <option value="22">Geografia</option>
              <option value="23">História</option>
              <option value="24">Política</option>
              <option value="25">Arte</option>
              <option value="26">Celebridades</option>
              <option value="27">Animais</option>
              <option value="28">Veículos</option>
            </select>
          </div>
          <div className="difficulty">
            Dificuldade:
            <select
              name="difficulty"
              onChange={ this.handleChange }
            >
              <option value="random">Aleatória</option>
              <option value="easy">Fácil</option>
              <option value="medium">Moderado</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
          <div className="type">
            Tipo:
            <select
              name="type"
              onChange={ this.handleChange }
            >
              <option value="random">Aleatório</option>
              <option value="multiple">Múltipla escolha</option>
              <option value="boolean">Verdadeiro ou falso</option>
            </select>
          </div>
          <br />
          <div className="return-btn">
            <Link to="/">
              <button type="button">Voltar</button>
            </Link>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeSetting: (object) => dispatch(changeSettings(object)),
});

export default connect(null, mapDispatchToProps)(Settings);
