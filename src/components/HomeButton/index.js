import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeButton = ({ test }) => (
  <Link to="/">
    <button type="button" data-testid={ test }>Jogar novamente</button>
  </Link>
);

export default HomeButton;

HomeButton.propTypes = {
  test: PropTypes.string.isRequired,
};
