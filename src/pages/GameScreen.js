import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomHeader, CustomGame } from '../components';
import triviaReducer from '../reducers/triviaReducer';
import { getStorage } from '../services/localStorage';

class GameScreen extends Component {
  constructor() {
    super()
    this.correctSubimit = this.correctSubimit.bind(this);
  }
  correctSubimit() {
    alert('resposta_correta')
  }

  render() {
    const { name, email, trivia } = this.props
    console.log(trivia)

    return (
      <div>
        <CustomHeader name={name} email={email} />
        <CustomGame challenge={trivia} correct={ this.correctSubimit } />
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer: {name, email}, triviaReducer: { trivia } }) => ({
  name,
  email,
  trivia,
});

export default connect(mapStateToProps)(GameScreen);
