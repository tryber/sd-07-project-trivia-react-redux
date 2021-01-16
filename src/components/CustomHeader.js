import React from 'react';
import PropTypes from 'prop-types';
import CustomScore from './CustomScore';
import { getPicture } from '../services';

export default function CustomHeader({ name, email }) {
  const picture = getPicture(email);
  return (
    <div
      className="header"
    >
      <h1>Tela do jogo</h1>
      <img
        data-testid="header-profile-picture"
        src={ picture }
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
