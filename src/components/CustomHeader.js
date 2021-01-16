import React from 'react';
import PropTypes from 'prop-types';
import { getPicture } from '../services';

export default function CustomHeader({ name, email, score }) {
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
      <spam data-testid="header-score">{score}</spam>
    </div>
  );
}

CustomHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
