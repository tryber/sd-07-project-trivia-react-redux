import React, { Component } from 'react';
import { Title } from '../../components';
import './style.css';

class NotFound extends Component {
  render() {
    return (
      <div className="notFound-Container">
        <div className="notFound-content">
          <Title title="Página não encontrada" />
        </div>
      </div>
    );
  }
}

export default NotFound;
