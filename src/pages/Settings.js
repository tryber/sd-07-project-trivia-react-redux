import React from 'react';
import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div>
      <h1 data-testid="settings-title">Settings Page</h1>
      <Link to="/">Voltar para Login Page</Link>
    </div>
  );
}
