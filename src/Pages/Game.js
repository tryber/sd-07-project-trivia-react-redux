import React from 'react';
// import { connect } from 'react-redux';
import thunkApiQuestions from '../actions'
import Header from '../components/Header'

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
        <Header />
        CONGRATULATIONS!! YOU WIN!!!
      </div>
    )
  }
}

// const mapStateToProps = (state) => {

// };

// const mapDispatchToProps = (dispatch) => {

// };

export default Game;