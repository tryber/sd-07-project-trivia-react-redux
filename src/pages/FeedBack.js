import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomHeader } from '../components';

class FeedBack extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <CustomHeader name={ name } />
        <h1 data-testid="settings-title">FeedBack</h1>
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
