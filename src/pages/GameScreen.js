import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomHeader } from '../components';

class GameScreen extends Component {
 constructor() {
   super();
 }
  render() {
    return (
      <div>
        <CustomHeader {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({loginReducer: {name, email} }) => ({
  name,
  email,
});

export default connect(mapStateToProps)(GameScreen);
