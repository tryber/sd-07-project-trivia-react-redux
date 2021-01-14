import React, { Component } from 'react';

/* fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => this.setState({ token: data.token })); */

export default class Question extends Component {
  render() {
    // const token = request
    // const questions = new Request(`https://opentdb.com/api.php?amount=5&token=${token}`);

    return (
      <div className="questions">
        Question
      </div>
    );
  }
}
