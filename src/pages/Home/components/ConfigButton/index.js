import React from 'react';
import { Link } from 'react-router-dom';

const ConfigButton = () => (
  <Link to="/config">
    <button type="button" data-testid="btn-settings">
      Configurações
    </button>
  </Link>
);

export default ConfigButton;
