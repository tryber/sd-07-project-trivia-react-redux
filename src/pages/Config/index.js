import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { ConfigForm, Title } from '../../components';
import { getStorage, setStorage } from '../../services';
import './style.css';

class Config extends Component {
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

  contentMain() {
    return (
      <div className="config-content-child config-main">
        <div className="config-flex-basis-center">
          <div className="config-content-main">
            <ConfigForm change={ this.handleChange } />
          </div>
        </div>
      </div>
    );
  }

  renderPlay() {
    return (
      <div className="config-footer">
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
      <div className="config-container">
        <div className="config-content">
          <Title title="Configurações" dataTestid="settings-title" />
          {this.contentMain()}
          {this.renderPlay()}
        </div>
      </div>
    );
  }
}

export default Config;
