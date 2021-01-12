import React, { Component } from 'react';
import { Header, QuestionsList } from '../../components';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <QuestionsList />
      </div>
    );
  }
}
