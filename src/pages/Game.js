import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}
