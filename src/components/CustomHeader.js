import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export default function CustomHeader({ name, email }) {
  return (
    <div>
      <h1>Tela do jogo</h1>
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${md5(email)}` }
        alt="avatar"
      />
      <h3 data-testid="header-player-name">
        Nome do Jogador:
        {name}
      </h3>
      <h4 data-testid="header-score">0</h4>
    </div>
  );
}

CustomHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
