import React from 'react';
import Questions from '../components/Questions';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Questions history={ this.props.history } />
      </div>
    );
  }
}

export default Game;
