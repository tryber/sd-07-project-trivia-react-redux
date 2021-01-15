import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import CustomScore from './CustomScore';

export default function CustomHeader({ name, email }) {
  return (
    <div
      className="header"
    >
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
      <CustomScore />
    </div>
  );
}

CustomHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
