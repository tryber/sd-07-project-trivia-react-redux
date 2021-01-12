import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomHeader from '../components/CustomHeader';

class GameScreen extends Component {
 constructor() {
   super();
 }
  render() {
    const { name, email } = this.props
    console.log(name , email)
    return (
      <div>
        <CustomHeader form={name, email} />;
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

export default connect(mapStateToProps)(GameScreen);