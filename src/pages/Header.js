import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomHeader from '../components/CustomHeader';

class Header extends Component {
  render() {
    return <CustomHeader 
    form={ this.props.name, this.props.email}
     />;
  }
}

const mapStateToProps = (state) => ({
    name: state.userReducer.name,
    email: state.userReducer.email,
  });

export default connect(mapStateToProps)(Header);
