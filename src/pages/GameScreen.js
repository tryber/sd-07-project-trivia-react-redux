import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomHeader, CustomGame } from '../components';
import triviaReducer from '../reducers/triviaReducer';
import { getStorage } from '../services/localStorage';

class GameScreen extends Component { 
  render() {
    const { name, email,list } = this.props
    return (
      <div>
        <CustomHeader name={name} email={email} />
        <CustomGame challenge={list} />
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer: {name, email}, triviaReducer }) => ({
  name,
  email,
  list: triviaReducer,
});

export default connect(mapStateToProps)(GameScreen);
