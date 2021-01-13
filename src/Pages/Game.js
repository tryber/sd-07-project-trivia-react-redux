import React from 'react';
// import { connect } from 'react-redux';
// import thunkApiQuestions from '../actions'

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxQuasetions: 5,
    };
  }

  render() {
    return (
      <div>
        CONGRATULATIONS!! YOU WIN!!!
      </div>
    )
  }
}

export default Game;