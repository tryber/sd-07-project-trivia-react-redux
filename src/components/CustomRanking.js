import React from 'react';

export default function CustomRanking({ ranking }) {
  return (
    <ol>
      {ranking.map(({ name, score, picture }, index) => (
        <li key={ index }>
          <div>
            <img
              data-testid="header-profile-picture"
              src={ picture }
              alt="avatar"
            />
            <spam data-testid={ `player-name-${index}` }>{ name }</spam>
            <spam data-testid={ `player-score-${index}` }>{ score }</spam>
          </div>
        </li>
      ))}
    </ol>
  );
}

CustomRanking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
