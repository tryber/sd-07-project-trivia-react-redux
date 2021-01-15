import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomHeader, CustomPlayAgain } from '../components';

class FeedBack extends Component {
  constructor(){
    super()
    this.goHomeAgain = this.goHomeAgain.bind(this);
  }
  goHomeAgain() {
    const { history } = this.props;
    history.push('/')
  }
  render() {
    const { name } = this.props;
    return (
      <div>
        <CustomHeader name={ name } />
        <h1 data-testid="settings-title">FeedBack</h1>
        <CustomPlayAgain goHome= { this.goHomeAgain } />
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { name },
}) => ({
  name,
});

export default connect(mapStateToProps)(FeedBack);
