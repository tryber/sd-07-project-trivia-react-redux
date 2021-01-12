import React from 'react';
import md5 from 'crypto-js/md5';

const CustomHeader = ({ form: { name, email } }) => (
  <div>
    <h1>Tela do jogo</h1>
    <img
      data-testid="header-profile-picture"
      src={`https://www.gravatar.com/avatar/${md5(email)}`}
      alt="avatar"
    />
    <h3 data-testid="header-player-name">
      Nome do Jogador:
      {name}
    </h3>
    <h4 data-testid="header-score">0</h4>
  </div>
);


export default CustomHeader;
