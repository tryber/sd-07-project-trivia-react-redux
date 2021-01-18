import React from 'react';

class Config extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="category">
          Categoria
          <div>
            <select id="category">
              <option> </option>
              <option value="filmes">Filmes</option>
              <option value="serie">Séries</option>
              <option value="animes">Animes</option>
            </select>
          </div>
        </label>
        <label htmlFor="level">
          Dificuldade
          <div>
            <select id="level">
              <option> </option>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Díficil</option>
            </select>
          </div>
        </label>
        <label htmlFor="tipo">
          Tipo
          <div>
            <select id="tipo">
              <option> </option>
              <option value="drama">Drama</option>
              <option value="terror">Terror</option>
              <option value="romantico">Romantico</option>
              <option value="infaltil">Infantil</option>
            </select>
          </div>
        </label>
      </div>
    );
  }
}

export default Config;
