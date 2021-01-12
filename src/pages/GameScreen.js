import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomHeader } from '../components';

class GameScreen extends Component {
  render() {
    return (
      <div>
        <CustomHeader { ...this.props } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

export default connect(mapStateToProps)(GameScreen);
