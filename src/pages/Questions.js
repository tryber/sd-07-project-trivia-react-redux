import React, { Component } from 'react';

export default class componentName extends Component {
  constructor() {
    super();
    // this.state = {
    //   questionNumber: 0,
    // };

    // this.handleQuestions = this.handleQuestions.bind(this);
  }

  // handleQuestions() {
  // }

  render() {
    const { question } = this.props;
    console.log(question);
    return (
      <div>
      </div>
    );
  }
}
